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

  describe("カレントユーザーの情報が取得できている事", () => {
    const payload = {id: 3, name: 'gestUser2', email: 'gestuser2@example.com', user_profile: 'ゲストユーザー2のプロフィールです'}

    test("カレントユーザーのidが取得できてること", () => {
      store.dispatch('getCurrentUserInformation', payload)
      expect(store.state.user.information.id).toEqual(payload.id)
    })
    test("カレントユーザーのnameが取得できてること", () => {
      store.dispatch('getCurrentUserInformation', payload)
      expect(store.state.user.information.name).toEqual(payload.name)
    })
    test("カレントユーザーのemailが取得できてること", () => {
      store.dispatch('getCurrentUserInformation', payload)
      expect(store.state.user.information.email).toEqual(payload.email)
    })
    test("カレントユーザーのuser_profileが取得できてること", () => {
      store.dispatch('getCurrentUserInformation', payload)
      expect(store.state.user.information.user_profile).toEqual(payload.user_profile)
    })

  })
})



