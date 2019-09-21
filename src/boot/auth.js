
export default async ({ Vue, app, router, store }) => {
  const { user, token } = store.state.auth

  const path = user && token ? { name: 'index' } : { name: 'login' }
  await router.replace(path)
  new Vue(app) /* eslint-disable-line no-new */
}
