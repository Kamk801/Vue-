<template>
    <div class="searchlist">
        <ul class="detailList">
            <li v-for="(item, index) in songs" :key="item.id" @click="changeMusic(item)">
                <div class="left">
                    <span class="num">{{ index + 1 }}</span>
                    <div class="detailTitle">
                        <h2>{{ item.name }}</h2>
                        <span v-for="art in item.ar" :key="art.id">{{ art.name }}</span>
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
    name: 'List',
    computed: {
        ...mapState('search', ['songs'])
    },
    methods: {
        changeMusic(item) {
            let index = this.$store.state.music.songs.length - 1;
            let current = JSON.stringify(item);
            sessionStorage.setItem('currentMusic', current);
            this.$store.commit('music/updatePlayList',item)
            this.$store.dispatch('music/changeMusic', { item, index })
            this.$store.dispatch('music/requrl',item.id)
        }
    }
}
</script>

<style lang="less">
.searchlist {
    width: 100%;
    padding: .2rem;

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