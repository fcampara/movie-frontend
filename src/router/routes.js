
const routes = [
  {
    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'),
    meta: { authRequired: true },
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Login.vue') },
      { path: '/auth/create', component: () => import('pages/Create.vue') }
    ]
  }
]

routes.push({ path: '*', component: () => import('pages/Error404.vue') })

export default routes
