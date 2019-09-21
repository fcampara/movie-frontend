
export default async ({ router, store }) => {
  router.beforeEach((to, _, next) => {
    const { user, token } = store.state.auth
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
