<template>
    <div class="musicItem">
        <img :src="music.al.picUrl" alt="" class="bgimg">
        <div class="head">
            <div class="left">
                <svg class="icon" aria-hidden="true" @click="back">
                    <use xlink:href="#icon-xitongfanhui"></use>
                </svg>
                <div class="creator">
                    <h2>{{ music.name }}</h2>
                    <div class="writer">
                        <span v-for="(item, index) in music.ar" :key="item.id">{{ item.name
                        }}{{ isShow(index, music.ar) }}</span>
                    </div>
                </div>
            </div>
            <div class="right">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-fenxiang1"></use>
                </svg>
            </div>
        </div>
        <div class="middle" v-if="!isLyricShow" @click="changeShow">
            <img src="./images/needle-ab.png" class="img_needle" :class="{ img_needle_active: act }" alt="">
            <img src="./images/cipan.png" alt="" class="img_cd">
            <img :src="music.al.picUrl" alt="" class="img_ar" :class="{ img_ar_active: act, img_ar_pause: !act }" ref="img">
        </div>
        <div class="lyric" v-else @click="changeShow" ref="lyric">
            <p v-for="item in lyric" :key="item.index" :class="{ pactive: activeShow(item) }">{{ item.lrc }}</p>
        </div>
        <div class="foot">
            <div class="top">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-aixin"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiazai1"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-changpianji"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-pinglun1"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-gengduo-shuxiang"></use>
                </svg>
            </div>
            <div class="content">
                <!-- <input type="range" class="range" min="0" :max="duration" v-model="currentTime" step="0.05"
                    @change="sliderPlay" /> -->
                <el-slider :min="0" :max="Number(duration)" v-model="object.time" :step="0.01" @change="sliderPlay">
                </el-slider>
            </div>
            <div class="footer">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-gl-repeatOnce2"></use>
                </svg>
                <svg class="icon iconaside" aria-hidden="true" @click="goPlay(-1)">
                    <use xlink:href="#icon-shangyishou"></use>
                </svg>
                <svg class="icon iconmiddle" aria-hidden="true" v-if="!act" @click="play">
                    <use xlink:href="#icon-bofang"></use>
                </svg>
                <svg class="icon iconmiddle" aria-hidden="true" v-else @click="pause">
                    <use xlink:href="#icon-bofangzhong"></use>
                </svg>
                <svg class="icon iconaside" aria-hidden="true" @click="goPlay(1)">
                    <use xlink:href="#icon-xiayishou"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-bofangduilie"></use>
                </svg>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'Popup',
    props: ['music', 'act'],
    data() {
        return {
            isLyricShow: false
        }
    },
    mounted() {
        this.$refs.lyric.scrollTop = 0;
    },
    computed: {
        ...mapState('music', ['lrc', 'currentTime', 'currentIndex', 'songs', 'duration']),
        ...mapState('music', {
            object: state => state.object
        }),
        lyric() {
            let arr = [];
            if (this.lrc.lyric) {
                arr = this.lrc.lyric.split(/[(\r\n)\r\n]+/).map((item, index) => {
                    let min = item.slice(item.indexOf('[') + 1, item.indexOf(':'))
                    let sec = item.slice(item.indexOf(':') + 1, item.indexOf('.'));
                    let mili = item.slice(item.indexOf('.') + 1, item.indexOf(']'));
                    let time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mili);
                    let lrc = item.slice(item.indexOf(']') + 1, item.length);
                    return { min, sec, mili, lrc, time, index }
                })
                arr.forEach((item, i) => {
                    if (i == arr.length - 1 || isNaN(arr[i + 1].time)) {
                        item.next = this.wholeTime()
                    } else {
                        item.next = arr[i + 1].time;
                    }
                })
            }
            return arr
        }
    },
    methods: {
        isShow(i, arr) {
            if (i == arr.length - 1) {
                return ''
            }
            return ','
        },
        back() {
            this.$emit('getBack')
        },
        play() {
            this.$emit('play')
        },
        pause() {
            this.$emit('pause')
        },
        changeShow() {
            this.isLyricShow = !this.isLyricShow
        },
        activeShow(item) {
            let time = this.currentTime * 1000;
            if (time >= item.time && time < item.next) {
                return true
            } else {
                return false
            }
        },
        goPlay(num) {
            let index = this.currentIndex + num;
            if (index < 0 || index > this.songs.length - 1) {
                return;
            } else {
                let item = this.songs[index];
                let current = JSON.stringify(item);
                sessionStorage.setItem('currentMusic', current);
                this.$store.dispatch('music/changeMusic', { item, index })
                this.$store.dispatch('music/requrl',item.id)
            }
        },
        wholeTime() {
            return parseInt(this.duration) * 1000
        },
        sliderPlay(value) {
            this.pause();
            this.$emit('changeTime', value);
        }
    },
    watch: {
        currentTime(newVal, oldVal) {
            let p = document.querySelector('.pactive');
            if (p && p.offsetTop > 300) {
                this.$refs.lyric.scrollTop = p.offsetTop - 300
            };
            if (newVal == this.duration) {
                this.goPlay(1)
            }
        },
        music() {
            this.isLyricShow = false;
            //this.$refs.img.style.transform = "rotateZ(0)";
        }
    }
}
</script>

<style lang="less">
.musicItem {
    width: 100%;
    height: 100%;
    position: relative;

    .bgimg {
        width: 100%;
        height: 100%;
        z-index: -1;
        position: fixed;
        top: 0;
        filter: blur(40px);
    }

    .head {
        width: 100%;
        height: 1.2rem;
        display: flex;
        justify-content: space-between;
        margin-top: .3rem;

        .left,
        .right {
            height: 100%;
            display: flex;
            justify-content: space-around;
            padding: .1rem;
            align-items: center;

            .icon {
                width: .6rem;
                height: .6rem;
                fill: white;
            }
        }

        .left {
            width: 90%;

            .creator {
                width: 80%;
                display: flex;
                flex-direction: column;
                height: 100%;
                justify-content: center;
                align-items: flex-start;
                margin-left: .5rem;

                h2 {
                    width: 100%;
                    color: white;
                    font-size: .32rem;
                    margin-bottom: .1rem;
                }

                .writer {
                    width: 100%;
                    height: .32rem;
                    overflow: hidden;

                    span {
                        float: left;
                        font-size: .28rem;
                        color: rgb(158, 158, 158)
                    }
                }
            }
        }

        .right {
            width: 10%;
        }
    }

    .middle {
        width: 100%;
        height: 9rem;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;

        .img_needle {
            width: 2rem;
            height: 3rem;
            position: absolute;
            left: 46%;
            transform-origin: 0 0;
            transform: rotate(-13deg);
            transition: all 1s;
        }

        .img_needle_active {
            transform: rotate(0deg);
        }

        .img_cd {
            width: 5rem;
            height: 5rem;
            position: absolute;
            bottom: 2.3rem;
            z-index: -1;
            animation: rotate_ar 10s linear infinite;
        }

        .img_ar {
            width: 3.2rem;
            height: 3.2rem;
            border-radius: 50%;
            position: absolute;
            bottom: 3.14rem;
            animation: rotate_ar 10s linear infinite;
        }

        .img_ar_active {
            animation-play-state: running;
        }

        .img_ar_pause {
            animation-play-state: paused;
        }

        @keyframes rotate_ar {
            0% {
                transform: rotateZ(0)
            }

            100% {
                transform: rotateZ(360deg)
            }
        }
    }

    .lyric {
        width: 100%;
        height: 10.5rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: scroll;
        margin-top: .32rem;
        padding: 0 .3rem;
        scroll-behavior: smooth;

        p {
            color: rgb(190, 181, 181);
            font-size: .32rem;
            margin-bottom: .4rem;
            text-align: center;
        }

        .pactive {
            color: white;
            font-size: .4rem;
            font-weight: 600;
        }
    }

    .foot {
        width: 100%;
        height: 3.5rem;
        position: absolute;
        bottom: 0.2rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .icon {
            fill: white;
        }

        .top {
            width: 100%;
            height: 1rem;
            display: flex;
            justify-content: space-around;
            align-items: center;

            .icon {
                width: .6rem;
                height: .6rem;
            }
        }

        .content {
            padding: 0 .2rem;

            .range {
                width: 100%;
                height: .6rem;
                color: white;
            }
        }

        .footer {
            width: 100%;
            height: 1.5rem;
            display: flex;
            justify-content: space-around;
            align-items: center;
            padding-bottom: .2rem;

            .icon {
                width: .5rem;
                height: .5rem;
            }

            .iconaside {
                width: .7rem;
                height: .7rem;
            }

            .iconmiddle {
                width: 1rem;
                height: 1rem;
            }
        }
    }
}
</style>