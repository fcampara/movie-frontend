export default async ({ router, store }) => {
  const { user, token } = store.state.auth
  const { id, name } = store.state.profile

  let path = { name: 'login' }
  if (user && token) path = { name: 'profile' }
  if (user && token && id && name) path = { name: 'index' }

  await router.replace(path)

  // new Vue(app) /* eslint-disable-line no-new */
}
