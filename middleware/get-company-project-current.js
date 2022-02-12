export default async ({ store, params }) => {
  console.log('middleware/get-company-project-current.js', params)
  return await store.dispatch('getCompanyProjectCurrent', params)
}
