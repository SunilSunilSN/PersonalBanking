const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");
require("dotenv").config({
  path: "D:/My Applications/Personal Banking Application/Frontend/SharedServices/Environments/.env.dev",
});
const fs = require("fs");

const microapps = Object.entries(process.env);
console.log("sUNIL" + microapps.PORT);

module.exports = {
  webpack: {
    configure: (config) => {
      config.plugins.push(
        new ModuleFederationPlugin({
          name: "base_app",
          remotes: {
            login_app: "login_app@http://localhost:3000/login-app/remoteEntry.js",
            preLogin_app: "preLogin_app@http://localhost:3000/preLogin-app/remoteEntry.js",
            account_app: "account_app@http://localhost:3000/account-app/remoteEntry.js",
            auth_app: "auth_app@http://localhost:3000/auth-app/remoteEntry.js",
          },
          shared: {
            react: { singleton: true, eager: true },
            "react-dom": { singleton: true, eager: true },
          },
        })
      );
      config.resolve.alias["@common"] = path.resolve(__dirname, "../Common");
      config.module.rules.push({
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      });
      return config;
    },
  },

  style: {
    postcssOptions: {
      plugins: [require("tailwindcss"), require("autoprefixer")],
    },
  },
};
