export default async ({ router, store }) => {
  const { user, token } = store.state.auth

  const path = user && token ? { name: 'index' } : { name: 'profile' }
  await router.replace(path)

  // new Vue(app) /* eslint-disable-line no-new */
}
