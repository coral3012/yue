<!-- 组件说明 -->
<template>
  <div class="xxx">
    <!-- 轮播图区域 -->
    <div class="banner">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item, index) in banner" :key="index">
          <img :src="item.imgUrl" alt="轮播图" />
          <div class="tip" :style="item.titleColor">{{ item.typeTitle }}</div>
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 这又是一块内容区 -->
    <span class="lang"></span>
    <!-- 推荐歌单 -->
    <div class="content">
      <div class="recommend">
        <div class="gs-t">
          <h2>精选碟</h2>
          <router-link :to="{name:'ListenList'}">
            <div>查看更多</div>
          </router-link>
        </div>
      </div>
      <ul>
        <router-link
          v-for="item in list"
          :key="item.id"
          class="ll"
          :to="{ name: 'Gdet', params: { id: item.id } }"
        >
          <li>
            <dd>
              <img :src="item.coverImgUrl" alt="" />
            </dd>
            <dt>
              {{ item.name }}
            </dt>
          </li>
        </router-link>
      </ul>
    </div>
    <div class="bot">
      <div class="gs">
        <div class="gs-t">
          <h2>精品歌单</h2>
          <router-link :to="{name:'Tui'}">
            <div>查看更多</div>
          </router-link>
        </div>
        <div class="gs-b">
          <div class="gs-i" v-for="item in list1" :key="item.id">
            <router-link :to="{name:'Gdet',params:{id:item.id}}">
              <div>
                <img :src="item.coverImgUrl" alt="" />
              </div>
              <p>{{item.name}}</p>
            </router-link>
          </div>
        </div>
      </div>
      <div class="tui">
        <div class="gs-t1">
          <h2>小月的收藏</h2>
          <router-link :to="{ name: 'Gdet', params: { id: 944778002 } }">
            <div>▶ 播放全部</div>
          </router-link>
        </div>
        <div class="tui-box">
          <div class="tui-b">
            <router-link
              v-for="(item, index) in yue"
              :key="'al' + index"
              :to="{
                name: 'PM',
                params: {
                  id: item.id,
                },
                query:{name:item.name,zuo:item.zuo}
              }"
            >
              <div class="tui-b1">
                <img :src="item.imgurl" alt="" />
                <div class="b1-1">
                  <div class="b-1">
                    <span>{{ item.name }} </span><span>- {{ item.zuo }}</span>
                  </div>
                  <div class="b1-11">
                    <img src="../../../assets/play.jpg" alt="" />
                  </div>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
      <div class="tui">
        <div class="gs-t1">
          <h2>小华的收藏</h2>
          <router-link :to="{ name: 'Gdet', params: { id: 5113986747 } }">
            <div>▶ 播放全部</div>
          </router-link>
        </div>
        <div class="tui-box">
          <div class="tui-b">
            <router-link
              v-for="(item, index) in leyi"
              :key="'al' + index"
              :to="{
                name: 'PM',
                params: {
                  id: item.id,
                },
                query:{name:item.name,zuo:item.zuo}
              }"
            >
              <div class="tui-b1">
                <img :src="item.imgurl" alt="" />
                <div class="b1-1">
                  <div class="b-1">
                    <span>{{ item.name }} </span><span>- {{ item.zuo }}</span>
                  </div>
                  <div class="b1-11">
                    <img src="../../../assets/play.jpg" alt="" />
                  </div>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="end">没有更多数据了</div>
  </div>
</template>
<script>
import Vue from "vue";
import { Lazyload } from "vant";
// import { getCookie } from "../../../utils/tools";
Vue.use(Lazyload);
export default {
  components: {},
  data() {
    return {
      loading: false,
      finished: false,
      refreshing: false,
      banner: [],
      list1:[],
      cookie: "",
      list: [],
      leyi: [],
      yue: [],
    };
  },
  computed: {},
  watch: {},
  methods: {
    async aa() {
      // this.cookie = getCookie("MUSIC_U");
      // console.log(this.cookie)
      this.$axios
        .post(
          `http://localhost:3000/playlist/detail?id=5113986747`
        )
        .then((res) => {
          // console.log(1111111,res);
          const led = res.data.playlist.tracks;
          // console.log(led);
          this.leyi = led.map((item) => {
            const zuozhe = item.ar.map((ref) => ref.name).join("/");
            return {
              name: item.name,
              id: item.id,
              zuo: zuozhe,
              imgurl: item.al.picUrl,
            };
          });
          this.leyi.sort(() => Math.random() - 0.5);
          this.leyi = this.leyi.splice(0, 15);
          // console.log(this.leyi);
        });
        this.$axios
          .post(
            `http://localhost:3000/playlist/detail?id=944778002`
          )
          .then((res) => {
            // console.log(1111111,res);
            const li = res.data.playlist.tracks;
            // console.log(led);
            this.yue = li.map((item) => {
              const zuozhe = item.ar.map((ref) => ref.name).join("/");
              return {
                name: item.name,
                id: item.id,
                zuo: zuozhe,
                imgurl: item.al.picUrl,
              };
            });
            this.yue.sort(() => Math.random() - 0.5);
            this.yue = this.yue.splice(0, 15);
            // console.log(this.yue);
          });


      this.$axios.get("http://localhost:3000/banner").then((res) => {
        // console.log(res)
        const ban = res.data.banners.map((ite) => {
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
  },
  created() {
    var times = Date.now();
    this.$axios
        .get(`http://localhost:3000/top/playlist/highquality?timest=${times}`)
        .then((res) => {
          // console.log(res);
          if (res.status == 200) {
            this.list1 = res.data.playlists;
            this.list1 = this.list
              .sort(() => {
                return Math.random() - 0.5;
              })
              .splice(0, 6);
            // console.log(11111,this.list1);
          }
        });
      // console.log(times);
      this.$axios
        .get(`http://localhost:3000/top/playlist?timest=${times}`)
        .then((res) => {
          // console.log(res);
          if (res.status == 200) {
            this.list = res.data.playlists;
            this.list = this.list
              .sort(() => {
                return Math.random() - 0.5;
              })
              .splice(0, 9);
            // console.log(this.list);
          }
          this.$eventBus.$emit("maile1");
        });
    this.aa();
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
/* 轮播图 */
.my-swipe .van-swipe-item img {
  width: 100%;
  height: 100%;
}
.banner {
  width: 6.94rem;
  height: 2.7rem;
  overflow: hidden;
  position: relative;
  margin: 0 0.28rem 0;
  border-radius: 0.2rem;
  /* background: red; */
  -webkit-border-radius: 0.2rem;
}
.tip {
  padding: 0.01rem 0.08rem;
  height: 0.32rem;
  font-size: 0.2rem;
  line-height: 0.32rem;
  text-align: center;
  position: absolute;
  right: 0;
  bottom: 0.05rem;
}
.lang {
  height: 1px;
  width: 94%;
  background: #ccc;
  display: block;
  margin: 0 10px 10px;
}
/* 推荐歌单 */

.content {
  display: flex;
  // flex-direction: row;
  flex-direction: column;
  width: 100%;
  .recommend {
    display: flex;
    width: 92%;
    margin: 0 auto;
    justify-content: space-between;
    em {
      font-style: normal;
    }
  }
  ul {
    display: flex;
    width: 7.5rem;
    margin: 0.1rem 0;
    flex-wrap: wrap;
    justify-content: space-around;
    .ll {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;

      width: 2rem;
      height: 3rem;
      margin: 0.1rem 0.2rem 0.1rem;
      dd {
        margin-inline-start: 0 !important;
        width: 2rem;
        img {
          width: 100%;
        }
      }
      dt {
        padding: 0.05rem;
        font-size: 0.2rem;
        font-family: 楷体;
      }
    }
  }
}

.bot {
  margin-left: 0.28rem;
  position: relative;
}
.gs-t {
  width: 6.94rem;
  height: 0.9rem;
  // margin-right: 0.28rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.gs-t h2 {
  font-size: 0.34rem;
  font-weight: 600;
}
.gs-t div {
  width: 1.4rem;
  height: 0.48rem;
  color: black;
  font-size: 0.24rem;
  text-align: center;
  line-height: 0.48rem;
  border: 0.01rem solid gray;
  border-radius: 0.24rem;
  -webkit-border-radius: 0.24rem;
  -moz-border-radius: 0.24rem;
  -ms-border-radius: 0.24rem;
  -o-border-radius: 0.24rem;
}
.gs-t1 {
  width: 6.94rem;
  height: 0.9rem;
  margin-right: 0.28rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.gs-t1 h2 {
  font-size: 0.34rem;
  font-weight: 600;
}
.gs-t1 div {
  width: 1.64rem;
  height: 0.48rem;
  font-size: 0.24rem;
  text-align: center;
  line-height: 0.48rem;
  border: 0.01rem solid gray;
  border-radius: 0.24rem;
  -webkit-border-radius: 0.24rem;
  -moz-border-radius: 0.24rem;
  -ms-border-radius: 0.24rem;
  -o-border-radius: 0.24rem;
}
.gs-b {
  display: flex;
  overflow-x: auto;
}
.gs-i {
  flex-shrink: 0;
  margin-right: 0.2rem;
}
.gs-i:last-child {
  padding-right: 0.28rem;
}
.gs-i img {
  width: 2.14rem;
  height: 2.14rem;
  border-radius: 0.1rem;
  -webkit-border-radius: 0.1rem;
  -moz-border-radius: 0.1rem;
  -ms-border-radius: 0.1rem;
  -o-border-radius: 0.1rem;
}

.gs-i p {
  padding: 0.01rem 0;
  width: 2.14rem;
  margin:.1rem!important;
  font-size: 0.23rem;
  line-height: 1;
}
.tui-box {
  overflow-x: auto;
}
.tui-b {
  display: flex;
  width: 21.06rem;
  flex-wrap: wrap;
}
.tui-b1 {
  flex-shrink: 0;
  width: 6.94rem;
  display: flex;
  height: 1.14rem;
  margin-bottom: 0.14rem;
}
.tui-b1 img {
  width: 1.14rem;
  height: 1.14rem;
  border-radius: 0.1rem;
  -webkit-border-radius: 0.1rem;
  -moz-border-radius: 0.1rem;
  -ms-border-radius: 0.1rem;
  -o-border-radius: 0.1rem;
}
.b1-1 {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  margin-left: 0.22rem;
  font-size: 0.28rem;
  line-height: 1.14rem;
}
.b1-1 span:last-child {
  color: gray;
}
.b-1 {
  width: 4.9rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.b1-11 img {
  border-radius: 50%;
  width: 0.43rem;
  margin-right: 0.5rem;
  height: 0.43rem;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  -ms-border-radius: 50%;
  -o-border-radius: 50%;
}
/* 结尾 */
.end {
  height: 1rem;
  width: 100%;
  line-height: 1rem;
  text-align: center;
}
</style>
