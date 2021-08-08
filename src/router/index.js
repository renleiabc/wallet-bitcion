/*
 * @Author: abc
 * @Date: 2021-07-28 17:31:16
 * @LastEditors: abc
 * @LastEditTime: 2021-08-08 19:54:24
 * @Description:
 */
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '首页'
    }
  },
  {
    path: '/transfer',
    name: 'Transfer',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Transfer.vue'),
    meta: {
      title: '转账'
    }
  },
  {
    path: '/private',
    name: 'Private',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Private.vue'),
    meta: {
      title: '私钥'
    }
  },
  {
    path: '/Address',
    name: 'Address',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Address.vue'),
    meta: {
      title: '公钥和地址'
    }
  },
  {
    path: '/signature',
    name: 'Signature',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Signature.vue'),
    meta: {
      title: '签名'
    }
  },
  {
    path: '/segwit',
    name: 'Segwit',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Segwit.vue'),
    meta: {
      title: 'Segwit地址'
    }
  },
  {
    path: '/hd',
    name: 'HD',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/HDWallet.vue'),
    meta: {
      title: 'HD钱包'
    }
  },
  {
    path: '/words',
    name: 'Words',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/words.vue'),
    meta: {
      title: '助记词'
    }
  },
  {
    path: '/balance',
    name: 'Balance',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Balance.vue'),
    meta: {
      title: '余额'
    }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});
const defaultTitle = '私钥';
router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? to.meta.title : defaultTitle;
  next();
});
export default router;
