
const routes = [
  {
    path: '/home',
    component: () => import('layouts/AdminLayout.vue'),
    meta: { authRequired: true },
    children: [
      { path: '', name: 'index', component: () => import('pages/Index.vue') },
      { path: '/suggestions', name: 'suggestion', component: () => import('pages/Suggestions.vue') },
      { path: '/myList', name: 'myList', component: () => import('pages/MyList.vue') }
    ]
  },
  {
    path: '/auth',
    meta: { authRequired: false },
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      { path: '', name: 'login', component: () => import('pages/Login.vue') },
      { path: '/auth/create', component: () => import('pages/CreateAccount.vue') }
    ]
  },
  {
    path: '/profile',
    meta: { authRequired: true },
    component: () => import('layouts/ProfileLayout.vue'),
    children: [
      { path: '', name: 'profile', component: () => import('pages/Profile.vue') }
    ]
  }
]

// routes.push({ path: '*', component: () => import('pages/Error404.vue') })

export default routes
