Prism.languages.cedar = {
  comment: {
    pattern: /(^|[^\\:])\/\/.*/,
    lookbehind: true,
    greedy: true,
  },
  string: {
    pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,
    lookbehind: true,
    greedy: true,
  },
  keyword: /\b(?<!\.)(?:permit|forbid|when|unless)\b/,
  // don't worry about excluding . before boolean reserved identifiers
  boolean: /\b(?:false|true)\b/,
  symbol: /\?(?:principal|resource)\b/,
  variable: /\b(?<![\.\?])(?:principal|action|resource|context)\b/,
  number: /\b0|\-?[1-9](_?[0-9])*/,
  operator: [
    {
      pattern: /(?:&&|\|\||==|!=|>=|<=|>|<|\+|-|\*)/,
    },
    {
      // don't worry about excluding . before operator reserved identifiers
      pattern: /\b(?:in|like|has|if|then|else|is)\b/,
    },
  ],
  "class-name": [
    {
      pattern: /\b(?:([_a-zA-Z][_a-zA-Z0-9]*::)*[_a-zA-Z][_a-zA-Z0-9]*)(?=::)/, // (?=::")
    },
    {
      pattern: /(\s+is\s+)([_a-zA-Z][_a-zA-Z0-9]*::)*[_a-zA-Z][_a-zA-Z0-9]*/,
      greedy: true, // since "is" is defined above as operator
      lookbehind: true,
    },
  ],
  builtin: /\b(?:ip|decimal)(?=\()/,
  function: [
    {
      // methods
      pattern: /(?=.)(contains|containsAll|containsAny)(?=\()/,
    },
    {
      // decimal methods
      pattern:
        /(?=.)(lessThan|lessThanOrEqual|greaterThan|greaterThanOrEqual)(?=\()/,
    },
    {
      // ip methods
      pattern: /(?=.)(isIpv4|isIpv6|isLoopback|isMulticast|isInRange)(?=\()/,
      greedy: true,
    },
  ],
  punctuation: /(?:[\(|)|\[|\]|{|}|,|;])/,
};

// This function runs in the background to highlight cedar code blocks using this custom language spec which was sourced from
// https://github.com/cedar-policy/prism-cedar
(function () {
  function highlightCedarCode() {
    // Find all code blocks with the class 'language-js'
    // this is used to mostly avoid a flicker from white to highlighted
    // the js is close, and is run before this custom code runs
    // ideally we could add the language to mintlify statically
    const jsCodeBlocks = document.querySelectorAll("code.language-js");

    jsCodeBlocks.forEach((block) => {
      // Check if the block has already been highlighted
      if (!block.hasAttribute("data-highlighted")) {
        // Change the language class to 'language-cedar'
        block.className = block.className.replace(
          "language-js",
          "language-cedar"
        );

        // Highlight the block
        Prism.highlightElement(block);

        // Mark the block as highlighted
        block.setAttribute("data-highlighted", "true");
      }
    });
  }

  // Listen for changes in the URL caused by the browser's back/forward buttons
  window.addEventListener("popstate", highlightCedarCode);

  // Listen for changes in the URL hash (if applicable)
  window.addEventListener("hashchange", highlightCedarCode);

  // Check the URL periodically if the app updates the path dynamically
  setInterval(highlightCedarCode, 250);

  // Run on initial load as soon as possible
  highlightCedarCode();
})();
