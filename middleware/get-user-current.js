export default async ({ store, $axios }) => {
  await $axios.get('/api/v1/users')
    .then(user => store.dispatch('getCurrentUserInformation', user))
}
