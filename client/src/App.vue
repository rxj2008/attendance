<template>
    <router-view></router-view>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
html, body, #app{
  width:100%;
  height: 100%;
  margin: 0;
  padding: 0;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.page-container{
  position:relative;
  animation:mymove .6s ease;
  -webkit-animation:mymove .6s ease;
  -o-animation:mymove .6s ease;
}
@keyframes mymove
{
  from {top:-30px;}
  to {top:0px;}
}

@-webkit-keyframes mymove
{
  from {top:-30px;}
  to {top:0px;}
}

@-o-keyframes mymove
{
  from {top:-30px;}
  to {top:0px;}
}

</style>
