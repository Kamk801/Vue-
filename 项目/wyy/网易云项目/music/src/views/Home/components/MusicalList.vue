<template>
    <div class="musiclist">
        <div class="musicTop">
            <h2 class="title">发现好歌单</h2>
            <div class="more">发现更多</div>
        </div>
        <div class="musicContent">
            <van-swipe :loop="false" :width="150" class="my-swiper" :show-indicators="false">
                <van-swipe-item v-for="ele in recommandList" :key="ele.id">
                    <img :src="ele.picUrl" alt="" @click="jumpDetail(ele)"/>
                    <span>{{ ele.name }}</span>
                    <div class="action">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-24gl-play"></use>
                        </svg>
                        <span>{{changeCount(ele.playCount)}}万</span>
                    </div>
                </van-swipe-item>
            </van-swipe>
        </div>
    </div>
</template>

<script>
import { reqRecommandList } from '@/api'
export default {
    name: 'MusicalList',
    data() {
        return {
            recommandList: []
        }
    },
    mounted() {
        reqRecommandList().then(res => {
            if (res.status == 200) {
                this.recommandList = res.data.result;
            }
        })
    },
    methods: {
        changeCount(num) {
            return (num / 10000).toFixed(1);
        },
        jumpDetail(item){
            this.$router.push({
                path:'/item',
                query:{id:item.id}
            })
        }
    }
}
</script>

<style lang="less">
.musiclist {
    width: 100%;
    height: 5rem;
    padding: 0 .2rem;

    .musicTop {
        width: 100%;
        height: .6rem;
        display: flex;
        justify-content: space-between;
        margin-bottom: .2rem;

        .title {
            font-size: .4rem;
            font-weight: 900;
        }

        .more {
            border: 1px solid #ccc;
            font-size: .28rem;
            text-align: center;
            line-height: .6rem;
            padding: 0 0.2rem;
            border-radius: .4rem;
        }
    }

    .musicContent {
        width: 100%;
        height: 4rem;

        .my-swiper {
            height: 100%;

            .van-swipe-item {
                padding: .2rem;
                display: flex;
                flex-direction: column;
                position: relative;

                img {
                    width: 100%;
                    border-radius: .2rem;
                }

                span {
                    font-size: .32rem;
                }

                .action {
                    height: .6rem;
                    display: flex;
                    align-items: flex-start;
                    position: absolute;
                    top: 0;
                    right: .3rem;
                    overflow: hidden;
                    padding: .25rem 0 0;

                    .icon {
                        height: .4rem;
                        width: .4rem;
                        color: white;
                    }

                    span {
                        font-size: .28rem;
                        color: white;
                    }
                }
            }
        }
    }
}
</style>