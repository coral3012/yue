<!-- 组件说明 -->
<template>
  <div id="first">
    <div id="box">
      <footer>
        <van-image
          style="width: 5rem; height: 5rem"
          round
          width="10rem"
          height="10rem"
          src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3111406230,1694025160&fm=26&gp=0.jpg"
        />
        <h1>
          <router-link :to="{ name: 'Login' }"
            >{{ UserName }}立即登录</router-link
          >
        </h1>
        <van-icon name="arrow" />
      </footer>
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

      <div class="like">
        <van-icon name="like" />
        <div>
          <p>我喜欢的音乐</p>
          <span>0 &nbsp;</span> 首
        </div>
        <div class="xin" @click="add">
          <van-icon name="like" />
          <router-link></router-link>
          心动模式
        </div>
      </div>

      <van-tabs v-model="active">
        <van-tab title="收藏歌单" id="music">
          <li
            style="margin: 0 auto; width: 80%"
            v-for="item in list"
            :key="item.id"
          >
            <span>
              <img :src="item.picUrl" alt="" />
            </span>
            <span>
              {{ item.rcmdtext }}
            </span>
          </li>
        </van-tab>
        <van-tab title="推荐歌单">
          <!-- <router-link v-for="item in products" :key="item.id"></router-link> -->
          <ul>
            <li v-for="item in list" :key="item.id">
              <dd>
                <img :src="item.picUrl" alt="" />
              </dd>
              <dt>
                {{ item.rcmdtext }}
              </dt>
            </li>
          </ul>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      list: [],
    };
  },
  computed: {},
  watch: {},
  created() {
    // this.$axios.get("http://localhost:3000/dj/recommend").then((res) => {
    //   // console.log(res);
    //   if (res.data.code == 200) {
    //     this.list = res.data.djRadios;
    //   }
    // });
  },
  methods: {
    add() {
      this.$router.push("/Music");
    },
    addData() {
      this.$router.push("/firends");
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
footer {
  display: flex;
  align-items: center;
}
footer .van-icon {
  font-size: 2rem;
}
footer h1 {
  margin-left: 1rem;
  margin-right: 0.2rem;
}

.van-grid .van-grid-item {
  color: #ff461f;
}
.like {
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: #fff;
  margin: 1rem auto;
  padding: 0.2rem;
  padding: 0.3rem;
}
.xin {
  border: 1px solid #666;
  border-radius: 1rem;
  padding: 0.2rem;
}

.van-swipe__track img {
  width: 100%;
  margin: 20px auto;
}

.van-tab__pane ul {
  display: flex;
  margin: 0.6rem 0;
  flex-wrap: wrap;
  justify-content: space-between;
}
.van-tab__pane li {
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-items: center;
  width: 5rem;
  margin: 0 0.2rem 0.6rem;
}
.van-tab__pane li span {
  font-size: 2rem;
}
.van-tab__pane dd {
  margin-inline-start: 0 !important;
  width: 6rem;
}
.van-tab__pane img {
  width: 100%;
}
.van-tab__pane dt {
  padding: 0 0.2rem;
  font-size: 0.8rem;
  font-family: 楷体;
}
.van-form {
  width: 80%;
  margin: 0 auto;
}
.like .van-icon {
  color: red;
}
</style>
