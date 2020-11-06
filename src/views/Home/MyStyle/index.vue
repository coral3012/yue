<!-- 组件说明 -->
<template>
  <div class=''>
    <!-- 轮播图区域 -->

    <van-swipe
      :autoplay="3000"
      height="110"
    >
      <van-swipe-item
        v-for="(image, index) in images"
        :key="index"
        touchable="true"
        indicator-color="#ff2121"
      >
        <img v-lazy="image" />
      </van-swipe-item>
    </van-swipe>
    <!-- 这又是一块内容区 -->


    <span class="lang"></span>
    <!-- 推荐歌单 -->
    <div class="content">

      <div class="recommend">
        <em class="recommendMusic">
          <i class="iconfont icon-rili"></i>
          <span>推荐歌单</span>
        </em>
        <span>
          更多>
        </span>
      </div>

      <ul>
        <li
          v-for="item in list"
          :key="item.id"
        >
          <dd>
            <img
              :src="item.picUrl"
              alt=""
            >
          </dd>
          <dt>
            {{ item.rcmdtext }}
          </dt>
        </li>

      </ul>

    </div>
    <div class="end">没有更多数据了</div>
  </div>
</template>
<script>
  import Vue from 'vue';
  import { Lazyload } from 'vant';

  Vue.use(Lazyload);
  export default {
    components: {

    },
    data () {
      return {
      loading: false,
      finished: false,
      refreshing: false,
        images:[
          "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=418661321,3282174865&fm=15&gp=0.jpg",
          "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2204758503,2501235553&fm=15&gp=0.jpg",
          "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1830996896,1790652234&fm=15&gp=0.jpg",
          "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3473669187,4187306995&fm=15&gp=0.jpg"
        ],
        list:[]
      };
    },
    computed: {

    },
    watch: {

    },
    methods: {

    },
    created() {
      this.$axios.post("http://localhost:3000/dj/recommend").then(res=>{
        console.log(res);
        // if(res.data.code==200){
        //   this.list =  res.data.djRadios;
        //   this.list.splice(0,9);
        // }
       this.$eventBus.$emit("maile1")
      });
      this.$axios.post("http://localhost:3000/banner").then(res=>{
          const ban = res.banners.map((ite) => {
            return {
              imgUrl: ite.imageUrl,
              typeTitle: ite.typeTitle,
              titleColor: `background:${ite.titleColor}`,
              targetId: ite.targetId,
            };
          });
          this.banner = ban;
      });


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

  /* 轮播图 */
.van-swipe{
  width: 100%;
  margin-top: .1rem;
  .van-swipe-item{
    width: 100%;
    // padding: .2rem;
    display: flex;
    justify-content: center;
    img{
      width: 90%;
    }
  }
}

.van-image{
  width:4.6rem;
  flex-wrap: wrap;
}
.lang{
  height: 1px;
  width: 80%;
  background: #ccc;
  display: block;
  margin: 10px auto;
}
/* 推荐歌单 */

 .content{
   display: flex;
   flex-direction: row;
   flex-direction: column;
   width: 80%;
   margin: 0 auto;
   .recommend{
     display: flex;
     justify-content: space-between;
     em{
       font-style: normal;
     }
   }
   ul{
     display: flex;
     margin: .6rem 0;
     flex-wrap: wrap;
     justify-content: space-between;
     li{
        display: flex;
        flex-direction: column;
        justify-content: center;
        justify-items: center;
        width: 5rem;
        margin:0 .2rem 0.6rem;
       dd{
         margin-inline-start:0!important;
         width: 6rem;
        img{
          width: 100%;
        }
       }
       dt{
         padding: 0 .2rem;
         font-size: .8rem;
         font-family: 楷体;
       }
     }
   }
 }
 /* 结尾 */
 .end{
   height: 4rem;
   width: 100%;
   line-height: 4rem;
   text-align: center;
 }
</style>