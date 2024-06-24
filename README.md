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

### Resizing images

We have a script that can be run to automatically resize all the images in to the images folder down to a maximum width of 1920px

```
./resize-images.sh ./images
```

This creates a folder inside images called resized, this will conatin all the resized images
