
export default async ({ Vue, app, router, store }) => {
  const { user, token } = store.state.Auth

  const path = user && token ? { path: '/admin' } : { path: '/auth' }
  router.replace(path)
  new Vue(app) /* eslint-disable-line no-new */
}
