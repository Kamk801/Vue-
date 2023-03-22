<template>
  <div class="search">
    <div class="top">
      <svg class="icon" aria-hidden="true" @click="back">
        <use xlink:href="#icon-xitongfanhui-copy"></use>
      </svg>
      <input type="text" placeholder="搜索" @keydown.enter="enterKey" v-model="value">
    </div>
    <div class="history" v-if="!ready">
      <div class="head">
        <p class="searchspan">历史</p>
        <svg class="icon" aria-hidden="true" @click="clean">
          <use xlink:href="#icon-shanchu"></use>
        </svg>
      </div>
      <span v-for="(item, index) in keyword" :key="index" class="spanKey" @click="goSearch">{{ item }}</span>
    </div>
    <div class="content" v-else>
      <List></List>
    </div>
  </div>
</template>

<script>
import List from './List'
export default {
  name: 'Search',
  data() {
    return {
      keyword: JSON.parse(localStorage.getItem('history')) || [],
      value: '',
      ready: false
    }
  },
  methods: {
    enterKey() {
      if (this.value != '') {
        let value = this.value.trim();
        this.$store.dispatch('search/reqList', value);
        this.ready = true;
        if (this.keyword.indexOf(value) === -1) {
          if (this.keyword.length == 10) {
            this.keyword.splice(-1);
          }
          this.keyword.unshift(value);
          let his = JSON.stringify(this.keyword);
          localStorage.setItem('history', his);
          this.value = ''
        }
      }
    },
    goSearch(e) {
      let text = e.target.innerText;
      this.$store.dispatch('search/reqList', text);
      this.ready = true;
    },
    clean() {
      this.keyword = [];
      localStorage.removeItem('history')
    },
    back() {
      if (this.ready == true) {
        this.ready = false;
      } else {
        this.$router.push('/home')
      }
    }
  },
  components: {
    List
  }
}
</script>

<style lang="less">
.search {
  .top {
    width: 100%;
    height: 1rem;
    padding: 0 .2rem;
    display: flex;
    align-items: center;

    .icon {
      fill: black
    }

    input {
      font-size: .32rem;
      margin-left: .2rem;
      border: none;
      border-bottom: 1px solid #999;
      width: 90%;
      padding: .1rem;
    }
  }

  .history {
    width: 100%;
    padding: .2rem;

    .head {
      width: 100%;
      height: 1rem;
      display: flex;
      justify-content: space-between;

      .searchspan {
        font-size: .4rem;
        font-weight: 600;

      }

      .icon {
        width: .6rem;
        height: .6rem;
      }
    }

    .spanKey {
      float: left;
      border-radius: .4rem;
      font-size: .32rem;
      background-color: rgb(180, 180, 180);
      padding: .1rem .2rem;
      margin: .1rem;
    }
  }
}
</style>