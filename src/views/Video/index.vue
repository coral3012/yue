<!-- 组件说明 -->
<template>
  <div class='video'>
    <van-nav-bar
      title="视频"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      class="mv_header"
    />
    <video
      autoplay="autoplay"
      controls="controls"
      loop="loop"
      muted
      preload="auto"
      :src="data.url"
    ></video>
    <div class="title">
      <h3>{{ title.name }}</h3>
      <div>
        <img
          :src="title.cover"
          alt=""
          class="playImg"
        >
        <span>{{ title.artistName }}</span>
        <span>{{ title.publishTime }}</span>
      </div>

      <hr>
      <h2>热门评论</h2>

      <ul class="comment">
        <van-empty
          description="快来评论吧"
          v-show="!commentData.length"
        />
        <li
          v-for="item in commentData"
          :key="item.commentId"
        >

          <div>
            <img
              :src="item.user.avatarUrl"
              alt=""
            >
            <span>{{ item.user.nickname }}</span>
          </div>

          <p>{{ item.content }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Detail',
    components: {

    },
    data () {
      return {
        id:"",
        data:{},
        title:{},
        commentID:"",
        commentData:[]
      };
    },
    computed: {

    },
    watch: {

    },
    methods: {
      onClickLeft(){
        // this.$router.push({name:"Firends")
        // Window.history.back(-1)
        // history.back(-1)
        // history.pushState(-1)
        // window.history.pushState( "", "@/views/Video/index.vue");
          // this.$router.back()
        this.$router.go(-1)
        this.$eventBus.$emit("maile1")
      },
      getTitle(){
        this.$axios.post(`http://localhost:3000/mv/detail?mvid=${this.id}`).then(res=>{
          if(res.data.code == 200){
            this.title = res.data.data
            this.commentID = res.data.data.commentThreadId;
            this.$axios.post(`http://localhost:3000/comment/mv?id=${this.id}`).then(res=>{
              if(res.data.code===200){
                this.commentData = res.data.comments
              }
            })
          }
        })
      },
      getMv(){
        this.$axios.post(`http://localhost:3000/mv/url?id=${this.id}`).then(res=>{
          if(res.data.code == 200){
            this.data = res.data.data
          }
        })
      }
    },
    created() {
      this.$eventBus.$emit("maile");

      this.id = this.$route.params.id
      //取的歌曲数据
      this.getMv();
      //获取标题文本
      this.getTitle();
      //把底部导航取消


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
.video{
  width: 100%;
}

video{
  width: 7.5rem;
}
.title{
  width: 100%;
  h3{
    font-size: .4rem;
    margin-left:.4rem;
    line-height: .6rem;
  }
  div{
    width: 100%;
    .playImg{
      width: 3rem;
      margin-left: .2rem;
    }
    span{
      font-size: .3rem;
      margin-left:.2rem ;
    }
  }
  h2{
    font-size:.3rem;
    margin-left: .4rem;
    line-height: .4rem;
  }
}
//评论区域
.comment{
  width: 100%;
  overflow-y: auto;
  li{
    width: 100%;
    padding:.2rem .3rem;
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;
    div{
      font-size: 0;
        img{
          width:1rem;
          height: 1rem;
          vertical-align: bottom;
          border-radius: 100%;
      }
      span{
        font-size: .3rem;
      }
    }
    p{
      font-size: .35rem;
    }
  }
}
</style>