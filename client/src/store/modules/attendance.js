import * as types from '../mutation-types'

const state = {
  list: [],
  year: 0,
  month: 0
}

const getters = {
  attendances: (state) => {
    return state.list
  }
}

const actions = {
  getAttendance({
    commit,
    state
  }, params) {
    if (!state.list) {
      return []
    }
    let {
      name,
      year,
      month
    } = params
    let id = `${name}-${year}${month < 10 ? ('0' + month) : month}`
    let rtn = state.list.find(item => {
      return item.id === id
    })
    return Promise.resolve(rtn)
  },
  saveAttendance({
    commit
  }, attendance) {
    commit(types.ATTENDANCE_SET, attendance)
  }
}

const mutations = {
  [types.ATTENDANCE_SET]: function (state, attendances) {
    state.list = attendances.list
    state.year = attendances.year
    state.month = attendances.month
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
