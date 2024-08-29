const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
});

// webpack.config.js 또는 vue.config.js
const webpack = require("webpack");

module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        __VUE_OPTIONS_API__: JSON.stringify(true), // 또는 false
        __VUE_PROD_DEVTOOLS__: JSON.stringify(false), // 보통 프로덕션에서는 false
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false), // 이 플래그 추가
      }),
    ],
  },
};
