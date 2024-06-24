# Common Fate Documentation

### Development

Install the [Mintlify CLI](https://www.npmjs.com/package/mintlify) to preview the documentation changes locally. To install, use the following command

```
npm i -g mintlify
```

Run the following command at the root of your documentation (where mint.json is)

```
mintlify dev
```

### Resize images to a max width of 1920px

This command will reduce any image wider than 1920px to 1920px maintaining aspect ratio

```
./resize.sh ./images
```
