/*
 * @Author: Colin
 * @Description: BI 分析
 */
export default [
  {
    key: '1',
    path: '/application',
    name: 'Application',
    meta: {
      requiresAuth: true,
      title: '应用列表'
    },
    redirect: { name: 'ApplicationList' },
    component: () => import(/* webpackChunkName: "index" */ '@/views/layout/index.vue'),
    children: [
      {
        path: 'applicationList',
        name: 'ApplicationList',
        props: true,
        meta: {
          icon: 'iconshijianfenxi',
          title: '应用列表'
        },
        component: () => import(/* webpackChunkName: "ApplicationList" */ '@/views/application/ApplicationList.vue')
      }
    ]
  }
]
