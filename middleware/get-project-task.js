export default async ({ store, $axios, params }) => {
  console.log('middleware/get-project-task.js', params)
  await $axios.$get('/api/v1/tasks', { params })
    .then(tasks => store.dispatch('getTasks', tasks))
}
