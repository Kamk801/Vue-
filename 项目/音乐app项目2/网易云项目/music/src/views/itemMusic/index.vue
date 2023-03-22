<template>
    <div class="item">
        <div class="head">
            <div class="top">
                <img :src="playlist.coverImgUrl" alt="" class="bgimg">
                <div class="top-left">
                    <router-link to="/home"> <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-xitongfanhui"></use>
                        </svg></router-link>
                    <span>歌单</span>
                </div>
                <div class="top-right">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-icon-test-copy"></use>
                    </svg>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-liebiao"></use>
                    </svg>
                </div>
            </div>
            <div class="middle">
                <div class="detailImg"><img :src="playlist.coverImgUrl" alt=""></div>
                <div class="musicdetail">
                    <h2 class="name">{{ playlist.name }}</h2>
                    <div class="creator">
                        <img :src="playlist.creator.avatarUrl" alt="">
                        <span>{{ playlist.creator.nickname }} ></span>
                    </div>
                    <h2 class="signature">{{ playlist.description }}</h2>
                </div>
            </div>
            <div class="foot">
                <div class="listicon">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-pinglun"></use>
                    </svg>
                    <span>{{ changeCount(playlist.commentCount) }}</span>
                </div>
                <div class="listicon">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-fenxiang1"></use>
                    </svg>
                    <span>{{ playlist.shareCount }}</span>
                </div>
                <div class="listicon">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-xiazai"></use>
                    </svg>
                    <span>下载</span>
                </div>
                <div class="listicon">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-xuanze-duoxuan-tianchong"></use>
                    </svg>
                    <span>多选</span>
                </div>
            </div>
        </div>
        <MusicList :songs="songs" :subscribe="playlist.subscribedCount"></MusicList>
    </div>
</template>

<script>
import MusicList from './components/musicList'
import { mapState } from 'vuex'
export default {
    name: 'itemMusic',
    data() {
        return {
            
        }
    },
    mounted() {
        this.reqdetail()
    },
    methods: {
        changeCount(num) {
            if (num >= 10000) {
                return (num / 10000).toFixed(1) + '万';
            } else {
                return num
            }
        },
        async reqdetail() {
            try {
                let id = this.$route.query.id;
                await this.$store.dispatch('music/reqList', id);
                this.$store.dispatch('music/reqSong',id);
                
            } catch {
                alert('请求失败')
            }
        }
    },
    components: {
        MusicList
    },
    computed: {
        ...mapState('music', ['playlist','songs'])
    }
}
</script>

<style lang="less">
.head {
    height: 7rem;

    .top {
        width: 100%;
        height: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: .2rem;

        .top-left,
        .top-right {
            width: 30%;
            height: 100%;
            display: flex;
            justify-content: space-around;
            padding: .2rem;
            align-items: center;

            .icon {
                width: .6rem;
                height: .6rem;
                fill: white;
            }

            span {
                font-size: .5rem;
                color: white;
                margin-left: 10px;
            }
        }

        .bgimg {
            width: 100%;
            height: 8rem;
            z-index: -1;
            position: fixed;
            top: 0;
            filter: blur(30px);
        }
    }

    .middle {
        width: 100%;
        height: 4rem;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .detailImg {
            height: 100%;
            width: 50%;
            overflow: hidden;
            padding: .2rem;

            img {
                display: block;
                width: 100%;
                border-radius: .4rem;
            }
        }

        .musicdetail {
            display: flex;
            height: 100%;
            width: 50%;
            flex-direction: column;
            padding: .3rem .2rem;

            .name {
                font-size: .32rem;
                color: white;
                margin-bottom: .2rem;
            }

            .creator {
                display: flex;
                align-items: center;
                margin-bottom: .3rem;

                img {
                    width: .8rem;
                    display: block;
                    float: left;
                    border-radius: 50%;
                }

                span {

                    margin-left: .2rem;
                    font-size: .3rem;
                    color: #ccc;
                }
            }

            .signature {
                width: 100%;
                height: 1rem;
                overflow: hidden;
                font-size: .24rem;
                color: #ccc;
                font-weight: normal;
            }

        }
    }

    .foot {
        display: flex;
        justify-content: space-around;
        height: 1.2rem;

        .listicon {
            width: 25%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;

            .icon {
                width: .6rem;
                height: .6rem;
                fill: white;
            }

            span {
                color: white;
                font-size: .32rem;
            }
        }
    }
}
</style>