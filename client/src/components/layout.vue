<template>
  <div class="page">
    <navHeader></navHeader>
    <transition  :name="transitionName" >
      <router-view class="main"></router-view>
    </transition>
  </div>
</template>


<script>
  import navHeader from './common/header'
  export default {
    data() {
      return {
        transitionName: 'slide-left',
        activeIndex: '1'
      }
    },
    beforeRouteUpdate (to, from, next) {
      let isBack = this.$router.isBack
      if (isBack) {
        this.transitionName = 'slide-right'
      } else {
        this.transitionName = 'slide-left'
      }
      this.$router.isBack = false
      next()
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
    position: absolute;
    width:100%;
    transition: all .8s cubic-bezier(.55,0,.1,1);
  }

  .slide-left-enter, .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(50px, 0);
    transform: translate(50px, 0);
  }

  .slide-left-leave-active, .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-50px, 0);
    transform: translate(-50px, 0);
  }

</style>


