const express = require("express");
const cookieParser = require("cookie-parser");
const { createProxyMiddleware } = require("http-proxy-middleware");
const app = express();
require("../SharedServices/Environments/loadEnvironment")();
app.use(cookieParser());
const cors = require("cors");
app.use(
  cors({
    origin: process.env.FRONTEND_HOST, // your frontend URL
    credentials: true, // allow cookies and Authorization headers
  })
);
app.use(
  process.env.USER_MICROSERVICE_PATH,
  createProxyMiddleware({
    target: `http://${process.env.BASE_HOST}:${process.env.USER_MICROSERVICE_PORT}`,
    changeOrigin: true,
    pathRewrite: {
      [`^${process.env.USER_MICROSERVICE_PATH}`]: "",
    },
    onProxyReq: (proxyReq, req, res) => {
      // Forward cookies from original request
      if (req.headers.cookie) {
        proxyReq.setHeader("cookie", req.headers.cookie);
      }
    },
  })
);

app.use(
  process.env.ACCOUNT_MICROSERVICE_PATH,
  createProxyMiddleware({
    target: `http://${process.env.BASE_HOST}:${process.env.ACCOUNT_MICROSERVICE_PORT}`,
    changeOrigin: true,
    pathRewrite: {
      [`^${process.env.ACCOUNT_MICROSERVICE_PATH}`]: "",
    },
    onProxyReq: (proxyReq, req, res) => {
      // Forward cookies from original request
      if (req.headers.cookie) {
        proxyReq.setHeader("cookie", req.headers.cookie);
      }
    },
  })
);

app.use(
  process.env.TRANSACTION_MICROSERVICE_PATH,
  createProxyMiddleware({
    target: `http://${process.env.BASE_HOST}:${process.env.TRANSACTION_MICROSERVICE_PORT}`,
    changeOrigin: true,
    pathRewrite: {
      [`^${process.env.TRANSACTION_MICROSERVICE_PATH}`]: "",
    },
    onProxyReq: (proxyReq, req, res) => {
      // Forward cookies from original request
      if (req.headers.cookie) {
        proxyReq.setHeader("cookie", req.headers.cookie);
      }
    },
  })
);

app.listen(process.env.API_GATEWAY_PORT, () => {
  console.log(
    `API Gateway running on http://localhost:${process.env.API_GATEWAY_PORT}`
  );
});
