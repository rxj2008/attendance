import {
  holidays
} from '../../../static/data/holidays'

const actions = {
  getCalender({
    commit
  }, {
    start,
    end
  }) {
    return holidays.filter(item => {
      return item.id >= start.id && item.id <= end.id
    })
  }
}

export default {
  actions
}
