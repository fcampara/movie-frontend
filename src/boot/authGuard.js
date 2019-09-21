
export default async ({ router, store }) => {
  router.beforeEach((to, from, next) => {
    const { user, token } = store.state.Auth
    const authRequired = to.matched.some(route => route.meta.authRequired)
    if (authRequired) {
      if (user && token) {
        return next()
      }

      return next({ path: '/auth/' })
    }
    return next()
  })
}
