const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");
const outputPath = path.resolve(__dirname, "../../base-application/build/login-app");
module.exports = {
  paths: function (paths, env) {
    paths.appBuild = outputPath;
    return paths;
  },
  webpack: {
    configure: (config) => {
      console.log("✅ CRACO config loaded for login-microapp");
      config.output.publicPath = "auto";
      config.output.library = "login_app";
      config.output.libraryTarget = "var";
      config.output.path = outputPath;
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
