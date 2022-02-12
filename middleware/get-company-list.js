export default async ({ store, $axios }) => {
  await $axios.$get('/api/v1/companies')
    .then(companies => store.dispatch('getCompanyList', companies))
}
