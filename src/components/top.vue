<template>
  <div class="top-bar clearfix">
    <div class="top-bar-l fl">
      <router-link to="/index" class="top-bar-link">返回首页</router-link>
    </div>
    <div class="top-bar-r fr">
      <a href="javascript:;" class="top-bar-link">链接跳转</a>
      <el-dropdown>
        <span class="el-dropdown-link">{{userInfo.username}}<i class="el-icon-arrow-down el-icon--right"></i></span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>下拉子菜单1</el-dropdown-item>
          <el-dropdown-item>下拉子菜单2</el-dropdown-item>
          <el-dropdown-item><a href="javascript:;" @click="logoutBtn()">退出登陆</a></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div class="avatar" @mouseover="overShow" @mouseout="outHide" v-if="userInfo">
        <!-- <div class="avatar-img"><img :src="userInfo.avatar" v-if="userInfo.avatar"></div> -->
        <div class="avatar-dropdown" v-if="dropdown">
          <div class="avatar-info">
            <p><img :src="userInfo.avatar"></p>
            <p>{{userInfo.admin_name}}</p>
          </div>
          <div class="avatar-list">
            <ul class="clearfix">
              <li><a href="#"><i class="el-icon-setting"></i><p>基本资料</p></a></li>
              <li><a href="#"><i class="el-icon-edit-outline"></i><p>实名认证</p></a></li>
              <li><a href="#"><i class="el-icon-date"></i><p>安全设置</p></a></li>
              <li><a href="#"><i class="el-icon-printer"></i><p>安全管控</p></a></li>
              <li><a href="#"><i class="el-icon-news"></i><p>访问控制</p></a></li>
              <li><a href="#"><i class="el-icon-message"></i><p>会员权益</p></a></li>
              <li><a href="#"><i class="el-icon-rank"></i><p>会员积分</p></a></li>
              <li><a href="#"><i class="el-icon-upload"></i><p>云大使管理</p></a></li>
              <li><a href="#"><i class="el-icon-more"></i><p>accesskeys</p></a></li>
            </ul>
          </div>
          <div class="avatar-out"><a href="javascript:;" @click="logoutBtn()">退出登陆</a></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { logout,islogin } from '@/assets/api/api'
export default {
  data() {
    return {
      dropdown: false,
      userInfo:[]
    };
  },
  created() {
    //do something after creating vue instance
    this.islogin();
  },
  methods: {
    islogin(){
      islogin().then(res => {
        if(Number(res.Error)!=200){
          layer.msg('账户已过期，请重新登入',{ time: 1500 },function () {
            that.$router.push({ path: '/' })
          })
        }
        let that = this
        this.userInfo = res.data;
        sessionStorage.setItem('userInfo', JSON.stringify(this.userInfo));
      })
    },
    overShow(){
      this.dropdown = true
    },
    outHide(){
      this.dropdown = false
    },
    logoutBtn(){
      logout().then(res => {
        let that = this
        layer.msg('退出成功',{ time: 1500 },function () {
          that.$router.push({ path: '/' })
        })
      })
    }
  }
}
</script>
