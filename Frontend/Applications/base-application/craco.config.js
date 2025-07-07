const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");
const dotenv = require("dotenv");
const APP_ENV = process.env.APP_ENV || "development";
const envPath = path.resolve(__dirname, `../../SharedServices/Environments/.env.${APP_ENV}`);
dotenv.config({ path: envPath });

console.log(`[INFO] Loaded env: ${envPath}`);
console.log(`[INFO] Backend URL: ${process.env.REACT_APP_BACKEND_URL}`);

module.exports = {
  webpack: {
    configure: (config) => {
      config.plugins.push(
        new ModuleFederationPlugin({
          name: "base_app",
          remotes: {
            login_app: `login_app@${process.env.REACT_APP_LOGIN_REMOTE_URL}`,
            preLogin_app: `preLogin_app${process.env.REACT_APP_PRELOGIN_REMOTE_URL}`,
            account_app: `account_app${process.env.REACT_APP_ACCOUNT_REMOTE_URL}`,
            auth_app: `auth_app${process.env.REACT_APP_AUTH_REMOTE_URL}`,
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
