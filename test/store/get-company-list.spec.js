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

  describe("カンパニー一覧表示時のstoreテスト", () => {

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

    test("userが参加しているcompanyの一覧が返されている事", () => {
      // current_userの参加カンパニーがstate.company.listに格納されている
      store.dispatch('getCompanyList', companies)
      // // companiesの数とstateに格納されたlengthの数が一致する
      expect(store.state.company.list.length).toEqual(companies.length)

      // 代表して最初のプロジェクトの中身が一致しているか見ている
      // idが一致
      expect(store.state.company.list[0].id).toEqual(companies[0].id)
      // user_idが一致
      expect(store.state.company.list[0].name).toEqual(companies[0].name)
      // titleが一致
      expect(store.state.company.list[0].owner_id).toEqual(companies[0].owner_id)
      // contentが一致
      expect(store.state.company.list[0].created_at).toEqual(companies[0].created_at)
      // completedが一致
      expect(store.state.company.list[0].completed).toEqual(companies[0].completed)
      
    })

  })
})



