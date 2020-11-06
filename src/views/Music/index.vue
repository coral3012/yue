<!-- 组件说明 -->
<template>
  <div class='Music'>

    <van-nav-bar title="推荐音乐" />
    <div class="header_content">

      <div class="header">
        <div class="header_left">
          <img
            src="data:image/jpeg;base64,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"
            alt=""
          >
        </div>
        <div class="header_right">
          <p>每日推荐</p>
          <p>账号</p>
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
        <h3>全部歌曲100首</h3>
        <ul>
          <li
            v-for="(item,index) in list"
            :key="item.id"
            @click="PlayMusic(item)"
          >
            <span class="index">{{ index+1 }}</span>
            <div class="music_name">
              <span>{{ item.name }}</span>
              <span>
                {{ item.artist.name }}-{{ item.name }}
              </span>
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
    components: {

    },
    data () {
      return {
        loading: false,
        finished: false,
        list:[],
        flag1:false
      };
    },
    computed: {

    },
    watch: {

    },
    methods: {
      onLoad() {

      },
      onLoadMusic(){
        /* var limit = 2
        this.$axios.post("http://localhost:3000/personalized/newsong/"+limit).then(res=>{
        console.log(res);
        if(res.data.code==200){
          this.list = res.data.result
          // console.log(this.list[0].song.artists[0].name);
        }  })*/
        this.$axios.post("http://localhost:3000/top/album").then(res=>{
           if(res.data.code ==200){
             this.list = res.data.weekData
           }
        })
         
     /*  this.$axios.post("http://localhost:3000/top/album?offset=0&limit=30&year=2020&month=6").then(res=>{
           if(res.data.code ==200){
             this.list = res.data.weekData
           }
        }) */
      },
      PlayMusic(item){
        this.$router.push({
          name:"PlayM",
          query:{id:item.id}
        })
       
       this.$eventBus.$emit("maile")
      }
    },
    created() {
      this.$eventBus.$emit("maile1")
      this.onLoadMusic()
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
.Music{
  background: #f0f0f4;
  font-size: .8rem;
}
.van-nav-bar{
  background:#f36838;
  position: static;
}
.header_content{
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 10rem;
  padding: 1rem 1rem .6rem;
  box-sizing: border-box;
  background: hsl(18, 21%, 16%);
}

.header{
  display: flex;
  .header_left{
    img{
      width: 6.6rem;
    }
  }
  .header_right{
    margin-left: 1rem;
    p{
      &:nth-of-type(1){
        color:white;
      }
       &:nth-of-type(2){
        color:#a88462;
        font-size: .8rem;
      }
    }
  }
}
.header_bottom{
  display: flex;
  justify-content: space-around;
  li{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: .6rem;
    .van-icon {
      font-size: 1rem;
      color: wheat;
    }
    span{
      font-size: .6rem;
      color: wheat;
    }
  }
}
/* 音乐歌单 */
.music_content{
  margin-top: 1rem;
  min-height: 28rem;
  border-radius:20px 20px;
  background: white;
  display: flex;
  flex-direction: column;

  h3{
    border-bottom: 1px solid #ccc;
    padding: 1rem;
    box-sizing: border-box;
    margin-block-end: 0;
  }
  ul{
    width: 100%;
    li{
      display: flex;
      flex-direction: row;
      box-sizing: border-box;
      padding: .6rem;
      width: 100%;
      border-bottom:1px solid #4a4266;
      justify-content: space-between;
      align-items: center;
      .index{
        display: block;
        width: 1rem;
       
      }
      .music_name{
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
         span{
          align-items: flex-start;
        }
      }
      .icon{
        width: 2.4rem;
        em{
          margin: 0 .4rem 0;
        }

      }
    }
  }
}
</style>