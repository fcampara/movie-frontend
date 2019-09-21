
export default async ({ Vue, app, router, store }) => {
  const { user, token } = store.state.Auth

  const path = user && token ? { name: 'index' } : { name: 'login' }
  await router.replace(path)
  new Vue(app) /* eslint-disable-line no-new */
}
