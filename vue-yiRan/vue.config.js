const path = require("path");
const resolve = (dir) => path.join(__dirname, dir);

module.exports = {
  runtimeCompiler: true,
  chainWebpack: (config) => {
    config.resolve.alias.set("@", resolve("src"));
  },
  publicPath: "http://localhost:40000",
  devServer: {
    port: 40000,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  configureWebpack: {
    output: {
      libraryTarget: "umd",
      library: "vue-yiRan",
    },
  },
};
