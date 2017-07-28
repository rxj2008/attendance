<template>
  <div>
    <navHeader></navHeader>
    <main>
      <router-view></router-view>
    </main>
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

