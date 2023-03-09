<template>
    <div class="header">
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-liebiao"></use>
        </svg>
        <div class="nav">
            <span @click="go('/user', 1)" :class="{ active: index == 1 }">我的</span>
            <span :class="{ active: index == 2 }" @click="go('/home', 2)">发现</span>
            <span @click="go('/', 3)" :class="{ active: index == 3 }">云村</span>
            <span @click="go('/', 4)" :class="{ active: index == 4 }">视频</span>
        </div>
        <router-link to="/search">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-icon-test-copy-copy"></use>
            </svg>
        </router-link>

    </div>
</template>

<script>
export default {
    name: 'Header',
    data() {
        return {
            index: 2
        }
    },
    methods: {
        go(value, index) {
            this.index = index;
            if(value!='/'){
                this.$router.push(value)
            }
           
        },
        active() {

        }
    }
}
</script>

<style lang="less">
.header {
    display: flex;
    height: 1rem;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: .2rem;

    .nav {
        display: flex;
        width: 65%;
        font-size: .4rem;
        font-weight: 600;
        color: gray;
        height: 100%;
        justify-content: space-around;
        align-items: flex-start;

        .active {
            color: black;
        }
    }

    .icon {
        width: .6rem;
        height: .6rem;
        fill: black;
    }
}
</style>