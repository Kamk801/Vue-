<template>
  <div id="app">
    <router-view />
    <FooterMusic v-if="this.$route.meta.show"></FooterMusic>
  </div>
</template>
<script>
import FooterMusic from '@/components/FooterMusic'
export default{
  name:'App',
  components:{
    FooterMusic
  }
}
</script>
<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.icon{
  width: .5rem;
  height:.5rem;
}
</style>
