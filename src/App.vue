<template>
  <div id="app">
    <div class="wrapper">
      <top-bar v-if="isLogin"></top-bar>
      <left @change="change" v-if="isLogin"></left>
      <div :class="isSmall?'main big': 'main'">
        <router-view v-wechat-title="$route.meta.title"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import topBar from './components/top.vue'
import left from './components/left.vue'
export default {
  name: 'App',
  data() {
    return {
      isSmall: false,
      isLogin: true,
      userInfo: ''
    };
  },
  components: {
    'top-bar': topBar,
    'left': left
  },
  watch:{
    isSmall(){
      this.isSmall
    },
    '$route' (to, from){
      if(this.$route.path=='/login'|| this.$route.path=='/'){
        this.isLogin = false;
      }else{
        // this.userInfo = JSON.parse(sessionStorage.getItem("userInfoData"))
        // if(!this.userInfo){
        //   let that = this
        //   this.$layer.msg('请先登录',function(){
        //     that.$router.push({path: '/'})
        //   })
        // }
        this.isLogin = true;
        // this.isSmall = false
      }
    }
  },
  created(){
    // this.userInfo = JSON.parse(sessionStorage.getItem("userInfoData"))
    // if(!this.userInfo){
    //   this.$router.push({path: '/'})
    // }
    if(this.$route.name=='login'||this.$route.name==''){
        this.isLogin = false;
    }else{
      this.isLogin = true;
      this.isSmall = false
    }
  },
  methods: {
    change(isSmall){
     this.isSmall = isSmall
    }
  }
}
</script>

<style>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
