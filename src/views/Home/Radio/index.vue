<template>
  <ul class="ul">
    <router-link
      v-for="item in list"
      :key="item.id"
      class="ll"
      :to="{ name: 'PM', params: { id: item.mainSong.id } }"
    >
      <li>
        <dd>
          <img :src="item.coverUrl" alt="" />
        </dd>
        <dt>
          {{ item.mainSong.name }}
        </dt>
      </li>
    </router-link>
  </ul>
</template>

<script>
export default {
  name: "Xiang",
  components: {},
  props: {},
  data() {
    return {
      list: [],
      cat: "",
    };
  },
  watch: {},
  computed: {},
  methods: {},
  created() {
    this.$axios.get("http://81.69.58.73:3000/program/recommend").then((res) => {
      // console.log(res);
      this.list = res.data.programs.splice(0, 9);
      console.log(this.list);
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
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
  }
}
</style>
