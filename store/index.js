const homePath = 'projects'

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
      params: {}
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
  companyProject: {
    current: null,
    list: []
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
  // Company
  setCompanyList (state, payload) {
    state.company.list = payload
  },
  setCurrentCompany (state, payload) {
    state.company.current = payload
  },
  // 共有プロジェクト
  setCompanyProjectList (state, payload) {
    state.companyProject.list = payload
  },
  setCompanyProjectCurrent (state, payload) {
    state.companyProject.current = payload
  },
  // 個人プロジェクト
  setProjestList (state, payload) {
    state.project.list = payload
  },
  setCurrentProject (state, payload) {
    state.project.current = payload
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
  },
  setTasks (state, payload) {
    state.project.task = payload
  }
}

export const actions = {
  // Company
  getCompanyList ({ commit }, companies) {
    companies = companies || []
    commit('setCompanyList', companies)
  },
  getCurrentCompany ({ state, commit }, params) {
    console.log('getCurrentCompany/params', params)
    let currentCompany = null
    if (params && params.id) {
      const id = Number(params.id)
      currentCompany = state.company.list.find(company => company.id === id) || null
    }
    console.log('getCurrentCompany', currentCompany)
    commit('setCurrentCompany', currentCompany)
  },
  // 共有プロジェクト
  getCompanyProjectList ({ commit }, projects) {
    projects = projects || []
    commit('setCompanyProjectList', projects)
  },
  // 共有プロジェクトのプロジェクトの選択
  getCompanyProjectCurrent ({ state, commit }, params) {
    let companyProjectCurrent = null
    if (params && params.projectId) {
      const id = Number(params.projectId)
      companyProjectCurrent = state.companyProject.list.find(projectCurrent => projectCurrent.id === id) || null
    }

    commit('setCompanyProjectCurrent', companyProjectCurrent)
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
  getRememberPath ({ state, commit }, { name, params }) {
    // ログイン前パスが渡された場合はloggedIn.homePathに書き換える
    if (state.loggedIn.redirectPaths.includes(name)) {
      name = state.loggedIn.homePath.name
    }
    params = params || {}
    commit('setRememberPath', { name, params })
  },
  getTasks ({ commit }, tasks) {
    tasks = tasks || []
    commit('setTasks', tasks)
  }
}
