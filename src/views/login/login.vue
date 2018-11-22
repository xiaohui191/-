<template>
  <div class="login">
    <div class="login-box">
      <h1>广州使必达货运后台</h1>
      <ul class="login-input">
        <li><el-input v-model="userInfo.username" placeholder="请输入手机号" @keyup.enter.native="enter()" value="admin"><template slot="append"><img src="@/assets/icons/login/phone.png"> </template></el-input></li>
        <li><el-input type="password" v-model="userInfo.password" placeholder="请输入密码" value="123456" @keyup.enter.native="enter()"><template slot="append"><img src="@/assets/icons/login/password.png"> </template></el-input></li>
        <li class="right"><a href="javascript:;">忘记密码?</a></li>
        <li><el-button type="primary" @click="enter()">登陆</el-button></li>
      </ul>
    </div>
  </div>
</template>

<script>
import { login } from '@/assets/api/api'
import '@/assets/scss/login.scss'
export default {
  data() {
    return {
      userInfo: {
        username: '',
        password: ''
      }
    };
  },
  methods: {
    enter(){
       login(this.userInfo).then(res => {
         let that = this
        // sessionStorage.setItem('userInfoData',JSON.stringify(res.data))
         layer.msg('登陆成功',{ time: 1500 },function () {
           that.$router.push({ path: '/index'})
         })
       })
    }
  },
  mounted(){

  }
}
</script>
