<template>
  <div id="stock_list">
    <div class="main_wrap">
      <el-card class="box-card">
        <el-row :gutter="20" class="header-bar">
          <el-col :span="3">
            <el-input v-model="account_keywords" placeholder="请输入快递编号"></el-input>
          </el-col>
          <el-col :span="3">
            <el-select v-model="send_type" placeholder="全部类型">
              <el-option
                v-for="(item,index) in send_type_list"
                :key="item.label"
                :label="item.member"
                :value="item.label">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="3">
            <el-select v-model="stock_position" placeholder="库存位置">
              <el-option
                v-for="(item,index) in stock_position_list"
                :key="item.label"
                :label="item.member"
                :value="item.label">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="7"><el-date-picker
              v-model="account_date"
              type="daterange"
              @change='account_date_change'
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
          <el-table-column label="入库ID" width="80">
            <template slot-scope="scope">{{scope.row.storage_id}}</template>
          </el-table-column>
          <el-table-column label="国内快递编号" width="160">
            <template slot-scope="scope">{{scope.row.number}}</template>
          </el-table-column>
          <el-table-column label="品名" width="80">
            <template slot-scope="scope">{{scope.row.product_name}}</template>
          </el-table-column>
          <el-table-column label="单价">
            <template slot-scope="scope">{{scope.row.price}}</template>
          </el-table-column>
          <el-table-column label="数量">
            <template slot-scope="scope">{{scope.row.count}}</template>
          </el-table-column>
          <el-table-column label="库存位置" width="120">
            <template slot-scope="scope">{{scope.row.place}}</template>
          </el-table-column>
          <el-table-column label="入库时间" width="150">
            <template slot-scope="scope">{{scope.row.storage_time}}</template>
          </el-table-column>
          <el-table-column label="入库时长" width="80">
            <template slot-scope="scope">{{scope.row.storage_long}}</template>
          </el-table-column>
          <el-table-column label="预录状态" width="80">
            <template slot-scope="scope">{{scope.row.pre_recorded_status}}</template>
          </el-table-column>
          <el-table-column label="出库状态" width="150">
            <template slot-scope="scope">{{scope.row.outbound_status}}</template>
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button size="small" type="danger">删除</el-button>
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
export default {
  name: "stock_list",
  data: () => ({
    account_keywords:'',
    send_type:'',
    send_type_list:[{
      label:0,
      member:'申通'
    },{
      label:1,
      member:'圆通'
    }],
    stock_position:'',
    stock_position_list:[{
      value:0,
      label:'申通1'
    },{
      value:1,
      label:'申通2'
    }],
    account_date:'',
    tableData : [{
      storage_id: '20001',
      number: '20088816416101',
      product_name: 'cloths',
      price:'10.00',
      count:'10',
      place:'圆通1',
      storage_time:'2018-04-18 18：15',
      storage_long:'5天',
      pre_recorded_status:'已录',
      outbound_status:'未出库'
    }]
  }),
  watch:{
    '$route' (to,from){
      console.log(to);
    }
  },
  created() {
    //do something after creating vue instance
    console.log(this.$route);
  },
  methods: {
    search(){
      console.log('点击了搜索');
    },
    account_date_change(date){
      console.log(date,this.account_date);
    },
  }
}
</script>
<style lang="scss" scoped>
</style>
