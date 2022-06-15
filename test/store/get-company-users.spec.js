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
        name: "testCompany1",
        owner_id: 1,
        created_at: "2022-06-14T21:19:57.045+09:00",
        updated_at: "2022-06-14T21:19:57.045+09:00"
      },
    ]

    const companyUsers = [
      {
        id: 2,
        name: "gestUser1",
        email: "gestuser1@example.com",
        user_profile: "ゲストユーザー1のプロフィールです。"
      },
      {
        id: 3,
        name: "gestUser2",
        email: "gestuser2@example.com",
        user_profile: "ゲストユーザー2のプロフィールです。"
      },
      {
        id: 4,
        name: "gestUser3",
        email: "gestuser3@example.com",
        user_profile: "ゲストユーザー3のプロフィールです。"
      }
    ]

    test("company一覧から選択してcurrent-companyをstateに格納出来ること", () => {
      // current_userの参加カンパニーがstate.company.listに格納されている
      store.dispatch('getCompanyList', companies)
      // companiesのid:1を選択
      const params = {id: 1}
      store.dispatch('getCurrentCompany', params)
      // stateにcompany参加ユーザーを格納
      store.dispatch('getCompanyUsersList', companyUsers)
      // 問題なく参加ユーザーがstateに格納されているのでcompanyUsersの変数とlengthが同じになる
      expect(store.state.companyUsers.list.length).toEqual(companyUsers.length) 
     
    })

  })
})



