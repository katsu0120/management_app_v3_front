export default async ({ store, params }) => {
  // console.log('middleware/get-company-current.js', params)
  console.log('これがget-company-currentのparams')
  console.log(params)
  console.log(store.state.company.current)
  const companyCurrent = store.state.company.current
  console.log('この下がカンパニーカレント')
  console.log(companyCurrent)
  if (companyCurrent !== params) {
    return await store.dispatch('getCurrentCompany', params)
  }
}
