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
      },
      { id: 2, 
        user_id: 1,
        company_id: 1,
        title: "gestUser0の個人ProjectTitle2", 
        content: "gestUser0のcomtent2", 
        completed: true, 
        created_at: "2022-06-14 22:19:57.551293000 +0900", 
        updated_at: "2022-06-14 21:19:57.568072000 +0900"
      },
      { id: 3, 
        user_id: 1,
        company_id: 1, 
        title: "gestUser0の個人ProjectTitle3", 
        content: "gestUser0のcomtent3", 
        completed: true, 
        created_at: "2022-06-14 23:19:57.551293000 +0900", 
        updated_at: "2022-06-15 21:19:57.568072000 +0900"
      }
    ]
    

    test("company_projectがちゃんとget出来てstateに格納されていること", () => {
      
      // この時点ではまだ何も格納されていない
      expect(store.state.companyProject.list).toEqual([])
      // dispatch
      store.dispatch('getCompanyProjectList', companyProjects)
      // ちゃんとstateに格納されたのでstateとcompanyProjectsのlengthが同じになる。
      expect(store.state.companyProject.list.length).toEqual(companyProjects.length)
      
      // 本当に同じプロジェクトが格納されているかidを確認する
      expect(store.state.companyProject.list[0].id).toEqual(companyProjects[0].id)
      expect(store.state.companyProject.list[1].id).toEqual(companyProjects[1].id)
      expect(store.state.companyProject.list[2].id).toEqual(companyProjects[2].id)
    
    })

    test("company_projectを選択したらちゃんとcurrentに選択出来ていること", () => {
      // user1のprojectをstateに格納
      store.dispatch('getCompanyProjectList', companyProjects)
      // ちゃんとstateに格納されたのでstateとcompanyProjectsのlengthが同じになる。
      expect(store.state.companyProject.list.length).toEqual(companyProjects.length)

      const params = {id: '1', projectId: '1'}
      store.dispatch('getCompanyProjectCurrent', params)

      // companyProjectsのid:1のprojectを選択しているので全ての情報が一致していることが分かる
      // idが一致
      expect(store.state.companyProject.current.id).toEqual(companyProjects[0].id)
      // user_idが一致
      expect(store.state.companyProject.current.user_id).toEqual(companyProjects[0].user_id)
      // company_idが一致
      expect(store.state.companyProject.current.company_id).toEqual(companyProjects[0].company_id)
      // titleが一致
      expect(store.state.companyProject.current.title).toEqual(companyProjects[0].title)
      // contentが一致
      expect(store.state.companyProject.current.content).toEqual(companyProjects[0].content)
    })

    
  })
})



