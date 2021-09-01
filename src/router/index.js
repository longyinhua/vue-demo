/**
 *
 * @description router全局配置，如有必要可分文件抽离
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layouts'
import EmptyLayout from '@/layouts/EmptyLayout'
import { publicPath, routerMode } from '@/config'

Vue.use(VueRouter)

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
  },
  {
    path: '/register',
    component: () => import('@/views/register/index'),
    hidden: true,
  },
  {
    path: '/401',
    name: '401',
    component: () => import('@/views/401'),
    hidden: true,
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404'),
    hidden: true,
  },
]

/*当settings.js里authentication配置的是intelligence时，views引入交给前端配置*/
export const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: '/index',
        name: 'Index',
        component: () => import('@/views/index/index'),
        meta: {
          title: '首页',
          icon: 'home',
          affix: true,
          keepAlive: true,
        },
      },
    ],
  },
  {
    path: '/personalCenter',
    component: Layout,
    hidden: true,
    redirect: 'personalCenter',
    children: [
      {
        path: 'personalCenter',
        name: 'personalCenter',
        component: () => import('@/views/personalCenter/index'),
        meta: {
          title: '个人中心',
          keepAlive: true,
        },
      },
    ],
  },
  {
    path: '/project',
    component: Layout,
    redirect: 'noRedirect',
    name: 'project',
    meta: { title: '系统管理', icon: 'users-cog' },
    children: [
      {
        path: 'user',
        name: 'user',
        component: () => import('@/views/project/user/index'),
        meta: {
          title: '用户管理',
          keepAlive: true,
        },
      },
      {
        path: 'role',
        name: 'role',
        component: () => import('@/views/project/role/index'),
        meta: {
          title: '角色管理',
          keepAlive: true,
        },
      },
      {
        path: 'operation',
        name: 'operation',
        component: () => import('@/views/project/operation/index'),
        meta: {
          title: '操作日志',
          keepAlive: true,
        },
      },
      /*{
        path: 'system',
        name: 'system',
        component: () => import('@/views/project/system/index'),
        meta: {
          title: '设置'
        }
      },*/ {
        path: 'department',
        name: 'department',
        component: () => import('@/views/project/department/index'),
        meta: {
          title: '部门管理',
        },
      },
      {
        path: 'menu',
        name: 'menu',
        component: () => import('@/views/project/menu/index'),
        meta: {
          title: '菜单管理',
        },
      },
    ],
  },
  {
    path: '/vuecomponents',
    component: Layout,
    redirect: 'noRedirect',
    name: 'project',
    meta: { title: '组件', icon: 'users-cog' },
    children: [
      {
        path: 'echarts',
        name: 'echarts',
        component: () => import('@/views/vuecomponents/echarts/index'),
        meta: {
          title: 'echarts',
        },
      },
      {
        path: 'JS',
        name: 'TS',
        component: () => import('@/views/vuecomponents/echarts/index2'),
        meta: {
          title: 'TS',
        },
      },
    ],
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true,
  },
]

const router = new VueRouter({
  base: routerMode === 'history' ? publicPath : '',
  mode: routerMode,
  scrollBehavior: () => ({
    y: 0,
  }),
  routes: constantRoutes,
})
//注释的地方是允许路由重复点击，如果你觉得框架路由跳转规范太过严格可选择放开
/* const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch((err) => err);
}; */

export function resetRouter() {
  router.matcher = new VueRouter({
    base: routerMode === 'history' ? publicPath : '',
    mode: routerMode,
    scrollBehavior: () => ({
      y: 0,
    }),
    routes: constantRoutes,
  }).matcher
}

export default router
