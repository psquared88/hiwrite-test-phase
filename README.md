# Hiwrite Chrome plugin

The project supports adding highlight for webpages and PDFs.

## Development

1. In the root folder, run the following commands to install dependencies

```bash
yarn 
# or 
npm install
```

2. Link pdf-reader
```bash
# or
npm link pdf-reader
```


3. To start the mock server, run

```bash
yarn server
# or 
npm run server
```

> The mock API server is http://localhost:3000/

4. To start development, run

```bash
yarn start
# or 
npm run start
```

4. Open browser and goto "chrome://extensions/"
5. Select [Load Unpacked] and choose the build folder
6. Reload changes

The project is using background and content scripts, we have to reload the chrome plugin manually.

```text
Open chrome://extensions/, find the plugin extension from the installed extension list, click the refresh button.

```
