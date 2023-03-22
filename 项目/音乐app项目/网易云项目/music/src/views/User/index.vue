<template>
    <div class="user">
        <Header></Header>
        <div class="content">
            <div class="top">
                <img :src="detail.profile.avatarUrl" alt="">
                <p>{{ detail.profile.nickname }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'User',
    computed: {
        ...mapState('login', ['detail'])
    },
    mounted() {
        this.reqDetail()
    },
    methods: {
        async reqDetail() {
            try {
                await this.$store.dispatch('login/reqDeatil');
                this.$store.dispatch('login/getUser');
            } catch {

            }
        }
    }
}
</script>

<style lang="less">
.user {
    width: 100%;
    height: 100%;

    .content {
        width: 100%;
        padding: 0 .4rem;
        padding-top: .4rem;

        .top {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            height: 3rem;
            background-color: black;
            margin: .2rem 0;
            margin-top: .6rem;
            border-radius: .4rem;

            img {
                transform: translateY(-50%);
                border-radius: 50%;
                width: 1.5rem;
                height: 1.5rem;
            }

            p {
                width: 100%;
                height: 1rem;
                text-align: center;
                line-height: 1rem;
                color: white;
                font-size: .4rem;
                transform: translateY(-50%);
            }
        }
    }
}
</style>