const express = require('express');
const path = require('path');
const app = express();

const serveApp = (name, portPath) => {
  app.use(`/${name}`, express.static(path.join(__dirname, `Applications/${name}/build`)));
  app.get(`/${name}/*`, (_, res) =>
    res.sendFile(path.join(__dirname, `Applications/${name}/build/index.html`))
  );
};

// Serve each app
serveApp('base-application');
serveApp('login-app');
serveApp('settings-app');

app.listen(3000, () => {
  console.log('All apps served on http://localhost:3000');
});
