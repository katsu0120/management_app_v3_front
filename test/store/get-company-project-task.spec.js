import Vuex from "vuex"
import * as index from "@/store/index"
import { createLocalVue } from "@vue/test-utils"

const localVue = createLocalVue()
localVue.use(Vuex)


describe("index", () => {
  let store
  beforeEach(() => {
    store = new Vuex.Store(index)
  })

  describe("ユーザーのプロジェクト一覧が取得できていること", () => {

    const companies = [
      {
        id: 1,
        name: "テストカンパニー1",
        owner_id: 1,
        created_at: "2022-06-14T21:19:57.045+09:00",
        updated_at: "2022-06-14T21:19:57.045+09:00"
      }
     ]

    const companyProjects = [
      { id: 1, 
        user_id: 1,
        company_id: 1, 
        title: "gestUser0の個人ProjectTitle1", 
        content: "gestUser0のcomtent1", 
        completed: true, 
        created_at: "2022-06-14 21:19:57.551293000 +0900", 
        updated_at: "2022-06-14 21:19:57.568072000 +0900"
      }
    ]

    const tasks = [
      {
        id: 1,
        project_id: 1,
        title: "TaskTitle1",
        content: "TaskContent1",
        completed: false,
        created_at: "2022-06-14T21:19:58.966+09:00",
        updated_at: "2022-06-14T21:19:58.994+09:00"
      },
      {
        id: 2,
        project_id: 1,
        title: "TaskTitle2",
        content: "TaskContent2",
        completed: false,
        created_at: "2022-06-15T21:15:58.966+09:00",
        updated_at: "2022-06-15T21:15:58.994+09:00"
      },
      {
        id: 3,
        project_id: 1,
        title: "TaskTitle3",
        content: "TaskContent3",
        completed: false,
        created_at: "2022-06-16T21:19:58.966+09:00",
        updated_at: "2022-06-16T21:19:58.994+09:00"
      },
     ]
    

    test("projectに関連づけられてちゃんとcompany_tasksが格納されていること", () => {
      
      // この時点ではまだ何も格納されていない
      expect(store.state.companyProject.list).toEqual([])
      expect(store.state.companyProject.task).toEqual([])
      // companyProjectsをstateを格納
      store.dispatch('getCompanyProjectList', companyProjects)
      // ちゃんとstateに格納されたのでstateとcompanyProjectsのlengthが同じになる。
      expect(store.state.companyProject.list.length).toEqual(companyProjects.length)
      // company_projectを選択
      const params = {id: '1', projectId: '1'}
      store.dispatch('getCompanyProjectCurrent', params)
      // company_tasksのtaskをstateに格納
      store.dispatch('getCompanyTasks', tasks)

      // 本当に同じtaskが格納されているかidを確認する
      expect(store.state.companyProject.task[0].id).toEqual(tasks[0].id)
      expect(store.state.companyProject.task[1].id).toEqual(tasks[1].id)
      expect(store.state.companyProject.task[2].id).toEqual(tasks[2].id)
    })
    
  })
})



