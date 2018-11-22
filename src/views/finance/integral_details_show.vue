<template>
  <div id="integral_details_show">
    <div class="main_wrap">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>陈俊博</span>
        </div>
        <el-row :gutter="20" class="header-bar">
          <el-col :span="3">可用积分：500 </el-col>
          <el-col :span="5">已用积分：100 </el-col>
          <el-col :span="5">总积分：600 </el-col>
        </el-row>
        <el-table
          :data="integral_list"
          style="width: 100%">
          <el-table-column label="来源/用途">
            <template slot-scope="scope">{{scope.row.storage_id}}</template>
          </el-table-column>
          <el-table-column label="积分变化">
            <template slot-scope="scope">{{scope.row.serial_number}}</template>
          </el-table-column>
          <el-table-column label="时间">
            <template slot-scope="scope">{{scope.row.name}}</template>
          </el-table-column>
          <el-table-column label="备注">
            <template slot-scope="scope">{{scope.row.price}}</template>
          </el-table-column>
        </el-table>
        <div class="pages_wrap">
          <el-pagination class="pages fr" background :page-size="100" layout="total,prev, pager, next" :total="1000"></el-pagination>
        </div>
        {{tableData}}
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  name: "integral_details_show",
  data: () => ({
    integral_list:[{
      storage_id:'推荐新用户',
      serial_number:'+10',
      name:'2018-04-18 18：15',
      price:'推荐码:351645521',
    }],
  }),
  props: ['tableData'],
  created() {
    //do something after creating vue instance

  }
}
</script>
<style lang="scss" scoped>
</style>
