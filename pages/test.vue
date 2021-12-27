<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="recentTasks"
      sort-by="calories"
      class="elevation-1"
      fluid
    >
      <template #top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>
            My Tasks
          </v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          />
          <v-spacer />
          <v-dialog
            v-model="dialog"
            max-width="500px"
          >
            <template #activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
              >
                New Task
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">New Item</span>
              </v-card-title>
              <v-card-text>
                <v-container fluid>
                  <v-text-field
                    v-model="newItem.title"
                    label="title"
                  />
                  <v-textarea
                    v-model="newItem.content"
                    name="input-7-1"
                    label="content"
                    auto-grow
                  />
                </v-container>
                <small>*indicates required field</small>
              </v-card-text>

              <v-card-actions>
                <v-spacer />
                <v-btn
                  color="blue darken-1"
                  text
                  @click="dialog = false"
                >
                  Cancel
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="createTask"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog
            v-model="dialogDelete"
            max-width="500px"
          >
            <v-card>
              <v-card-title class="text-h5">
                タスクの削除をしますか？
              </v-card-title>
              <v-card-actions>
                <v-spacer />
                <v-btn
                  color="blue darken-1"
                  text
                  @click="dialogDelete = false"
                >
                  Cancel
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="deleteTask"
                >
                  OK
                </v-btn>
                <v-spacer />
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog
            v-model="dialogEdit"
            max-width="500px"
          >
            <v-card>
              <v-card-title>
                <span class="text-h5">Edit Task</span>
              </v-card-title>
              <v-card-text>
                <v-container fluid>
                  <v-text-field
                    v-model="editItem.title"
                    label="title"
                  />
                  <v-textarea
                    v-model="editItem.content"
                    name="input-7-1"
                    label="content"
                    auto-grow
                  />
                </v-container>
                <small>*indicates required field</small>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn
                  color="blue darken-1"
                  text
                  @click="dialogEdit = false"
                >
                  Cancel
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="editTask"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template #[`item.id`]="{ item }">
        {{ item.id }}
      </template>
      <template #[`item.updated_at`]="{ item }">
        {{ $my.dateFormat(item.updated_at) }}
      </template>
      <template #[`item.created_at`]="{ item }">
        {{ $my.dateFormat(item.updated_at) }}
      </template>
      <template #[`item.actions`]="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="dialogEditOpen(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="dialogDeleteOpen(item)"
        >
          mdi-delete
        </v-icon>
      </template>
      <template #no-data>
        <h3>データがありません</h3>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  layout: 'tasks',
  middleware: ['get-project-task'],
  data: () => ({
    // loading:false,
    dialog: false,
    dialogDelete: false,
    dialogEdit: false,
    headers: [
      {
        text: 'ID',
        align: 'start',
        sortable: false,
        value: 'id'
      },
      { text: 'title', value: 'title' },
      { text: 'content', value: 'content' },
      { text: 'created_at', value: 'created_at' },
      { text: 'updated_at', value: 'updated_at' },
      { text: 'Actions', value: 'actions', sortable: false }
    ],
    // desserts: [],
    // editedIndex: -1,
    editItem: { id: '', title: '', content: '' },
    newItem: { title: '', content: '' },
    deleteItem: { id: '', title: '', content: '' }
  }),
  computed: {
    recentTasks () {
      const copyTasks = Array.from(this.$store.state.project.task)
      return copyTasks.sort((a, b) => {
        if (a.updated_at > b.updated_at) { return -1 }
        if (a.updated_at < b.updated_at) { return 1 }
        return 0
      })
    }
  },
  methods: {
    async createTask () {
      console.log(this.newItem.title)
      console.log(this.newItem.content)
      this.loading = true
      await this.$axios.$post('/api/v1/tasks', this.newItem)
        .then(response => this.setState(response))
        .catch(error => this.createFailure(error))
      // this.loading = false
      this.dialog = false
      this.newItem.title = ''
      this.newItem.content = ''
    },
    setState (response) {
      console.log(response)
      const copyTasks = Array.from(this.$store.state.tasks.task)
      copyTasks.push(response)
      // TODO削除
      console.log(copyTasks)
      this.$store.dispatch('getTasks', copyTasks)
    },
    createFailure (error) {
      console.log(error)
    },
    dialogEditOpen (item) {
      // Todo削除
      console.log(item)
      console.log(item.title)
      console.log(item.content)
      this.editItem.id = item.id
      this.editItem.title = item.title
      this.editItem.content = item.content
      console.log(this.editItem.id)
      console.log(this.editItem.title)
      console.log(this.editItem.content)
      this.dialogEdit = true
    },
    async editTask () {
      await this.$axios.$put('/api/v1/tasks', this.editItem)
        .then(response => this.editComplete(response))
        .catch(error => this.editFailure(error))
    },
    async editComplete (response) {
      console.log(response)
      await this.$axios.$get('/api/v1/tasks')
        .then(tasks => this.$store.dispatch('getTasks', tasks))
      this.dialogEdit = false
    },
    editFailure (error) {
      console.log(error)
    },
    dialogDeleteOpen (item) {
      // console.log(item.id)
      // console.log(item.title)
      // console.log(item.content)
      this.deleteItem.id = item.id
      this.deleteItem.item = item.title
      this.deleteItem.content = item.content
      // console.log(this.deleteItem.id)
      // console.log(this.deleteItem.item)
      // console.log(this.deleteItem.content)
      this.dialogDelete = true
    },
    async deleteTask () {
      console.log('deleteのconsole発火')
      console.log(this.deleteItem)
      await this.$axios.$delete('/api/v1/tasks', { data: this.deleteItem })
        .then(response => this.deleteComplete(response))
        .catch(error => this.deleteFailure(error))
      this.dialogDelete = false
    },
    async deleteComplete (response) {
      console.log('下記がdeleteCompleteのresponse')
      console.log(response)
      await this.$axios.$get('/api/v1/tasks')
        .then(tasks => this.$store.dispatch('getTasks', tasks))
    }
  }
}
</script>
