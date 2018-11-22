<template>
  <div id="">
    <div class="main_wrap">
      <el-card class="box-card col_text_r">
        <div slot="header" class="clearfix">
          <span>会员信息</span>
        </div>
        <el-row :gutter="20" class="header-bar">
          <el-col :span="3">会员名称：</el-col>
          <el-col :span="21">laolee</el-col>
        </el-row>
        <el-row :gutter="20" class="header-bar">
          <el-col :span="3">个人/单位：</el-col>
          <el-col :span="21">林某某</el-col>
        </el-row>
        <el-row :gutter="20" class="header-bar">
          <el-col :span="3">会员地址：</el-col>
          <el-col :span="21">广东省广州市天河区保利中宇广场</el-col>
        </el-row>
        <el-row :gutter="20" class="header-bar">
          <el-col :span="3">账户余额：</el-col>
          <el-col :span="21">￥500.00</el-col>
        </el-row>
      </el-card>
      <el-card class="box-card col_text_r order_list">
        <div slot="header" class="clearfix">
          <span>订单信息</span>
        </div>
        <el-form :model="account_freeze" :rules="rules" ref="account_freeze" label-width="12%">
          <el-form-item label="订单号：">
            <el-col :span="21">456123132</el-col>
          </el-form-item>
          <el-form-item label="汇款人：">
            <el-col :span="21">林某某</el-col>
          </el-form-item>
          <el-form-item label="汇款银行：">
            <el-col :span="21">工商银行</el-col>
          </el-form-item>
          <el-form-item label="汇款金额：">
            <el-col :span="21">￥500.00</el-col>
          </el-form-item>
          <el-form-item label="流水号：">
            <el-col :span="21">98774654785</el-col>
          </el-form-item>
          <el-form-item label="汇款时间：">
            <el-col :span="21">2018-05-10 12:20:20</el-col>
          </el-form-item>
          <el-form-item label="汇款用途：">
            <el-col :span="21">预充值</el-col>
          </el-form-item>
          <el-form-item label="提交时间：">
            <el-col :span="21">2018-05-10 12:00:25</el-col>
          </el-form-item>
          <el-form-item label="状态确认：" v-if="tableData.status=='已入账'">
            <el-col :span="21">{{status_list[account_freeze.status].label}}</el-col>
          </el-form-item>
          <el-form-item label="状态确认：" prop="status" v-if="tableData.status!='已入账'">
            <el-select v-model="account_freeze.status" placeholder="请选择">
              <el-option
                v-for="item in status_list"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="异常原因：" prop="reason" v-if="account_freeze.status==1 && tableData.status!='已入账'">
            <el-radio-group v-model="account_freeze.reason">
              <el-radio :label="0">没有收到汇款</el-radio>
              <el-radio :label="1">金额错误</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="备注：" :style="account_freeze.status==1?'margin-bottom:20px;':'margin-top:20px; margin-bottom:20px;'" v-if="tableData.status!='已入账'">
            <el-input type="textarea" v-model="account_freeze.desc" :autosize="{ minRows: 20, maxRows: 30}"></el-input>
          </el-form-item>
          <el-form-item v-if="tableData.status!='已入账'">
            <el-button type="primary" @click="submitForm('account_freeze')">提交保存</el-button>
          </el-form-item>
        </el-form>
      </el-card>
      {{tableData}}
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  data: () => ({
    status_list:[{
      value:0,
      label:'未确认'
    },{
      value:1,
      label:'异常'
    },{
      value:2,
      label:'确认并入账'
    }],
    account_freeze: {
      status:0,
      reason: 0,
      desc:''
    },
    rules:{
      status: [
        { required: true, message: '请选择状态', trigger: 'change' }
      ],
      reason: [
        { required: true, message: '请选择原因', trigger: 'change' }
      ]
    }
  }),
  props: ['tableData'],
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
