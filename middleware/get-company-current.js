export default async ({ store, params }) => {
  if (store.state.company.current !== params) {
    await store.dispatch('getCurrentCompany', params)
  }
}
