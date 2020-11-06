<!-- 组件说明这是播放页面 -->
<template>
  <div class='descMusic'>
    <van-nav-bar
      title="歌曲详情"
      left-arrow
      @click-left="onClickLeft"
    />
    <ul class="music_content">
      <li>
        <div class="pic">
          <img
            :src="list.picUrl| pics"
            alt=""
          >
          <!-- 在这里改 -->
          <p>{{ list.name  | msg}}</p>
        </div>

      </li>
      <div>
        <p
          class="description"
          :title="description"
        >{{ description | namess }}</p>
      </div>
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
      >
      </audio>
    </div>

  </div>
</template>

<script>
// import Vue from "vue";

  export default {
    components: {

    },
    data () {
      return {
        id:null,
        uid:null,
        list:[],
        description:"",
        musciUrl:[]
      };
    },
    computed: {

    },
    watch: {

    },
    methods: {
      onClickLeft(){
        this.$router.push({name:"Music"})
      this.$eventBus.$emit("maile1")
      },
        getMusicList(){
          //查询传过来的id展现数据
          this.$axios.post(`http://localhost:3000/album?id=${this.id}`).then(res=>{
            if(res.data.code == 200){
              //描述
              this.description = res.data.album.description
              //所有数据
              this.list = res.data.songs[0].al;
                //这是播放歌曲的id
                
              this.uid = res.data.songs[0].privilege.id

              //这里是mp3播放的链接
              this.$axios.post(`http://localhost:3000/song/url?id=${this.uid}`).then(res=>{
                this.musciUrl = res.data.data[0].url
                // console.log(this.musciUrl);
              })
            }
          })
      }
    },
    created() {
        //在派发吧开关变成true
        this.$eventBus.$emit("maile")
      //给个判断有paramsid的话就不执行点播了  这里是搜索的歌曲
      this.id1 = this.$route.params.id
      
      if(this.id1){
       
        this.$axios.post(`http://localhost:3000/song/url?id=${this.id1}`).then(res=>{
          //音乐确实获取到了
                this.musciUrl = res.data.data[0].url
                // console.log(this.musciUrl);
              })
        //直接结束避免报错 资源浪费
        return false;
      }else{
        console.log("执行了");
        //这个是music点击歌曲query传参
        this.id = this.$route.query.id
        this.getMusicList();
      }
      
},
  filters:{
    pics(v){
         if(v){
            return v
          }
        return "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604470784317&di=d6a1d5ce6ada96c3ff8ba4fae87da818&imgtype=0&src=http%3A%2F%2Fcdn.duitang.com%2Fuploads%2Fitem%2F201111%2F12%2F20111112151919_Whjz4.gif"
      },
    msg(v){
      if(v){
        return v
      }
      return "歌曲库丢失名字"
    },
    namess(v){
      if(v){
        return v
      }
      return "努力加载中..."
    }

  },
    mounted() {

},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
  }
</script>

<style lang='scss' scoped>
.descMusic{
  .btn-audio{
        background:url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604470784317&di=d6a1d5ce6ada96c3ff8ba4fae87da818&imgtype=0&src=http%3A%2F%2Fcdn.duitang.com%2Fuploads%2Fitem%2F201111%2F12%2F20111112151919_Whjz4.gif) no-repeat center bottom;
        background-size:cover;
        outline: none;
    }
  font-size: 1rem;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.music_content{
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  li{
    width: 100%;
    .pic{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      p{
        font-size: 1.6rem;
        color: #ffa400;
      }
      img{
        width: 100%;
        height: 20rem;
      }
    }
  }
}
.description{
  font-size: .2rem;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  white-space: normal !important;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical
}
.player{
  height: 4rem;
  width: 100%;
  audio{
    width: 100%;
  }
}
</style>