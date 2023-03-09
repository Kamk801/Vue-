<template>
    <div class="iconlist">
        <div class="iconItem">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-tuijian"></use>
            </svg>
            <span>每日推荐</span>
        </div>
        <div class="iconItem">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-diantai1"></use>
            </svg>
            <span>私人FM</span>
        </div>
        <div class="iconItem">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-gedan"></use>
            </svg>
            <span>歌单</span>
        </div>
        <div class="iconItem">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-paihangbang"></use>
            </svg>
            <span>排行榜</span>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less">
.iconlist {
    display: flex;
    justify-content: space-around;
    margin-top: 10px;
    padding-top: .2rem;
    width: 100%;
    height: 2rem;

    .iconItem {
        width: 25%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;

        .icon {
            width: 1rem;
            height: 1rem;
        }

        span {
            font-size: .24rem;
        }
    }
}
</style>