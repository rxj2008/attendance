import Vue from 'vue'

Vue.filter('padLeft', function (num, digit) {
  let len = ('' + num).length
  return Array(Math.max(0, digit - len + 1)).join(0) + num
})
