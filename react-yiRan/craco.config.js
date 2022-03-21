const CracoLessPlugin = require("craco-less");
const path = require("path");
module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      webpackConfig.output = {
        ...webpackConfig.output,
        library: "m-react",
        libraryTarget: "umd",
        publicPath:
          process.env.NODE_ENV === "production"
            ? "./"
            : "http://localhost:30000",
        jsonpFunction: `webpackJsonp_m-react`,
      };
      return webpackConfig;
    },

    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },

  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#1DA57A",
              "@link-color": "#1DA57A",
              "@border-radius-base": "2px",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
};
