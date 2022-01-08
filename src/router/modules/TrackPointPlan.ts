/*
 * @Author: Colin
 * @Description: 埋点方案
 */
export default [
  {
    key: '2',
    path: '/trackPointPlan',
    name: 'TrackPointPlan',
    meta: {
      requiresAuth: true,
      title: '埋点方案',
      icon: 'iconpiechart'
    },
    redirect: { name: 'ClientPoint' },
    component: () => import(/* webpackChunkName: "index" */ '@/views/layout/index.vue'),
    children: [
      {
        path: 'clientPoint',
        name: 'ClientPoint',
        props: true,
        meta: {
          icon: 'iconshijianfenxi',
          title: '客户端埋点'
        },
        component: () => import(/* webpackChunkName: "ClientPoint" */ '@/views/trackPoint/ClientPoint.vue')
      },
      {
        path: 'serverPoint',
        name: 'ServerPoint',
        props: true,
        meta: {
          icon: 'iconshijianfenxi',
          title: '服务端埋点'
        },
        component: () => import(/* webpackChunkName: "ServerPoint" */ '@/views/trackPoint/ServerPoint.vue')
      }
    ]
  }
]
