import Vue from 'vue'

Vue.filter('padLeft', function (num, digit) {
  return Array(digit > num ? (digit - ('' + num).length + 1) : 0).join(0) + num
})
