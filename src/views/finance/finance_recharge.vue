<template>
  <div id="finance_recharge">
    <div class="main_wrap">
      <el-steps :active="active" finish-status="success" simple class="hui_step">
        <el-step title="输入账号" ></el-step>
        <el-step title="确认信息" ></el-step>
        <el-step title="充值到账" ></el-step>
      </el-steps>
      <el-card class="box-card">
        <el-tabs v-model="activeName" class="no_header">
          <el-tab-pane  name="first">
            <div class="content">
              <el-form :model="numberValidateForm" status-icon :rules="rules" ref="numberValidateForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="会员账号：" prop="member_account">
                  <el-input type="text" v-model="numberValidateForm.member_account" auto-complete="off" style="width:200px;"></el-input>
                </el-form-item>
              </el-form>
            </div>
          </el-tab-pane>
          <el-tab-pane  name="second">
            <div class="content">
              <div class="account_info">
                <el-form :model="member_info" status-icon :rules="money_rules" ref="member_info" label-width="100px" class="demo-ruleForm money_form">
                  <el-form-item label="">
                    <h2 class="">{{member_info.othername}}</h2>
                  </el-form-item>
                  <el-form-item label="">
                    {{member_info.username}}
                  </el-form-item>
                  <el-form-item label="￥">
                    <span class="money_num">{{Math.round(member_info.remaining_sum * 100) / 100 || 0.00}}</span>
                  </el-form-item>
                  <el-form-item label="￥" prop="remaining_sum">
                    <el-input type="number" v-model.number="member_info.remaining_sum" auto-complete="off" style="width:200px;"></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane  name="third">
            <div class="content">
              <div class="account_info">
                <el-form :model="member_info" status-icon :rules="money_rules" ref="member_info" label-width="100px" class="demo-ruleForm money_form">
                  <el-form-item label="">
                    <h2 class="">{{member_info.othername}}</h2>
                  </el-form-item>
                  <el-form-item label="">
                    {{member_info.username}}
                  </el-form-item>
                  <el-form-item label="￥">
                    <span class="money_num">{{Math.round(member_info.remaining_sum * 100) / 100 || 0.00}}</span>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
        <div class="bt_btn_wrap">
          <el-button style="margin-top: 12px;" @click="prev" v-if="active==2">上一步</el-button>
          <el-button style="margin-top: 12px;" @click="next('numberValidateForm')">{{next_html}}</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
import {member_get_user,financing_add} from '@/assets/api/api.js'
export default {
  name: "finance_recharge",
  data(){
    var memberAccount = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入会员账号！'));
        } else if(!/^[a-z0-9_-]{6,20}$/.test(this.numberValidateForm.member_account)){
            callback(new Error('请输入6-20个字母或数字组合！'));
        }else{
          callback();
        }
      };
    return{
      active: 1,
      next_html:'下一步',
      activeName:'first',
      numberValidateForm: {
        member_account: ''
      },
      rules:{
        member_account: [
          { required: true, message: '会员账号不能为空'},
          { validator: memberAccount, trigger: 'blur' }
        ]
      },
      member_info:{
        remaining_sum:''
      },
      money_rules:{
        remaining_sum: [
          { required: true, message: '金额不能为空'},
          { type: 'number', message: '金额必须为数字值'}
        ]
      },
    }
  },
  created(){
  },
  methods: {
    tab_fn(active){
      switch (active) {
        case 1:
          this.activeName = 'first'
          break;
        case 2:
          this.activeName = 'second'
          break;
        default:
          this.activeName = 'third'
          this.next_html = '确认'
      }
    },
    //下一步
    next(formName) {
      if ( this.active > 2 ){
        this.$router.replace('/finance_remittance');
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.active);
          if( this.active == 1 ){
            member_get_user({username:this.numberValidateForm.member_account}).then(res => {
              console.log(res);
              this.member_info = res.data;
              this.member_info.remaining_sum = Number(this.member_info.remaining_sum);
              this.active++
              this.tab_fn(this.active);
            })
          }else if( this.active == 2 ){
            financing_add({user_id:this.member_info.id,money:this.member_info.remaining_sum}).then(res => {
              this.active++
              this.tab_fn(this.active);
            })
          }
          //alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    prev(){
      this.active--
      this.tab_fn(this.active);
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
