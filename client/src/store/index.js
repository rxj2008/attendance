import Vue from 'vue'
import Vuex from 'vuex'
import calendar from './modules/calendar'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    calendar
  }
})
