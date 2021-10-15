module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    // ESlintの推奨方法のコード記載を気にせずに動作をとりあえず見たい時にoffにする
    // 'vue/valid-v-slot': 'off'
  }
}
