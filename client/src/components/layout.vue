<template>
  <div class="page">
    <navHeader></navHeader>
    <router-view  class="main"></router-view>
  </div>
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
    }
  },
  components: {
    navHeader
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/css/_common.scss';
.page {
  height: 100%;
}

.main {
  height: calc(100% - #{$header-height});
  overflow: hidden;
}
</style>


