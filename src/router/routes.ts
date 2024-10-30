import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'week1',
        component: () => import('layouts/WeekNavigationLayout.vue'),
        children: [
          {
            path: 'exercise1',
            component: () => import('pages/week1/Exercise1.vue'),
          },
          {
            path: 'exercise2',
            component: () => import('pages/week1/Exercise2.vue'),
          },
          {
            path: 'exercise3',
            component: () => import('pages/week1/Exercise3.vue'),
          },
          {
            path: 'exercise4',
            component: () => import('pages/week1/Exercise4.vue'),
          },
          {
            path: 'exercise5',
            component: () => import('pages/week1/Exercise5.vue'),
          },
          {
            path: 'exercise6',
            component: () => import('pages/week1/Exercise6.vue'),
          },
        ],
      },
    ],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
