import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '@/pages/home/home.vue';
import BaseLayout from '@/layout/BaseLayout.vue';
import NotFound from '@/pages/other/not_found.vue';
import SSh from '@/pages/ssh/ssh.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: BaseLayout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: Home,
      },
      {
        path: 'ssh',
        component: SSh,
      },
    ],
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
