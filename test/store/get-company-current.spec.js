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

  describe("カンパニー選択時のstoreテスト", () => {

    const companies = [
      {
        id: 1,
        name: "テストカンパニー1",
        owner_id: 1,
        created_at: "2022-06-14T21:19:57.045+09:00",
        updated_at: "2022-06-14T21:19:57.045+09:00"
      },
      {
        id: 2,
        name: "テストカンパニー2",
        owner_id: 2,
        created_at: "2022-06-15T21:13:57.045+09:00",
        updated_at: "2022-06-15T21:14:57.045+09:00"
      },
      {
        id: 3,
        name: "テストカンパニー3",
        owner_id: 3,
        created_at: "2022-06-17T21:20:57.045+09:00",
        updated_at: "2022-06-18T21:21:31:57.045+09:00"
      }
    ]

    test("company一覧から選択してcurrent-companyをstateに格納出来ること", () => {
      // current_userの参加カンパニーがstate.company.listに格納されている
      store.dispatch('getCompanyList', companies)
      // // companiesの数とstateに格納されたlengthの数が一致する
      expect(store.state.company.list.length).toEqual(companies.length)
      // companiesのid:1を選択
      const params = {id: 1}
      store.dispatch('getCurrentCompany', params)
      // stateに格納されたため
      // idが一致
      expect(store.state.company.current.id).toEqual(companies[0].id)      
      // nameが一致
      expect(store.state.company.current.name).toEqual(companies[0].name)      
      // owner_idが一致
      expect(store.state.company.current.owner_id).toEqual(companies[0].owner_id)      
      // created_atが一致
      expect(store.state.company.current.created_at).toEqual(companies[0].created_at)      
      // updated_atが一致
      expect(store.state.company.current.updated_at).toEqual(companies[0].updated_at)      
    })

  })
})



