<template>
  <div id="app">

    <keep-alive exclude="Logout,PM,Tui,Detail,Xiang,Gdan,Gdet,PlayM,Mine">
    <router-view class="content" />
    </keep-alive>
    <van-tabbar
      :fixed="false"
      v-model="active"
      active-color="#ff461f"
      inactive-color="#000"
      class="bot"
      v-if="flag"
      route
    >
      <van-tabbar-item :to="{name:'MyStyle'}">
        <i class="iconfont icon-zhuye"></i>
        <span>首页</span>
      </van-tabbar-item>
      <van-tabbar-item
        :to="{name:'Music'}"
        :flag="flag"
      >
        <i class="iconfont icon-yinle"></i>
        <span>音乐</span>
      </van-tabbar-item>
      <van-tabbar-item :to="{name:'Firends'}">
        <i class="iconfont icon-dilanxianxingiconyihuifu_huabanfuben"></i>
        <span>MV</span>
      </van-tabbar-item>
      <van-tabbar-item :to="{name:'Mine'}">
        <i class="iconfont icon-my-fill">
        </i>
        <span>我的</span>

      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
/* const $eventBus = new Vue(); // 定义一个全局的vue实例
Vue.prototype.$eventBus = $eventBus; // 在vue对象的原型上进行赋值 */
export default {
  data(){
    return {
      active: 0,
      flag:true
    }
  },
  created(){
    // console.log(this.$route);
    this.$eventBus.$on("maile",this.saveHnadle);
    this.$eventBus.$on("maile1",this.saveHnadle1);
  },
  methods:{
    saveHnadle(){
      this.flag = false
    },
    saveHnadle1(){
      this.flag = true
    }
  },
  mounted() {

  }
}
</script>>
<style>
html,
body,
#app {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
}
html {
  font-size: 13.3333333333333333vw;
  /* 1vw = 3.75px
       26.666667vw / 2 = 13.333333vw
    */
}
#app {
  display: flex;
  font-size: 13.3333333333333333vw;
  flex-direction: column;
}
.content {
  flex: 1;
  overflow-y: auto;
}

.bot{
  /* bottom: -0.04rem!important; */
  bottom: -2px;
}

.van-tabbar-item__text{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

}
i{
    font-size: .24rem;
  }
  span{
    font-size: .1rem;
  }
</style>
