<template>
  <div id="order_print">
    <div class="main_wrap">
      <el-card class="box-card">
        <el-row :gutter="20" class="header-bar">
          <el-col :span="3">
            <el-input v-model="account_keywords" placeholder="请输入关键词"></el-input>
          </el-col>
          <el-col :span="2" style="text-align:right">运输方式：</el-col>
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
          style="width: 100%" id="subOutputRank-print">
          <el-table-column label="订单流水号" width="160">
            <template slot-scope="scope">{{scope.row.serial_number}}</template>
          </el-table-column>
          <el-table-column label="下单人" width="80">
            <template slot-scope="scope">{{scope.row.orders}}</template>
          </el-table-column>
          <el-table-column label="收货人" width="80">
            <template slot-scope="scope">{{scope.row.receiver}}</template>
          </el-table-column>
          <el-table-column label="联系电话" width="120">
            <template slot-scope="scope">{{scope.row.phone}}</template>
          </el-table-column>
          <el-table-column label="运输方式" width="100">
            <template slot-scope="scope">{{scope.row.send_type}}</template>
          </el-table-column>
          <el-table-column label="下单时间" width="150">
            <template slot-scope="scope">{{scope.row.order_time}}</template>
          </el-table-column>
          <el-table-column label="相关备注">
            <template slot-scope="scope">{{scope.row.desc}}</template>
          </el-table-column>
          <el-table-column label="运单选择" width="150">
            <template slot-scope="scope">
              <el-select v-model="scope.row.print_type" placeholder="请选择">
                <el-option v-for="item in print_type_list" :key="item.value"
                  :label="item.label"
                  :value="item.value"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <el-button size="small" type="warning" @click="order_print(scope)">立即打印</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <div class="pages_wrap">
        <el-pagination class="pages fr" background :page-size="100" layout="total,prev, pager, next" :total="1000"></el-pagination>
      </div>
      <el-button @click="printContent">打印</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "order_print",
  data: () => ({
    account_keywords:'',
    send_type:'',
    send_type_list:[{
      label:0,
      member:'航空'
    },{
      label:1,
      member:'海运'
    }],
    account_date:'',
    print_type_list:[{
        value: '0',
        label: 'abx运单'
      },{
        value: '1',
        label: 'CITY运单'
      },{
        value: '2',
        label: 'DPEX运单'
      },
      {
        value: '3',
        label: '旧DPEX运单'
      }
    ],
    tableData : [{
      serial_number: '20088816416101',
      orders: 'ashin',
      receiver: '陈伟宏',
      phone:'12345678912',
      send_type:'航空',
      order_time:'2018-04-18 18:15',
      desc:'有易碎品',
      print_type:'0'
    }]
  }),
  methods: {
    search(){
      console.log('点击了搜索');
    },
    account_date_change(date){
      console.log(date,this.account_date);
    },
    order_print(cur_list) {
      console.log(cur_list);
    },
    printContent(e){
       let subOutputRankPrint = document.getElementById('subOutputRank-print');
       console.log(subOutputRankPrint.innerHTML);
       let newContent =subOutputRankPrint.innerHTML;
       let oldContent = document.body.innerHTML;
       document.body.innerHTML = newContent;
       window.print();
       window.location.reload();
       document.body.innerHTML = oldContent;
       return false;
   },
  }
}
</script>
<style lang="scss" scoped>
</style>
