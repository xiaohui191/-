<template>
  <div id="integral_details">
    <div class="main_wrap">
      <el-card class="box-card" shadow="never">
        <el-row :gutter="20" class="header-bar">
          <el-col :span="3">
            <el-input v-model="member_keywords" placeholder="请输入关键字"></el-input>
          </el-col>
          <el-col :span="2">
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
          <el-col :span="6">
            <el-date-picker
              v-model="member_date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-col>
          <el-col :span="2">
            <el-button type="success">搜索</el-button>
          </el-col>
        </el-row>
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column label="类型" width="80">
            <template slot-scope="scope">{{scope.row.type}}</template>
          </el-table-column>
          <el-table-column label="等级" width="60">
            <template slot-scope="scope">{{scope.row.grade}}</template>
          </el-table-column>
          <el-table-column label="联系电话" width="80">
            <template slot-scope="scope">{{scope.row.phone}}</template>
          </el-table-column>
          <el-table-column label="注册时间">
            <template slot-scope="scope">{{scope.row.time}}</template>
          </el-table-column>
          <el-table-column label="总积分">
            <template slot-scope="scope">{{scope.row.total_points}}</template>
          </el-table-column>
          <el-table-column label="已用积分" width="120">
            <template slot-scope="scope">{{scope.row.used_points}}</template>
          </el-table-column>
          <el-table-column label="可用积分" width="120">
            <template slot-scope="scope">{{scope.row.remain_points}}</template>
          </el-table-column>
          <el-table-column label="状态" width="80">
            <template slot-scope="scope">{{scope.row.status}}</template>
          </el-table-column>
          <el-table-column label="操作" width="80">
            <template slot-scope="scope">
              <el-button size="small" type="info" @click="show_detail(scope)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
    <div class="pages_wrap">
      <el-pagination class="pages fr" background :page-size="100" layout="total,prev, pager, next" :total="1000"></el-pagination>
    </div>
  </div>
</template>
<script>
import integral_details_show from './integral_details_show.vue'
export default {
  name: "integral_details",
  data: () => ({
    member_type:0,
    member_type_list:[{
      label:0,
      member:'企业会员'
    },{
      label:1,
      member:'个人会员'
    }],
    member_date:'',
    member_keywords:'',
    tableData: [{
      type: 'personal',
      grade: '陈俊波',
      phone: '12345678912',
      time:'2018-04-18 15:12:23',
      total_points:'500',
      used_points:'0',
      remain_points:'500',
      status:'正常',
    }],
  }),
  components: {
    integral_details_show
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
          content: integral_details_show, //传递的组件对象
          parent: this,//当前的vue对象
          data:{tableData:cur_list.row,}//props
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
