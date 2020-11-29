<!-- 组件说明 -->
<template>
  <div class='loginIn'>
    <img
      src="../assets/logo.png"
      alt=""
      class="logow"
    >
    <van-form class="lll" @submit="onSubmit">
      <van-field
        v-model="username"
        name="账号"
        label="账号"
        placeholder="你的手机号"
        :rules="[{ required: true, message: '该内容填写你所注册的手机号码' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <span
        class="reg"
        @click="Reg"
      >没有账号点击注册!!!</span>
      <div style="margin: 16px;">
        <van-button
          round
          block
          type="info"
          native-type="submit"
        >
          提交
        </van-button>
      </div>
    </van-form>

  </div>
</template>

<script>
import { setToken,saveCookie } from "../utils/tools";

import { Notify } from 'vant';
  export default {
    components: {

    },
    data () {
      return {
          username: '',
          password: '',
      };
    },
    computed: {

    },
    watch: {

    },
    methods: {
      onSubmit(values) {
        this.$axios.post(`http://81.69.58.73:3000/login/cellphone?phone=${values['账号']}&password=${values["密码"]}`).then(res=>{
          if(res.status == 200){
            console.log(res);
            if(res.data.msg){

              Notify({ type: 'warning', message: res.data.msg });
                return false;
            }
            setToken(res.data.token);
            saveCookie("userid",res.data.account.id,15);
            saveCookie("photo",res.data.profile.avatarUrl,15)
            saveCookie("username",res.data.profile.nickname,15);
            saveCookie("MUSIC_U", res.data.token,15);
            /* this.$axios.post("http://81.69.58.73:3000/login/refresh").then(res=>{
              console.log(res);
            }) */
            this.$router.push({name:"MyStyle"})
          }
        })
      },
      Reg(){
        this.$router.push({name:"Reg"})
      }
    },
    created() {
      this.$eventBus.$emit("maile");
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
.loginIn{
  width: 100%;
  height: 100%;
  background: skyblue;
  // background: url("../assets/loginImg.jpg");
  display: flex;

  flex-direction: column;
  justify-content: center;
  .lll{
    width:6.9rem;
    margin: 0 .3rem;
  }
  .logow{
    display: block;
    width: 3rem;
    margin: 0 auto 1.2rem;
    border-radius: 50%;
  }
  .reg{
    color: purple;
    font-size: .12rem;
    margin:.3rem;
    float: right;
}
}
</style>