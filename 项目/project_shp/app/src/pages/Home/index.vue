<template>
  <div>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor v-for="item in floor" :key="item.id" :floor="item"></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
import Like from '@/pages/Home/Like'
import Rank from '@/pages/Home/Rank'
import Floor from '@/pages/Home/Floor'
import Brand from '@/pages/Home/Brand'
import { mapState } from 'vuex'
export default {
  name: '',
  components: {
    ListContainer: () => import('@/pages/Home/ListContainer'),
    Recommend: () => import('@/pages/Home/Recommend'),
    Rank,
    Like,
    Floor,
    Brand
  },
  created() {
    this.$store.dispatch("home/getFloorList");
  },
  computed: {
    ...mapState({
      floor: (state) => state.home.floor
    })
  },
}
</script>

<style>

</style>