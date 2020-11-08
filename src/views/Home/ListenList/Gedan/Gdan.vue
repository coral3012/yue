<template>
  <div class="ququ">
    <ul class="home_tab">
      <router-link v-for="(item,index) in lists" :key="index"
        tag="li"
        :to="{name:'Xiang',query:{cat:item}}"
      >{{item}}</router-link>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name:"Gdan",
  components:{},
  props:{},
  data(){
    return {
      lists:['华语','欧美','轻音乐','影视原声'],
    }
  },
  watch:{},
  computed:{},
  methods:{},
  created(){
    // this.lists.map(item=>{
    //   this.$axios
    //   .get(`http://localhost:3000/top/playlist/highquality?cat=${item}`)
    //   .then((res) => {
    //     this.list=res.data.playlists;
    //   });
    // })

  },
  mounted(){}
}
</script>
<style lang="scss" scoped>
.home_tab{
  display: flex;
  flex-wrap: nowrap;
  width:7.5rem;
  justify-content: space-around;
  line-height: .6rem;
  overflow-x:auto ;
  box-sizing: border-box;
  position: relative;;
  li{
      box-sizing: border-box;
      position: relative;
      left: 0;
      top: 0;
      flex-shrink: 0;
      width: 1.5rem;
      text-align: center;
      font-size:.2rem;
      border: 2px solid transparent;
      &:hover,
      &:active{
         border-bottom:2px solid red;
      }
  }
}
</style>