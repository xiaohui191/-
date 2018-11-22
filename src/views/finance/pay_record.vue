<template>
  <div id="pay_record">
    <div class="main_wrap">
      <el-card class="box-card">
        <el-row :gutter="20" class="header-bar">
          <el-col :span="20">
            <el-col :span="3">
              <el-select v-model="member_type" placeholder="会员类型"
                @change="member_type_change">
                  <el-option
                  v-for="(item,index) in member_type_list"
                  :key="item.label"
                  :label="item.member"
                  :value="item.label">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="3">
              <el-select v-model="member_grade" placeholder="会员等级">
                  <el-option
                  v-for="(item,index) in member_grade_list"
                  :key="item.label"
                  :label="item.member"
                  :value="item.label">
                </el-option>
              </el-select>
            </el-col>
          </el-col>
          <el-col :span="4">
            <el-col :span="16">
              <el-input v-model="member_keywords" placeholder="请输入关键字"></el-input>
            </el-col>
            <el-col :span="8">
              <el-button type="success">搜索</el-button>
            </el-col>
          </el-col>
        </el-row>
      </el-card>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column label="类型" width="80">
          <template slot-scope="scope">{{scope.row.type}}</template>
        </el-table-column>
        <el-table-column label="等级" width="60">
          <template slot-scope="scope">{{scope.row.grade}}</template>
        </el-table-column>
        <el-table-column label="会员ID" width="80">
          <template slot-scope="scope">{{scope.row.member_id}}</template>
        </el-table-column>
        <el-table-column label="会员名称">
          <template slot-scope="scope">{{scope.row.member_name}}</template>
        </el-table-column>
        <el-table-column :label="member_type==1?'真实姓名':'企业名称'">
          <template slot-scope="scope">{{member_type==1?scope.row.name:scope.row.company}}</template>
        </el-table-column>
        <el-table-column label="付款名称">
          <template slot-scope="scope">{{scope.row.country}}</template>
        </el-table-column>
        <el-table-column label="付款方式" width="120">
          <template slot-scope="scope">{{scope.row.phone}}</template>
        </el-table-column>
        <el-table-column label="付款金额" width="120">
          <template slot-scope="scope">{{scope.row.money}}</template>
        </el-table-column>
        <el-table-column label="付款时间" width="150">
          <template slot-scope="scope">{{scope.row.time}}</template>
        </el-table-column>
        <el-table-column label="状态" width="80">
          <template slot-scope="scope">{{scope.row.status}}</template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button size="small" type="info" @click="show_detail(scope)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pages_wrap">
      <el-pagination class="pages fr" background :page-size="100" layout="total,prev, pager, next" :total="1000"></el-pagination>
    </div>
  </div>
</template>
<script>
import pay_record_detail from './pay_record_detail';
export default {
  name: "pay_record",
  data: () => ({
    member_type:0,
    member_type_list:[{
      label:0,
      member:'企业会员'
    },{
      label:1,
      member:'个人会员'
    }],
    member_grade:0,
    member_grade_list:[{
      label:0,
      member:'会员等级'
    },{
      label:1,
      member:'1级'
    },{
      label:2,
      member:'2级'
    },{
      label:3,
      member:'3级'
    },{
      label:4,
      member:'4级'
    },{
      label:5,
      member:'5级'
    }],
    member_keywords:'',
    tableData: [{
      type: 'personal',
      grade: '1级',
      member_id: '1685',
      member_name:'kyle',
      name:'陈俊博',
      country:'支付宝',
      money:'￥50000',
      phone:'2018-05-08 09:12:23',
      integral:'付款失败',
    }],
  }),
  components: {
    pay_record_detail
  },
  created() {
    //do something after creating vue instance

  },
  methods: {
    member_type_change(value) {
      console.log(value);
    },
    show_detail(cur_list){
      console.log(cur_list);
      this.$layer.iframe({
        title: '订单详情',
        shade: true,//是否显示遮罩
        content: {
          content: pay_record_detail, //传递的组件对象
          parent: this,//当前的vue对象
          data:{tableData:cur_list.row, show_look:true}//props
        },
        shadeClose: false,//点击遮罩是否关闭
        area:['80%','calc(80%)']
      });
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
