const homePath = 'companies'

export const state = () => ({
  styles: {
    homeAppBarHeight: 56
  },
  loggedIn: {
    homePath: {
      name: homePath
    },
    rememberPath: {
      name: homePath,
      params: {},
      query: {}
    },
    // ログイン後のアクセス不可ルート一覧
    redirectPaths: [
      'index',
      'signup',
      'login'
    ]
  },
  company: {
    current: null,
    list: []
  },
  // カンパニー参加usersと作成user
  companyUsers: {
    ownerUser: null,
    list: []
  },
  companyProject: {
    current: null,
    list: [],
    task: []
  },
  project: {
    current: null,
    list: [],
    task: []
  },
  user: {
    current: null,
    information: []
  },
  auth: {
    token: null,
    expires: 0,
    payload: {}
  },
  toast: {
    msg: null,
    color: 'error',
    timeout: 4000
  }
})

export const getters = {}

export const mutations = {
  // カンパニー
  setCompanyList (state, payload) {
    state.company.list = payload
  },
  setCurrentCompany (state, payload) {
    state.company.current = payload
  },
  // カンパニー作成ユーザー(名前も変数で出したいので、各カラムを配列で取得)
  setCompanyUsersOwnerList (state, payload) {
    state.companyUsers.ownerUser = payload
  },
  // カンパニー参加ユーザー
  setCompanyUsersList (state, payload) {
    state.companyUsers.list = payload
  },
  // カンパニー(共有)プロジェクト
  setCompanyProjectList (state, payload) {
    state.companyProject.list = payload
  },
  setCompanyProjectCurrent (state, payload) {
    state.companyProject.current = payload
  },
  setCompanyTasks (state, payload) {
    state.companyProject.task = payload
  },
  // 個人プロジェクト
  setProjestList (state, payload) {
    state.project.list = payload
  },
  setCurrentProject (state, payload) {
    state.project.current = payload
  },
  setTasks (state, payload) {
    state.project.task = payload
  },
  // 自分のユーザー
  setCurrentUser (state, payload) {
    state.user.current = payload
  },
  setCurrentUserInformation (state, payload) {
    state.user.information = payload
  },
  setAuthToken (state, payload) {
    state.auth.token = payload
  },
  setAuthExpires (state, payload) {
    state.auth.expires = payload
  },
  setAuthPayload (state, payload) {
    state.auth.payload = payload
  },
  setToast (state, payload) {
    state.toast = payload
  },
  setRememberPath (state, payload) {
    state.loggedIn.rememberPath = payload
  }
}

export const actions = {
  // Company
  getCompanyList ({ commit }, companies) {
    companies = companies || []
    commit('setCompanyList', companies)
  },
  getCurrentCompany ({ state, commit }, params) {
    let currentCompany = null
    if (params && params.id) {
      const id = Number(params.id)
      currentCompany = state.company.list.find(company => company.id === id) || null
    }
    commit('setCurrentCompany', currentCompany)
  },
  // Company作成ユーザー
  getCompanyUsersOwnerList ({ commit }, ownerUser) {
    ownerUser = ownerUser || []
    commit('setCompanyUsersOwnerList', ownerUser)
  },
  // Company参加ユーザー
  getCompanyUsersList ({ commit }, companyUsers) {
    companyUsers = companyUsers || []
    commit('setCompanyUsersList', companyUsers)
  },
  // カンパニー(共有)プロジェクト
  getCompanyProjectList ({ commit }, projects) {
    projects = projects || []
    commit('setCompanyProjectList', projects)
  },
  // カンパニー(共有)プロジェクトのプロジェクトの選択
  getCompanyProjectCurrent ({ state, commit }, params) {
    let companyProjectCurrent = null
    if (params && params.projectId) {
      const id = Number(params.projectId)
      companyProjectCurrent = state.companyProject.list.find(projectCurrent => projectCurrent.id === id) || null
    }

    commit('setCompanyProjectCurrent', companyProjectCurrent)
  },
  getCompanyTasks ({ commit }, tasks) {
    tasks = tasks || []
    commit('setCompanyTasks', tasks)
  },
  // 個人プロジェクト
  getProjectList ({ commit }, projects) {
    projects = projects || []
    commit('setProjestList', projects)
  },
  getCurrentProject ({ state, commit }, params) {
    let currentProject = null
    if (params && params.id) {
      const id = Number(params.id)
      currentProject = state.project.list.find(project => project.id === id) || null
    }

    commit('setCurrentProject', currentProject)
  },
  getTasks ({ commit }, tasks) {
    tasks = tasks || []
    commit('setTasks', tasks)
  },
  getCurrentUser ({ commit }, user) {
    commit('setCurrentUser', user)
  },
  getCurrentUserInformation ({ commit }, user) {
    commit('setCurrentUserInformation', user)
  },
  getAuthToken ({ commit }, token) {
    commit('setAuthToken', token)
  },
  getAuthExpires ({ commit }, expires) {
    expires = expires || 0
    commit('setAuthExpires', expires)
  },
  getAuthPayload ({ commit }, jwtPayload) {
    jwtPayload = jwtPayload || {}
    commit('setAuthPayload', jwtPayload)
  },
  getToast ({ commit }, { msg, color, timeout }) {
    color = color || 'error'
    timeout = timeout || 4000
    commit('setToast', { msg, color, timeout })
  },
  // ログイン前ユーザーがアクセスしたルートを記憶する
  getRememberPath ({ state, commit }, { name, params, query }) {
    // ログイン前パスが渡された場合はloggedIn.homePathに書き換える
    if (state.loggedIn.redirectPaths.includes(name)) {
      name = state.loggedIn.homePath.name
    }
    params = params || {}
    query = query || {}
    commit('setRememberPath', { name, params, query })
  }
}
  