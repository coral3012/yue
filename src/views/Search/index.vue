<!-- 组件说明 -->
<template>
  <div class="search">
    <div class="search_head">
      <div class="header">
        <van-icon name="arrow-left" @click="back" />
        <van-search class=""
          v-model="value"
          show-action
          placeholder="请输入搜索关键词"
          @search="onSearch"
          @change="saveSaerch()"
        >
          <template #action>
            <div @click="onSearch">搜索</div>
          </template>
        </van-search>
      </div>
      <ul class="search_content" v-if="!flags">
        <li v-for="item in words" :key="item.id" @click="saveMusic(item)">
          <img :src="item.album.artist.img1v1Url" alt="" />
          <div>
            <span>{{ item.name }}-{{ item.__ob__.value.artists[0].name }}</span>
          </div>
        </li>
      </ul>
    </div>

    <ul class="hot" v-if="flags">
      <li v-for="(item, index) in hot" :key="index" @click="hotSearch(item)">
        {{ item.first }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      value: "",
      flags: true,
      hot: [],
      words: [],
    };
  },
  computed: {},
  watch: {},
  methods: {
    //返回
    back() {
      this.$router.push({ name: "MyStyle" });
    },
    getHot() {
      this.$axios.post("http://81.69.58.73:3000/search/hot").then((res) => {
        if (res.data.code === 200) {
          this.hot = res.data.result.hots;
        }
      });
    },
    /* 点击热搜搜索框变更 */
    hotSearch(v) {
      this.value = v.first;
    },
    onSearch() {
      this.$axios
        .post(`http://81.69.58.73:3000/search?keywords=${this.value}`)
        .then((res) => {
          if (res.data.code === 200) {
            this.words = res.data.result.songs;
            // console.log(this.words);
          }
        });
    },
    /* 这里保证点击输入框内容时候，热搜消失，输入框内容消失，热搜出现 */
    saveSaerch() {
      if (this.value) {
        this.flags = false;
      } else {
        this.flags = true;
      }
    },
    /* 这里保证点歌进入播放页面 */
    saveMusic(val) {
      console.log(val);
      //`https://music.163.com/song/media/outer/url?id=${val.id}.mp3`
      this.$router.push({
        //跳转传参有bug
        name: "Splay",
        query:{ id:val.id, gname:val.name , cname:val.__ob__.value.artists[0].name}
      });
      //暂时先不跳转
      /*  this.$router.push({
          name:"PlayM",
            query:{id:val.id}
          }) */
    },
  },
  created() {
    this.getHot();
    // this.va=this.$route.query;
    //派发消失底部
    this.$eventBus.$emit("maile");
  },
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {
    if (this.value) {
      return (this.flags = false);
    } else {
      return (this.flags = true);
    }
  }, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>

<style lang="scss" scoped>
.search {
  font-size: .6rem;
}
.header {
  display: flex;
  align-items: center;
  background: #f36838;
  justify-content: center;
  .van-icon {
    margin-left: 0.1rem;
    width: .5rem;
  }
  .van-search {
    flex: 1;
    background: #f36838;
  }
}
.hot {
  display: flex;
  flex-wrap: wrap;
  li {
    border: 1px solid #ccc;
    padding: 0.1rem;
    border-radius: 20rem;
    font-size: 0.2rem;
    margin: 0.1rem 0.1rem;
  }
}
/* 搜索关键词 */
.search_head {
  position: relative;
  .searchWord {
    position: absolute;
    width: 100%;
    padding: 1em;
    box-sizing: border-box;
    border-radius: 0 0 2rem 2rem;
    background: burlywood;
    li {
      border-bottom: 1px solid #ccc;
      margin-top: 1rem;
    }
  }
}
.search_content {
  display: flex;
  flex-direction: column;
  li {
    display: flex;
    img {
      width: 2rem;
    }
    div{
      margin-left: .3rem;
    }
  }
}
</style>
