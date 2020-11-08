<!-- 组件说明 -->
<template>
  <div class='home'>
    <!-- 头部 -->
    <div class="homeHeader">
      <van-search
        v-model="value"
        placeholder="请输入搜索关键词"
        background="#f20c00"
        @click="search"
      />
    </div>
    <!-- tab选项 -->
    <ul class="home_tab">
      <router-link
        tag="li"
        :to="{name:'MyStyle'}"
      >个性页</router-link>
      <router-link
        tag="li"
        :to="{name:'ListenList'}"
      >歌单</router-link>
      <router-link
        tag="li"
        :to="{name:'Radio'}"
      >主播电台</router-link>
      <router-link
        tag="li"
        :to="{name:'SongTop'}"
      >排行榜</router-link>
    </ul>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    components: {

    },
    data () {
      return {
        value:""
      };
    },
    computed: {

    },
    watch: {

    },
    methods: {
      search(){
        this.$router.push({name:"Search"})
      }
    },
    created() {
      //派发出现底部导航
       this.$eventBus.$emit("maile1");
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
.home{
  width: 100%;
  font-size: .2rem;
}
.homeHeader{
  background: #f20c00;
  padding: .05rem;
  width: 100%;
  box-sizing: border-box;
}
.home_tab{
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
  line-height: .6rem;
  box-sizing: border-box;
  li{
      box-sizing: border-box;
      border: 2px solid transparent;
      &:hover,
      &:active{
         border-bottom:2px solid red;
      }
  }
}
</style>