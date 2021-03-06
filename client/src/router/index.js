import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import Layout from '@/components/layout'
import Index from '@/components/index'
import Upload from '@/components/upload'
import List from '@/components/list'
import Detail from '@/components/detail'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'layout',
    component: Layout,
    children: [{
      path: 'index',
      name: 'index',
      component: Index
    },
    {
      path: 'upload',
      name: 'upload',
      component: Upload
    },
    {
      path: 'list',
      name: 'list',
      component: List,
      beforeEnter: beforeEnter
    },
    {
      path: 'detail/:name',
      name: 'detail',
      component: Detail,
      beforeEnter: beforeEnter
    }
    ]
  }]
})

function beforeEnter(to, from, next) {
  if (!store.state.attendance.list || !store.state.attendance.list.length) {
    next({
      name: 'upload'
    })
  } else {
    next()
  }
}
