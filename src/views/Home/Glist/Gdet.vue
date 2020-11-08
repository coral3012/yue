<!-- 组件说明 -->
<template>
  <div class="Music">
    <van-nav-bar title="歌单详情" left-arrow @click-left="onClickLeft"  />
    <div class="header_content">
      <div class="header">
        <div class="header_left">
          <img :key="key" :src="imgurl" alt="" />
        </div>
        <div class="header_right">
          <p>{{ name }}</p>
          <p>{{ disc }}</p>
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
        <h3>全部歌曲{{track.length}}首</h3>
        <ul>
          <li
            v-for="(item, index) in track"
            :key="item.id"
            @click="PlayMusic(item)"
          >
            <span class="index">{{ index + 1 }}</span>
            <div class="music_name">
              <span>我也不知道歌名</span>
              <span>我也不知道谁唱的</span>
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
  name: "Gdet",
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
      tracks: [],
      track:[]
    };
  },
  computed: {
    key() {
      return this.$route.path + Math.random();
    },
  },
  watch: {},
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onLoad() {
      //
    },
    PlayMusic(item) {
      this.$router.push({
        name: "PM",
        params: { id: item.id },
      });

      this.$eventBus.$emit("maile");
    },
  },
  created() {
    this.$eventBus.$emit("maile1");
    this.id = this.$route.params.id;
    this.$axios
      .get(`http://localhost:3000/playlist/detail?id=${this.id}`)
      .then((res) => {
        // console.log(res);
        if (res.data.code == 200) {
          this.name = res.data.playlist.name;
          this.disc = res.data.playlist.description;
          this.imgurl = res.data.playlist.coverImgUrl;
          this.tracks = res.data.playlist.trackIds;
          this.track=JSON.parse(JSON.stringify(this.tracks));
          // console.log(this.track)
          // this.$axios.get(`http://music.163.com/api/song/detail/?id=${1458474777}&ids=%5B${1458474777}%5D`).then(res => {
          //   console.log(res)
          //   // const zuozhe = res.data.songs[0].artists.map((ref) => ref.name).join("/");
          //   // console.log({name:res.data.songs[0].name,zuo:zuozhe})
          //   // return { id:tid,name:res.data.songs[0].name,zuo:zuozhe}
          // });
          // const detl= this.track.map(item=>{
          //   const tid=Number(item.id);
          //   function app(){
          //   this.$axios.get(`http://music.163.com/api/song/detail/?id=${tid}&ids=%5B${tid}%5D&timestap=${Math.random()}`)
          //   .then(res => {
          //     const zuozhe = res.data.songs[0].artists.map((ref) => ref.name).join("/");
          //     // console.log({name:res.data.songs[0].name,zuo:zuozhe})
          //     return { id:tid,name:res.data.songs[0].name,zuo:zuozhe}
          // });
          //   }

          // console.log(app)
          //   return {id:tid,name:res.data.songs[0].name,zuo:zuozhe}
          // })
          // this.list=detl;
          // console.log(this.list,11111111)
        }
      });

  },
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {
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
        margin-top: 0.65rem;
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
          font-size: 0.3rem;
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
        i {
          font-size: 0.5rem;
        }
      }
    }
  }
}
</style>
