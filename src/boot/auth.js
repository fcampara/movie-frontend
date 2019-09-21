export default async ({ router, store }) => {
  const { user, token } = store.state.auth
  const { name, id } = store.state.profile

  if (user && token) {
    const path = name && id ? { name: 'index' } : { name: 'profile' }
    await router.replace(path)
  } else {
    await router.replace({ name: 'login' })
  }

  // new Vue(app) /* eslint-disable-line no-new */
}
