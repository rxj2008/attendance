import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/layout'
import Index from '@/components/index'
import Upload from '@/components/upload'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'layout',
    component: Layout,
    children: [{
      path: '/index',
      name: 'index',
      component: Index
    },
    {
      path: 'upload',
      name: 'upload',
      component: Upload
    }]
  }]
})
