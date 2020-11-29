<!-- 组件说明 -->
<template>
  <div class="Music">
    <van-nav-bar title="热门歌曲" />
    <div class="header_content">
      <div class="header">
        <div class="header_left">
          <img
            src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3111406230,1694025160&fm=26&gp=0.jpg"
            alt=""
          />
        </div>
        <div class="header_right">
          <p>热门歌曲</p>
          <p>更新：每日更新</p>
        </div>
      </div>

      <ul class="header_bottom">
        <li>
          <van-icon name="more-o" />
          <span>评论</span>
        </li>
        <li>
          <van-icon name="share-o" />
          <span>分享</span>
        </li>
        <li>
          <van-icon name="down" />
          <span>下载</span>
        </li>
        <li>
          <van-icon name="passed" />
          <span>多选</span>
        </li>
      </ul>
    </div>
    <!-- 下面是歌曲了 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div class="music_content">
        <h3>全部歌曲{{ list.length }}首</h3>
        <ul>
          <li
            v-for="(item, index) in list"
            :key="item.id"
            @click="PlayMusic(item)"
          >
            <span class="index">{{ index + 1 }}</span>
            <div class="music_name">
              <span>{{ item.name }}</span>
              <span>{{ item.artist.name }}</span>
            </div>
            <div class="icon">
              <em>
                <van-icon name="play-circle-o" />
              </em>
              <i>
                <van-icon name="share-o" />
              </i>
            </div>
          </li>
        </ul>
      </div>
    </van-list>
  </div>
</template>

<script>
export default {
  name: "Music",
  components: {},
  data() {
    return {
      loading: false,
      finished: false,
      list: [],
      flag1: false,
      id: "",
      imgurl: "",
      name: "",
      disc: "",
    };
  },
  computed: {
    key() {
      return this.$route.path + Math.random();
    },
  },
  watch: {},
  methods: {
    onLoad() {
      //
    },
    onLoadMusic() {
      this.$axios.post("http://81.69.58.73:3000/top/album").then((res) => {
        console.log(res);
        if (res.data.code == 200) {
          this.list = res.data.monthData;
        }
      });
    },
    PlayMusic(item) {
      this.$router.push({
        name: "PlayM",
        query: { id: item.id,name:item.name,cname:item.artist.name },
      });

      this.$eventBus.$emit("maile");
    },
  },
  created() {
    this.$eventBus.$emit("maile1");
    this.onLoadMusic();
  },
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {
    // this.imgurl = this.$route.params.imgurl;
  }, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>

<style lang="scss" scoped>
.Music {
  background: #f0f0f4;
  font-size: 0.8rem;
}
.van-nav-bar {
  background: #f36838;
  position: static;
}
.header_content {
  display: flex;
  flex-direction: column;
  width: 7.5rem;
  // min-height: 10rem;
  padding: 0.5rem 0.3rem 0.3rem;
  box-sizing: border-box;
  background: hsl(18, 21%, 16%);
}

.header {
  display: flex;
  .header_left {
    img {
      width: 2rem;
      height: 2rem;
      margin-top: 0.4rem;
    }
  }
  .header_right {
    margin-left: 0.3rem;
    p {
      width: 4.5rem;
      &:nth-of-type(1) {
        margin-top: 1rem;
        font-size: 0.3rem;
        color: white;
      }
      &:nth-of-type(2) {
        color: #a88462;
        font-size: 0.25rem;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
      }
    }
  }
}
.header_bottom {
  display: flex;
  justify-content: space-around;
  li {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 0.2rem;
    .van-icon {
      font-size: 0.4rem;
      color: wheat;
    }
    span {
      font-size: 0.3rem;
      color: wheat;
    }
  }
}
/* 音乐歌单 */
.music_content {
  margin-top: 0.3rem;
  // min-height: 28rem;
  border-radius: 20px 20px;
  background: white;
  display: flex;
  flex-direction: column;

  h3 {
    border-bottom: 1px solid #ccc;
    font-size: 0.4rem;
    line-height: 0.6rem;
    padding-left: 0.3rem;
    padding-bottom: 0.2rem;
    margin: 0.2rem 0 0;
    // box-sizing: border-box;
  }
  ul {
    width: 100%;
    li {
      display: flex;
      flex-direction: row;
      box-sizing: border-box;
      padding: 0.3rem;
      width: 100%;
      border-bottom: 1px solid #ccc;
      justify-content: space-between;
      align-items: center;
      .index {
        display: block;
        width: 1rem;
      }
      .music_name {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        span {
          align-items: flex-start;
          font-size:.3rem;
        }
      }
      .icon {
        // width: 2.4rem;
        // font-size: 0.4rem;
        em {
          // width: 2.4rem;
          font-size: 0.4rem;
          margin: 0 0.4rem 0;
        }
        i{
          font-size:.5rem;
        }
      }
    }
  }
}
</style>
