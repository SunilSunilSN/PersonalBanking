const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const YAML = require('yamljs');
const app = express();

// Load the gateway config file
const config = YAML.load('./gateway.config.yml');

// Proxy route for /users, forwarding requests to the user service
app.use(config.apiEndpoints.users.path, createProxyMiddleware({
  target: config.apiEndpoints.users.target,
  changeOrigin: true,
  pathRewrite: {
    [`^${config.apiEndpoints.users.path}`]: '',  // Remove the /users prefix when proxying
  },
}));

// Proxy route for /accounts, forwarding requests to the account service
app.use(config.apiEndpoints.accounts.path, createProxyMiddleware({
  target: config.apiEndpoints.accounts.target,
  changeOrigin: true,
  pathRewrite: {
    [`^${config.apiEndpoints.accounts.path}`]: '',  // Remove the /accounts prefix when proxying
  },
}));
app.get('/', (req, res) => {
  res.json({ message: 'List of api' });
});
// Start the API Gateway on the specified port
app.listen(config.http.port, () => {
  console.log(`API Gateway running on http://localhost:${config.http.port}`);
});
