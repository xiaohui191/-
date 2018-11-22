<template>
  <div id="finance_account_detail">
    <div class="main_wrap">
      <el-card class="box-card">
        <el-row :gutter="20" class="header-bar">
          <el-col :span="5">
            <div>
              <el-input placeholder="输入关键词搜索" v-model="account_detail_keyword" class="input-with-select">
                <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
              </el-input>
            </div>
          </el-col>
          <el-col :span="7">
            <el-date-picker
              v-model="transaction_date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-col>
        </el-row>
        <el-table
          :data="account_list"
          style="width: 100%">
          <el-table-column label="会员ID">
            <template slot-scope="scope">{{scope.row.member_id}}</template>
          </el-table-column>
          <el-table-column label="会员名称">
            <template slot-scope="scope">{{scope.row.member_name}}</template>
          </el-table-column>
          <el-table-column label="个人/单位">
            <template slot-scope="scope">{{scope.row.name}}</template>
          </el-table-column>
          <el-table-column label="联系电话">
            <template slot-scope="scope">{{scope.row.phone}}</template>
          </el-table-column>
          <el-table-column label="充值总和(RMB)">
            <template slot-scope="scope">{{scope.row.recharge_count}}</template>
          </el-table-column>
          <el-table-column label="支付总和(RMB)">
            <template slot-scope="scope">{{scope.row.pay_count}}</template>
          </el-table-column>
          <el-table-column label="余额(RMB)">
            <template slot-scope="scope">{{scope.row.over_menoy}}</template>
          </el-table-column>
          <el-table-column label="交易时间">
            <template slot-scope="scope">{{scope.row.transaction_time}}</template>
          </el-table-column>
          <el-table-column label="操作" width="90">
            <template slot-scope="scope">
              <el-button size="small" type="info" @click="show_detail(scope)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pages_wrap">
          <el-pagination class="pages fr" background :page-size="100" layout="total,prev, pager, next" :total="1000"></el-pagination>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
//import finance_account_detail_person from './finance_account_detail_person.vue'
export default {
  name: "finance_account_detail",
  data: () => ({
    account_detail_keyword:'',
    transaction_date:'',
    account_list:[{
      member_id:'123',
      member_name:'laoli',
      name:'林某某',
      phone:'1234678975',
      recharge_count:'+18000',
      pay_count:'-6000',
      over_menoy:'+12000',
      transaction_time:'2018-04-18 18:15',
    }],
  }),
  components: {

  },
  created() {
    //do something after creating vue instance
  },
  methods: {
    search(){
      console.log('点击了搜索');
    },
    show_detail(cur_list){
      this.$router.push({path:'/finance_account_detail/finance_account_detail_person',query:{show_look:true}})
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
