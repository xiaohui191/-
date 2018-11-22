<template>
  <div id="pay_record_detail">
    <div class="main_wrap">
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
    </div>
  </div>
</template>
<script>
export default {
  name: "pay_record_detail",
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
  })
}
</script>
<style lang="scss" scoped>
</style>
