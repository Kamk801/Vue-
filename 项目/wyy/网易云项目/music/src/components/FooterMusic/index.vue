<template>
    <div class="footermusic">
        <div class="music" @click="showPopup">
            <img :src="currentMusic.al.picUrl" alt="">
            <div class="detail">
                <h2>{{ currentMusic.name }}</h2>
                <span>横切可以切换上下首哦</span>
            </div>
        </div>
        <div class="operate">
            <svg class="icon" aria-hidden="true" @click="play" v-show="!act">
                <use xlink:href="#icon-bofang-copy"></use>
            </svg>
            <svg class="icon" aria-hidden="true" @click="pause" v-show="act">
                <use xlink:href="#icon-bofangzhong"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-bofangduilie"></use>
            </svg>
        </div>
        <!-- ${currentMusic.id} -->
        <audio ref="audio" @timeupdate="updateTime" :src="musicUrl"></audio>
        <van-popup v-model="show" position="right" :style="{ height: '100%', width: '100%' }">
            <Popup :music="currentMusic" @getBack="getBack()" :act="act" @pause="pause" @play="play"
                @changeTime="changeTime">
            </Popup>
        </van-popup>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import Popup from './component/Popup'
export default {
    name: 'FooterMusic',
    data() {
        return {
            act: false,
            show: false
        }
    },
    computed: {
        ...mapState('music', ['currentMusic', 'musicUrl'])

    },
    mounted() {
        this.$store.dispatch('music/getLyric', this.currentMusic.id);
    },
    updated() {
        this.$store.dispatch('music/getLyric', this.currentMusic.id);
    },
    methods: {
        play() {
            this.act = true;
            this.$refs.audio.play()
        },
        pause() {
            this.act = false;
            this.$refs.audio.pause()
        },
        showPopup() {
            this.show = true;
        },
        getBack() {
            this.show = false;
        },
        updateTime() {
            let audio = this.$refs.audio;
            let currentTime = audio.currentTime;
            let duration = audio.duration;
            this.$store.commit('music/updateTime', { currentTime, duration })
        },
        changeTime(value) {
            this.$refs.audio.currentTime = value;
            this.updateTime();
            this.play();
        }
    },
    watch: {
        currentMusic() {
            this.act = true;
            this.$refs.audio.autoplay = true;
        },

    },
    components: {
        Popup
    }
}
</script>

<style lang="less">
.footermusic {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    height: 1.4rem;
    border-top: 1px solid rgb(120, 120, 120);
    background-color: white;
    display: flex;
    justify-content: space-between;

    .music {
        height: 100%;
        display: flex;
        padding: .2rem 0 0 .1rem;
        width: 70%;

        img {
            display: block;
            width: 1rem;
            height: 1rem;
            border-radius: 50%;
            margin-right: .1rem;
        }

        .detail {
            display: flex;
            flex-direction: column;
            height: 100%;
            justify-content: flex-start;
            align-items: flex-start;

            h2,
            span {
                width: 100%;

            }

            h2 {
                font-size: .28rem;
                font-weight: 600;
                margin-bottom: .05rem;
            }

            span {
                font-size: .32rem;
                color: rgb(142, 142, 142)
            }
        }
    }

    .operate {
        display: flex;
        align-items: center;

        .icon {
            width: .6rem;
            height: .6rem;
            margin-right: .2rem;
        }
    }
}
</style>