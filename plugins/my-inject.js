class MyInject {
  constructor (ctx) {
    this.app = ctx.app
  }

  // I18nページタイトル変換用メソッド
  pageTitle (routeName) {
    // routeName => 'account-settings'が例えば引数で入って来た場合、jsonPath => pages.account.settingsとなってI18n変換される。
    const jsonPath = `pages.${routeName.replace(/-/g, '.')}`
    const title = this.app.i18n.t(jsonPath)
    return title
  }
}

// 全てのNuxtの中で$my.メソッドとする事でMyInjectのclassの中で定義しているメソッドを呼び出せる。
export default ({ app }, inject) => {
  inject('my', new MyInject({ app }))
}
