<!-- 组件说明 -->
<template>
  <div id="first">
    <div id="box">
      <div v-if="islogin" class="footer">
        <van-image
          round
          width="1.5rem"
          height="1.5rem"
          src=""
        />
        <h1>
          <router-link :to="{ name: 'Login' }"
            >立即登录</router-link
          >
        </h1>
        <van-icon name="arrow" />
      </div>
      <div v-else class="footer">
        <router-link :to="{name:'Logout'}">
        <img src="../../assets/logo.png" alt="">
        <h1>{{UserName}}</h1>
        </router-link>
      </div>
      <van-grid>
        <van-grid-item icon="smile" text="本地音乐" @click="add" />
        <van-grid-item icon="fire" text="短视频" @click="addData" />
        <van-grid-item icon="checked" text="已购" @click="addData" />
        <van-grid-item icon="fire" text="最近播放" @click="add" />
        <van-grid-item icon="like" text="我的好友" />
        <van-grid-item icon="fire" text="收藏和赞" />
        <van-grid-item icon="manager" text="我的电台" />
        <van-grid-item icon="add" text="音乐应用" />
      </van-grid>

      <div class="like" @click="play()">
        <div class="ll">
          <van-icon name="like" />
        </div>
        <div class="ly">
          <p>我喜欢的音乐</p>
          <span>{{love}} &nbsp;首</span>
        </div>
        <div class="xin">
          <van-icon name="like" />
          心动模式
        </div>
      </div>

      <van-tabs v-model="active">
        <van-tab title="创建歌单" class="music">
          <div
            v-for="item in list"
            :key="item.id"
            @click="playm(item)"
          >
            <span>
              <img :src="item.coverImgUrl" alt="" />
            </span>
            <span>
              {{ item.name }}
            </span>
          </div>
        </van-tab>
        <van-tab title="收藏歌单" class="music">
          <div
            v-for="item in list1"
            :key="item.id"
            @click="playm(item)"
          >
            <span>
              <img :src="item.coverImgUrl" alt="" />
            </span>
            <span>
              {{ item.name }}
            </span>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { isLogined,getCookie,saveCookie } from "../../utils/tools"
export default {
  name:"Mine",
  components: {},
  data() {
    return {
      list: [],
      list1:[],
      UserName:"",
      active:0,
      id:"",
      imgurl:"",
      lovem:0,
      islogin:true,
      love:0,
    };
  },
  computed: {},
  watch: {},
  created() {
    if(isLogined()){
      this.islogin=false;
      this.UserName=getCookie('username');
      this.id=getCookie('userid');
      this.imgurl=getCookie('photo');
      this.$axios.get(`http://localhost:3000/user/playlist?uid=${this.id}`).then(res=>{
        // console.log(res)
        this.lis=res.data.playlist.splice(1);
        this.list=this.lis.filter(item=>
        item.userId == this.id)
        this.list1=this.lis.filter(item=>
        item.userId != this.id)
        // console.log(this.list1)
        this.lovem=res.data.playlist[0].id;
        saveCookie('lovem',this.lovem,15)
        // console.log(this.lovem)
        //http://localhost:3000/playlist/detail?id=
        this.$axios.get(`http://localhost:3000/playlist/detail?id=${this.lovem}`).then(resl=>{
          // console.log(resl)
          this.love=resl.data.playlist.trackIds.length
        })
      })
    }
  },
  methods: {
    add() {
      this.$router.push({name:'Music'});
    },
    addData() {
      this.$router.push("/firends");
    },
    play(){
      this.$router.push({name:'Gdet',params:{id:this.lovem}})
    },
    playm(item){
      this.$router.push({name:'Gdet',params:{id:item.id}})
    }
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

<style scoped>
#first {
  width: 100%;
  background: #f0f0f4;
  overflow-y: auto;
}
#box {
  width: 90%;
  font-size: 1rem;
  flex: 1;
  overflow: auto;
  margin: 0 auto;
}
.footer {
  display: flex;
  margin-top: .3rem;
  margin-left: .2rem;
  margin-bottom: .3rem;
  align-items: center;
}
.footer .van-icon {
  font-size: .5rem;
}
.footer img{
  width:1.5rem;
  border-radius: 50%;
  vertical-align: middle;
}
.footer h1 {
  margin-left: .4rem;
  display: inline-block;
  font-size: .5rem;
  margin-right: 0.2rem;
}

.van-grid .van-grid-item {
  color: #ff461f;
}
.like {
  display: flex;
  align-items: center;
  justify-content:space-between;
  background: #fff;
  margin: .3rem auto;
  padding: .3rem .3rem;
}
.ll{
  width: 1.5rem;
}
.ly{
  flex: 1;
  height: 1.5rem;
  /* position: relative; */
}
.ly p{
  font-size: .3rem;
  height: .3rem;
  line-height:.3rem;
}
.ly span{
  display: block;
  font-size: .2rem;
  height: .3rem;
}
.xin {
  width:1.5rem;
  font-size: .25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #666;
  border-radius: .2rem;
  /* padding: 0.2rem; */
}
.like .van-icon {
  color: red;
  display: block;
  width: .2rem;
}
.music{
  width: 100%;
  font-size: .4rem;
  /* font-size: 0; */
}
.music div{
  margin:.2rem 0;
  background: white;
  border:1px solid #ccc;
  border-radius: .1rem;
}
.music img{
width: 1.5rem;
vertical-align: middle;
margin-right: .5rem;
}
.music span{
display: inline-block;
}
</style>
