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

  describe("プロジェクトのtask一覧が取得できていること", () => {

    const project = [
      { id: 1, 
        user_id: 1, 
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

    test("projectに関連づけられてちゃんとTasksが格納されていること", () => {
      // この段階では何も格納されていない
      expect(store.state.project.list).toEqual([])
      expect(store.state.project.task).toEqual([])
      
      // ユーザーのプロジェクト一覧をstateに格納
      store.dispatch('getProjectList', project)
      // projectの数とstateに格納されたlengthの数が一致する
      expect(store.state.project.list.length).toEqual(project.length)
      // project_id:1のprojectを選択
      const params = {id: 1} 
      store.dispatch('getCurrentProject', params)
      // project_id:1のtasksをstateに格納
      store.dispatch('getTasks', tasks)
      // tasks.lengthとstateに格納されたlengthの数が一致する
      expect(store.state.project.task.length).toEqual(tasks.length)
      
    })
    
  })
})



