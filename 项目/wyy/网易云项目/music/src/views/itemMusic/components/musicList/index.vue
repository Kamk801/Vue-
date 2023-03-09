<template>
    <div class="list">
        <div class="header">
            <div class="left">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-bofang_o"></use>
                </svg>
                <div class="all">播放全部<span>(共20首)</span></div>
            </div>
            <div class="right">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-zengjia"></use>
                </svg>
                <span>收藏({{ changeCount(subscribe) }})</span>
            </div>
        </div>
        <ul class="detailList">
            <li v-for="(item, index) in songs" :key="index" @click="changeMusic(item,index)">
                <div class="left">
                    <span class="num">{{ index + 1 }}</span>
                    <div class="detailTitle">
                        <h2>{{ item.name }}</h2>
                        <span>{{ item.ar[0].name }}</span>
                    </div>
                </div>
                <div class="right">
                    <svg class="icon" aria-hidden="true" v-show="item.mv">
                        <use xlink:href="#icon-24gl-playSquare"></use>
                    </svg>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-liebiao"></use>
                    </svg>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'MusicList',
    props: ['songs', 'subscribe'],
    methods: {
        changeCount(num) {
            if (num >= 10000) {
                return (num / 10000).toFixed(1) + '万';
            } else {
                return num
            }
        },
        changeMusic(item,index) {
            let current=JSON.stringify(item);
            sessionStorage.setItem('currentMusic', current);
            this.$store.dispatch('music/changeMusic', {item,index})
            this.$store.dispatch('music/requrl',item.id)
        }
    },
}
</script>

<style lang="less">
.list {
    background-color: white;
    border-radius: .4rem .4rem 0 0;

    .header {
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 1.25rem;

        .left,
        .right {
            display: flex;
            height: 100%;
        }

        .left {
            width: 50%;
            align-items: center;
            justify-content: space-around;

            .all {
                font-size: .32rem;
                font-weight: 600;

                span {
                    font-size: .28rem;
                    color: #ccc;
                    font-weight: normal;
                }
            }
        }

        .right {
            width: 35%;
            align-items: center;
            justify-content: space-between;
            background-color: red;
            border-radius: .4rem;
            padding: 0 .1rem 0 .2rem;

            .icon {
                fill: white;
                width: .4rem;
                height: .4rem;
            }

            span {
                color: white;
                font-size: .28rem;
            }
        }
    }

    .detailList {
        width: 100%;
       

        li {
            width: 100%;
            height: 1.4rem;
            list-style: none;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .left {
                height: 100%;
                display: flex;
                width: 80%;

                .num {
                    text-align: center;
                    width: 10%;
                    height: 100%;
                    font-size: .32rem;
                    line-height: 1.4rem;
                }

                .detailTitle {
                    width: 90%;
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                    justify-content: center;
                    align-items: flex-start;

                    h2,
                    span {
                        width: 100%;
                        font-size: .32rem;
                    }

                    h2 {
                        font-weight: 600;
                        margin-bottom: .1rem;
                    }

                    span {
                        color: rgb(142, 142, 142)
                    }
                }
            }

            .right {
                .icon {
                    width: .5rem;
                    height: .5rem;
                    transform: translateY(-.2rem);
                    margin-right: .2rem;
                }
            }
        }
    }
}
</style>