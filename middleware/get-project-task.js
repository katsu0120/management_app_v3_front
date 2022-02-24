export default async ({ store, $axios, params }) => {
  await $axios.$get('/api/v1/tasks', { params })
    .then(tasks => store.dispatch('getTasks', tasks))
}
