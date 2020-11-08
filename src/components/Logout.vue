<template>
  <div class="tui">
    <button @click="logout()">退出登录</button>
  </div>
</template>

<script>
import { removeCookie,removeToken } from "../utils/tools"
export default {
  name:"Logout",
  components:{},
  props:{},
  data(){
    return {
    }
  },
  watch:{},
  computed:{},
  methods:{
    logout(){
      removeCookie('username');
      removeCookie('userid');
      removeCookie('photo');
      removeToken('token');
      removeCookie('lovem');
      this.$router.push({name:'Mine'});
    }
  },
  created(){},
  mounted(){}
}
</script>
<style scoped>
.tui{
  display: flex;
  align-items: center;
  background: skyblue;
  justify-content: center;
}
button{
  width: 3rem;
  height:1rem;
  font-size: .5rem;
  background: orange;
}
</style>