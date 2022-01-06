class MyInject {
  constructor (ctx) {
    this.app = ctx.app
    this.error = ctx.error
  }

  // I18nページタイトル変換用メソッド
  pageTitle (routeName) {
    // routeName => 'account-settings'が例えば引数で入って来た場合、jsonPath => pages.account.settingsとなってI18n変換される。
    const jsonPath = `pages.${routeName.replace(/-/g, '.')}`
    const title = this.app.i18n.t(jsonPath)
    return title
  }

  // 日付のフォーマット変換
  dateFormat (dateStr) {
    const dateTimeFormat = new Intl.DateTimeFormat(
      'ja', { dateStyle: 'medium', timeStyle: 'short' }
    )
    return dateTimeFormat.format(new Date(dateStr))
  }

  // プロジェクトリンク
  projectLinkTo (id, name = 'project-id-ProjectDetails') {
    return { name, params: { id } }
  }

  // 完了したプロジェクトリンク
  completedProjectLinkTo (id, name = 'CompletedProject-id-CompletedProjectDetails') {
    return { name, params: { id } }
  }

  // apiエラーハンドエラー
  apiErrorHandler (response) {
    // ネットワークエラーの場合はresponseが存在しないので500を代入
    const statusCode = (response) ? response.status : 500
    const message = (response) ? response.statusText : 'Network Error'
    return this.error({ statusCode, message })
  }
}

// 全てのNuxtの中で$my.メソッドとする事でMyInjectのclassの中で定義しているメソッドを呼び出せる。
export default ({ app, error }, inject) => {
  inject('my', new MyInject({ app, error }))
}
