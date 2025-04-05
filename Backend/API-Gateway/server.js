const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
require("../SharedServices/Environments/loadEnvironment")();

app.use(process.env.USER_MICROSERVICE_PATH, createProxyMiddleware({
  target: `http://${process.env.BASE_HOST}:${process.env.USER_MICROSERVICE_PORT}`,
  changeOrigin: true,
  pathRewrite: {
    [`^${process.env.USER_MICROSERVICE_PATH}`]: '',
  },
}));

app.use(process.env.ACCOUNT_MICROSERVICE_PATH, createProxyMiddleware({
  target: `http://${process.env.BASE_HOST}:${process.env.ACCOUNT_MICROSERVICE_PORT}`,
  changeOrigin: true,
  pathRewrite: {
    [`^${process.env.ACCOUNT_MICROSERVICE_PATH}`]: '',
  },
}));

app.listen(process.env.API_GATEWAY_PORT, () => {
  console.log(`API Gateway running on http://localhost:${process.env.API_GATEWAY_PORT}`);
});
