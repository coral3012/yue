<!-- 组件说明 -->
<template>
  <div class='firends'>
    <van-nav-bar title="MV" />
    <ul class="firends_content">
      <li
        v-for="item in list"
        :key="item.id"
        @click="handle(item)"
      >
        <dt>
          <img
            :src="item.cover"
            alt=""
          >
        </dt>
        <dd>
          {{ item.artistName }}
        </dd>
        <p>
          <span class="mv_name">{{ item.name }}</span>
          <i>
            <van-icon name="eye-o" />
            {{ item.duration }}
          </i>
          <em>
            <van-icon name="share-o" />
            {{ item.playCount }}
          </em>
        </p>
      </li>

    </ul>
  </div>
</template>

<script>
// import { getTitle } from "../Video/index"
  export default {
    components: {

    },
    data () {
      return {
        list:[]
      };
    },
    computed: {

    },
    watch: {

    },
    methods: {
      saveData(){
        this.$axios.post("http://localhost:3000/mv/all").then(res=>{
        if(res.data.code ==200){
          this.list = res.data.data

        }
      })
      },
      handle(item){
           this.$router.push({
          name:"Video",
          params:{id:item.id}
          })
          // getTitle
      }
    },
    created() {
      //取数据
      this.saveData();
      //把底部导航添加上
      this.$eventBus.$emit("maile1");
},
    mounted() {
    /*   console.log(document.querySelector('.firends_content'));
      // 此处需要做节流优化
    document.querySelector('.firends_content').onscroll = function(e) {
      console.log(new Date());
      localStorage.setItem('scrollTop', e.target.scrollTop)
      console.log( localStorage.setItem('scrollTop', e.target.scrollTop));
    }
 */
    function timeOut(e){
      let times = null;
   /*    return function(e){ */
        clearTimeout(times);
        times = setTimeout(function(){
          localStorage.setItem('scrollTop', e.target.scrollTop)
        },700)
      /* } */
    }


    document.querySelector('.firends_content').onscroll = (e)=>{
      timeOut(e)
    }

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
.van-nav-bar{
  // border-bottom: 1px solid #ccc;
  height: .8rem;
  // margin-bottom: .2rem;
  font-size:.5rem;
  flex-shrink: 0;
  background: #f36838;
  box-shadow: 0 0 10px #ccc;
}
.firends{
  // font-size: 1rem;
  display: flex;
  flex-direction: column;
}

.firends_content li:nth-child(odd){
  margin:0.2rem .1rem 0 .15rem;
}
.firends_content li:nth-child(even){
  margin:0.2rem .15rem 0 .1rem;
}
.firends_content{
  overflow-y: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content:center;
  background: #e9f1f6;
  width: 100%;
  li{
    align-self: start;
    display: flex;
    flex-direction: column;
    width: 3.5rem;
    // padding: .2rem;
    // margin:.2rem .4rem;
    box-sizing: border-box;
    background: white;
    border-radius: .3rem;
    overflow: hidden;
    dt{
      width: 100%;
      img{
        border-radius: .2rem;
        width: 100%;
        height:100%;
      }
    }
    dd{
      margin-inline-start:0px;
        font-size: .3rem;
    }
    p{
      display: flex;
      margin:.3rem 0 .3rem!important;
      justify-content: space-between;
      span{
        flex:1;
      }
      i{
        display: flex;
         font-size: .3rem;
      }
      em{
         display: flex;
        font-size: .3rem;
      }
    }
  }
}
.mv_name{
  white-space: nowrap;
  overflow: hidden;
  text-overflow:ellipsis;
}
</style>