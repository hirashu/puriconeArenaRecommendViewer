// eslint-disable-next-line @typescript-eslint/no-var-requires
const StyleLintPlugin = require("stylelint-webpack-plugin");

module.exports = {
  transpileDependencies: ["vuetify"],
  configureWebpack: {
    plugins: [
      //ホットリロード時にstylelintを実行する
      new StyleLintPlugin({
        files: ["src/**/*.{vue,scss}"]
      })
    ]
  }
};