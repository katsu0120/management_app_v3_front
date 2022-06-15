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

    const payload = [
      { id: 1, 
        user_id: 1, 
        title: "gestUser0の個人ProjectTitle1", 
        content: "gestUser0のcomtent1", 
        completed: true, 
        created_at: "2022-06-14 21:19:57.551293000 +0900", 
        updated_at: "2022-06-14 21:19:57.568072000 +0900"
      },
      { id: 2, 
        user_id: 1, 
        title: "gestUser0の個人ProjectTitle2", 
        content: "gestUser0のcomtent2", 
        completed: true, 
        created_at: "2022-06-14 22:19:57.551293000 +0900", 
        updated_at: "2022-06-14 21:19:57.568072000 +0900"
      },
      { id: 3, 
        user_id: 1, 
        title: "gestUser0の個人ProjectTitle3", 
        content: "gestUser0のcomtent3", 
        completed: true, 
        created_at: "2022-06-14 23:19:57.551293000 +0900", 
        updated_at: "2022-06-14 21:19:57.568072000 +0900"
      }
    ]

    test("projectがちゃんとget出来てstateに格納されていること", () => {
      // この段階では何も格納されていない
      expect(store.state.project.list).toEqual([])
      // dispatch
      store.dispatch('getProjectList', payload)
      
      // payloadの数とstateに格納されたlengthの数が一致する
      expect(store.state.project.list.length).toEqual(payload.length)

      // 同じプロジェクトが格納されているので最初のプロジェクトの
      // idが一致
      expect(store.state.project.list[0].id).toEqual(payload[0].id)
      // user_idが一致
      expect(store.state.project.list[0].user_id).toEqual(payload[0].user_id)
      // titleが一致
      expect(store.state.project.list[0].title).toEqual(payload[0].title)
      // contentが一致
      expect(store.state.project.list[0].content).toEqual(payload[0].content)
      // completedが一致
      expect(store.state.project.list[0].completed).toEqual(payload[0].completed)
      
    })

    test("projectを選択したらちゃんとcurrentに選択出来ていること", () => {
      // user1のprojectをstateに格納
      store.dispatch('getProjectList', payload)

      const params = {id: 1} 
      store.dispatch('getCurrentProject', params)

      // payloadのid:1のprojectを選択しているので全ての情報が一致していることが分かる
      // idが一致
      expect(store.state.project.current.id).toEqual(payload[0].id)
      // user_idが一致
      expect(store.state.project.current.user_id).toEqual(payload[0].user_id)
      // titleが一致
      expect(store.state.project.current.title).toEqual(payload[0].title)
      // contentが一致
      expect(store.state.project.current.content).toEqual(payload[0].content)
      // completedが一致
      expect(store.state.project.current.completed).toEqual(payload[0].completed)
    })

    
  })
})



