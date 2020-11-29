<!-- 组件说明这是播放页面 -->
<template>
  <div class="descMusic">
    <van-nav-bar title="歌曲详情" class="top" left-arrow @click-left="onClickLeft" />
    <ul v-if="show" class="cen music_content">
      <li class="pic">
          <img :src="list.picUrl | pics" alt="" />
          <!-- 在这里改 -->
          <p v-if="query">{{ list.name | msg }}</p>
          <p v-else>{{ $route.query.name }}</p>

      </li>
      <li v-if="query" class="description" :title="description">
        {{ description | namess }}
      </li>
      <li v-else class="description" :title="description">
        {{ $route.query.zuo }}
      </li>
    </ul>
    <ul class="cen" v-else>
      这首歌暂无版权
    </ul>

    <!-- 播放 -->

    <div class="player">
      <audio
        controls="controls"
        loop="loop"
        muted
        preload="auto"
        autoplay="autoplay"
        :src="musciUrl"
        volume="volume"
        class="btn-audio"
      ></audio>
    </div>
  </div>
</template>

<script>
// import Vue from "vue";

export default {
  name: "PM",
  components: {},
  data() {
    return {
      id: null,
      uid: null,
      list: [],
      zuo:"",
      name:"",
      description: "",
      musciUrl: [],
      show:true,
      query:true,
      va:"",
    };
  },
  computed: {},
  watch: {},
  methods: {
    onClickLeft() {
      this.$router.go(-1);
      this.$eventBus.$emit("maile1");
    },
  },
  created() {
    //在派发吧开关变成true
    if(this.$route.query){
      this.query=false;
    }
    this.$eventBus.$emit("maile");
    //给个判断有paramsid的话就不执行点播了  这里是搜索的歌曲
    this.id1 = this.$route.params.id;
    // this.$axios.get(`http://music.163.com/api/song/detail/?id=${this.id1}&ids=%5B${this.id1}%5D&timestap=${Math.random()}`)
    //         .then(res => {
  //            console.log(res)
  //            const zuozhe = res.data.songs[0].artists.map((ref) => ref.name).join("/");
    //          console.log({name:res.data.songs[0].name,zuo:zuozhe})
    //          this.name=res.data.songs[0].name;
    //          this.zuo=zuozhe;
    //         })

    this.$axios
      .get(`http://81.69.58.73:3000/song/url?id=${this.id1}`)
      .then((res) => {
        //音乐确实获取到了
        console.log(res);
        this.musciUrl = res.data.data[0].url;
        if(this.musciUrl==null){
          this.show=false;
        }
      });
      // this.va=this.$route.query;
  },
  filters: {
    pics(v) {
      if (v) {
        return v;
      }
      return "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604470784317&di=d6a1d5ce6ada96c3ff8ba4fae87da818&imgtype=0&src=http%3A%2F%2Fcdn.duitang.com%2Fuploads%2Fitem%2F201111%2F12%2F20111112151919_Whjz4.gif";
    },
    msg(v) {
      if(v){
        return v;
      }
      return "我也不知道歌名";
    },
    namess(v) {
      if (v) {
        return v;
      }
      return "我也不知道谁唱的";
    },
  },
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>

<style lang="scss" scoped>

.descMusic {
  // height: 13.3333333rem;
  .btn-audio {
    background: skyblue;
  }
  .top{
  height: 1rem;
  flex-shrink: 0;
}
  font-size: .5rem;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.cen{
  flex:1!important;
}
.music_content {
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;

  .pic {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 100%;

    // height: 4rem;
    flex-shrink: 0;
    p {
      font-size: .5rem;
      color: #ffa400;
    }
    img {
      width:7.5rem;
    }
  }
}

.description {
  font-size: 0.4rem;
  text-align: center;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  white-space: normal !important;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.player {
  // height: 2rem;
  width: 100%;
  audio {
    width: 100%;
  }
}
</style>
