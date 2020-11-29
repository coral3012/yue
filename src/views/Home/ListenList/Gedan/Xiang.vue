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
  name:'Xiang',
  components: {},
  props: {},
  data() {
    return {
      list:[],
      cat:"",
    };
  },
  watch: {},
  computed: {},
  methods: {},
  created() {
    this.cat=this.$route.query.cat;
    this.$axios
      .get(`http://81.69.58.73:3000/top/playlist/highquality?cat=${this.cat}`)
      .then((res) => {
        // console.log(res);
        this.list=res.data.playlists;
        console.log(this.list)
      });
  },
  mounted() {
    // this.$router.go(0)
  },
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