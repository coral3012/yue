<!-- 组件说明 -->
<template>
  <ul class="ul">
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
  methods: {},
  created() {
    this.$axios.get("http://localhost:3000/toplist").then(res=>{
      this.list=res.data.list;
    })
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
.ul {
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
</style>
