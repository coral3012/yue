<!-- 组件说明 -->
<template>
  <div class=''>
    个性推荐
  </div>
</template>

<script>
  export default {
    components: {

    },
    data () {
      return {

      };
    },
    computed: {

    },
    watch: {

    },
    methods: {

    },
    created() {
        //派发出现底部导航
       this.$eventBus.$emit("maile1");
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
</style>