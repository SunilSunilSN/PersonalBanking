const { ModuleFederationPlugin } = require("webpack").container;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  webpack: {
    configure: (config) => {
      console.log("✅ CRACO config loaded for login-microapp");
      config.output.publicPath = "auto";
      config.output.library = "login_app";
      config.output.libraryTarget = "var";
      config.plugins.push(
        new ModuleFederationPlugin({
          name: "login_app",
          filename: "remoteEntry.js",
          exposes: {
            "./LoginPage": "./src/Screens/LoginPage",
            "./RegistrationPage": "./src/Screens/RegistrationPage",
            "./MicroAppMapper": "./src/Common/MicroAppMapper",
          },
          shared: {
            react: { singleton: true, eager: true },
            "react-dom": { singleton: true, eager: true },
          },
        })
      );
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
};
