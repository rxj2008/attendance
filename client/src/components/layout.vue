<template>
  <navHeader></navHeader>
</template>
<script>
import navHeader from './common/header'
export default {
  data() {
    return {
      activeIndex: '1'
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    }
  },
  components: {
    navHeader
  }
}
</script>

