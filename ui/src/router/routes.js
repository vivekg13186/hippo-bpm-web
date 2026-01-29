const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/accounts', component: () => import('src/pages/AccountsPage.vue') },
      { path: '/appExplorer', component: () => import('pages/AppExplorer.vue') },
      { path: '/toolkitExplorer', component: () => import('pages/ToolkitExplorer.vue') },
      { path: '/instanceViewer', component: () => import('pages/InstanceViewer.vue') },
      { path: '/testService', component: () => import('pages/TestService.vue') },
      { path: '/runService/:id', component: () => import('pages/RunService.vue') },
      { path: '/userDetails', component: () => import('pages/UserDetails.vue') },
      { path: '/teamDetails', component: () => import('pages/TeamDetails.vue') },
      { path: '/groupDetails', component: () => import('pages/GroupDetails.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
