<!-- 组件说明 -->
<template>
  <div class="Regist">
    <!-- 返回 -->
    <van-nav-bar
      title="标题"
      @click-left="onClickLeft"
      left-text="返回"
      left-arrow
    >
    </van-nav-bar>
    <van-form validate-first @failed="onFailed">
      <van-cell-group>
        <!-- 输入手机号，调起手机号键盘 -->
        <van-field class="topt"
          v-model="mobel"
          type="tel"
          label="手机号"
          placeholder="手机号"
          :rules="[{ required: true, pattern, message: '请输入正确手机号' }]"
        />

        <!-- 输入密码 -->
        <van-field
          v-model="password1"
          type="password"
          label="密码"
          placeholder="输入你的密码"
          :rules="[{ required: true, regpas, message: '请输入密码' }]"
        />
        <!-- 确认输入密码 -->
        <van-field
          v-model="password2"
          type="password"
          placeholder="确认密码"
          label="确认密码"
        />
        <!-- 验证码 -->
        <van-field
          v-model="getMessage"
          center
          clearable
          label="短信验证码"
          placeholder="请输入短信验证码"
        >
          <template #button>
            <van-button
              class="sendMessage"
              size="small"
              type="primary"
              @click="sendMessage"
              :disabled="falg"
              >{{ msg }}</van-button
            >
          </template>
        </van-field>

        <!-- 提交按钮 -->
        <div class="regirest">
          <van-button round block type="info" @click="sendReg">
            提交
          </van-button>
        </div>
      </van-cell-group>
    </van-form>
  </div>
</template>

<script>
import Vue from "vue";
import { Form } from "vant";
Vue.use(Form);

//轻提示
import { Notify } from "vant";
export default {
  components: {},
  data() {
    return {
      textName: "",
      mobel: "",
      // userName:"",
      password1: "",
      password2: "",
      getMessage: "", //短信验证
      msg: "发送验证码",
      falg: false, //验证码非点击
      pattern: /^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/,
      regpas: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/,
    };
  },
  computed: {},
  watch: {},
  methods: {
    onFailed(errorInfo) {
      //表单提交错误的信息打印
      console.log("failed", errorInfo);
      return false;
    },
    //提交
    sendReg() {
      //账号名字textName 手机号 mobel  账号userName
      //短信getMessage  密码1  password1 密码2  password2
      if (this.password1 && this.mobel  && this.getMessage) {
        if (this.password1 === this.password2) {
          var res = this.verify();
          if (res) {
            if (res.data.code == 200) {
              console.log(44);
              this.$axios
                .post(
                  `http://81.69.58.73:3000/register/cellphone?phone=${this.mobel}&password=${this.password1}&captcha=${this.getMessage}&nickname=${this.textName}`
                )
                .then((res) => {
                  if (res.status == 200) {
                    console.log("注册成功");
                    Notify({ type: "primary", message: "注册成功请登录" });
                    this.$router.push({ name: "Login" });
                  } else {
                    console.log("短信 验证码错误");
                    Notify({ type: "info", message: res.message });
                  }
                });
            } else {
              Notify({ type: "info", message: "验证码错误" });
            }
          } else {
            Notify({ type: "danger", message: "两次密码不一致" });
          }
        }
      }
    },
    verify() {
      console.log(11);

      this.$axios
        .post(
          `http://81.69.58.73:3000/captcha/verify?phone=${this.mobel}&captcha=${this.getMessage}`
        )
        .then((res) => {
          console.log(res);
          return res;
        })
        .catch((err) => {
          alert("验证码错误");
          console.log(err);
          console.log(22);
        });
    },
    onClickLeft() {
      this.$router.push({ name: "Login" });
    },
    sendMessage() {
      //请求链接
      if (this.mobel) {
        this.$axios
          .post(`http://81.69.58.73:3000/captcha/sent?phone=${this.mobel}`)
          .then((res) => {
            console.log(res);
            Notify({ type: "primary", message: "请查收您的短信" });
          });
      }

      //发送验证码
      var count = 60;
      this.falg = true;
      var times = setInterval(() => {
        //倒计时
        this.msg = count--;

        if (count <= 0) {
          clearTimeout(times);
          this.falg = false;
          this.msg = "发送验证码";
        }
      }, 1000);
    },
  },

  created() {
    this.$eventBus.$emit("maile");
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
.Regist {
  width: 100%;
  height: 100%;
  display: flex;
  background: skyblue;
  flex-direction: column;
  .van-nav-bar {
    width: 100%;
    height: 1rem;
  }
  .van-form {
    flex: 1;
    margin: 1rem 0.4rem;
    .topt{
      padding-top: 2rem;
    }
  }
}
.sendMessage {
  display: block;
  height: 0.6rem;
  width: 1.6rem;
}
//注册
.regirest {
  padding:3rem .5rem 1rem;
}
</style>
