<template>
  <div id="member_release">
    <div class="main_wrap">
      <el-card class="box-card col_text_r">
        <div slot="header" class="clearfix">
          <span>会员详情</span>
        </div>
        <div class="information">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-col :span="6">会  员  ID：</el-col>
              <el-col :span="18">{{cur_data.member_id}}</el-col>
            </el-col>
            <el-col :span="12">
              <el-col :span="6">真实姓名：</el-col>
              <el-col :span="18">{{cur_data.name}}</el-col>
            </el-col>
            <el-col :span="12">
              <el-col :span="6">会员名称：</el-col>
              <el-col :span="18">{{cur_data.name}}</el-col>
            </el-col>
            <el-col :span="12">
              <el-col :span="6">联系电话：</el-col>
              <el-col :span="18">{{cur_data.name}}</el-col>
            </el-col>
            <el-col :span="12">
              <el-col :span="6">会员等级：</el-col>
              <el-col :span="18">{{cur_data.name}}</el-col>
            </el-col>
            <el-col :span="12">
              <el-col :span="6">Q         Q：</el-col>
              <el-col :span="18">{{cur_data.name}}</el-col>
            </el-col>
            <el-col :span="12">
              <el-col :span="6">个人会员：</el-col>
              <el-col :span="18">{{cur_data.name}}</el-col>
            </el-col>
            <el-col :span="12">
              <el-col :span="6">微        信：</el-col>
              <el-col :span="18">{{cur_data.name}}</el-col>
            </el-col>
            <el-col :span="12">
              <el-col :span="6">国       家：</el-col>
              <el-col :span="18">{{cur_data.name}}</el-col>
            </el-col>
            <el-col :span="12">
              <el-col :span="6">旺        旺：</el-col>
              <el-col :span="18">{{cur_data.name}}</el-col>
            </el-col>
            <el-col :span="12">
              <el-col :span="6">推  荐 人：</el-col>
              <el-col :span="18">{{cur_data.name}}</el-col>
            </el-col>
            <el-col :span="12">
              <el-col :span="6">会员地址：</el-col>
              <el-col :span="18">{{cur_data.name}}</el-col>
            </el-col>
          </el-row>
        </div>
      </el-card>
      <el-form :model="account_freeze" :rules="rules" ref="account_freeze" label-width="100px" class="account_freeze_ruleForm">
        <el-form-item label="冻结原因：" prop="reason">
          <el-select v-model="account_freeze.reason" placeholder="请选择">
            <el-option
            v-for="item in freeze_reason_list"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="冻结备注：" prop="desc">
        <el-input type="textarea" v-model="account_freeze.desc" :autosize="{ minRows: 20, maxRows: 30}"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('account_freeze')">提交</el-button>
      </el-form-item>
    </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: "member_release",
  data: () => ({
    cur_data:{
      type: 'personal',
      grade: '1级',
      member_id: '1685',
      member_name:'kyle',
      name:'陈俊博',
      country:'瑞士',
      phone:'15914365625',
      money:'￥50000',
      integral:'10000',
      status:'正常'
    },
    freeze_reason_list:[{
      value:0,
      label:'拖欠贷款'
    },{
      value:1,
      label:'存在恶搞'
    },{
      value:2,
      label:'账户有异常'
    }],
    account_freeze: {
      reason: 0,
      desc:''
    },
    rules:{
      reason: [
        { required: true, message: '请选择活动资源', trigger: 'change' }
      ],
      desc: [
        { required: true, message: '请填写活动形式', trigger: 'blur' }
      ]
    },
  }),
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
