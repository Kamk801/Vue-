<template>
    <div id="swiperTop">
        <van-swipe :autoplay="3000" lazy-render indicator-color="white">
            <van-swipe-item v-for="(image, index) in images" :key="index">
                <img :src="image.imageUrl"/>
            </van-swipe-item>
        </van-swipe>
    </div>
</template>

<script>
export default {
    name: 'Swiper',
    props: ['images']
}
</script>

<style lang="less">
#swiperTop {
    .van-swipe {
        width: 100%;
        height: 3rem;
        .van-swipe-item{
            padding: .2rem .2rem 0;
            img{
                height:100%;
                width:100%;
                border-radius: 0 .3rem;
            }
        }
    }
    
}
</style>