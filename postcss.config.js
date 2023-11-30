module.exports = {
  plugins: {
    'postcss-px-to-viewport-8-plugin': {
      viewportUnit: 'rem', // 希望使用的视口单位
      fontViewportUnit: 'rem', // 字体使用的视口单位
      viewportWidth: 1920, // 设计稿的视口宽度
      exclude: [/src\/App.vue/], //忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
      // 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位。
      selectorBlackList: ['monitor_size_px'],  // 下面配置表示类名中含有'monitor_size_px'都不会被转换
    }
  }
}