import Vue from 'vue'
import Vuex from 'vuex'
import calendar from './modules/calendar'
import attendance from './modules/attendance'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    calendar,
    attendance
  }
})
