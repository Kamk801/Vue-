<template>
  <div class="home">
    <Header></Header>
    <Swiper :images="images"></Swiper>
    <Iconlist></Iconlist>
    <MusicalList></MusicalList>
  </div>
</template>

<script>
import Swiper from '@/components/Swiper'
import Iconlist from './components/Iconlist.vue'
import MusicalList from './components/MusicalList.vue'
import {reqBanner} from '@/api'
export default {
  name: 'Home',
  data() {
    return {
      images: []
    }
  },
  components: {
    Swiper,
    Iconlist,
    MusicalList
  },
  mounted(){
    reqBanner().then(res=>{
      if(res.status==200){
        this.images=res.data.banners
      }
    })
  }
}
</script>
