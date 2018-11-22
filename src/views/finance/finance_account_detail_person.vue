<template>
  <div id="finance_account_detail_person">
    <div class="main_wrap">
      <el-card class="box-card">
        <el-row :gutter="20" class="header-bar">
          <el-col :span="5">
            <div>
              <el-input placeholder="输入关键词搜索" v-model="account_keywords" class="input-with-select">
                <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
              </el-input>
            </div>
          </el-col>
          <el-col :span="3">
            <el-select v-model="pay_type" placeholder="请选择支付方式">
              <el-option
                v-for="(item,index) in pay_type_list"
                :key="item.label"
                :label="item.member"
                :value="item.label">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="3">
            <el-select v-model="transaction_use" placeholder="请选择交易用途">
              <el-option
                v-for="(item,index) in transaction_use_list"
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
        </el-row>
        <el-table
          :data="account_list"
          style="width: 100%">
          <el-table-column label="编号">
            <template slot-scope="scope">{{scope.row.storage_id}}</template>
          </el-table-column>
          <el-table-column label="订单号">
            <template slot-scope="scope">{{scope.row.serial_number}}</template>
          </el-table-column>
          <el-table-column label="交易银行">
            <template slot-scope="scope">{{scope.row.name}}</template>
          </el-table-column>
          <el-table-column label="流水号">
            <template slot-scope="scope">{{scope.row.price}}</template>
          </el-table-column>
          <el-table-column label="交易金额(RMB)">
            <template slot-scope="scope">{{scope.row.count}}</template>
          </el-table-column>
          <el-table-column label="交易用途">
            <template slot-scope="scope">{{scope.row.stock_position}}</template>
          </el-table-column>
          <el-table-column label="交易时间">
            <template slot-scope="scope">{{scope.row.strorage_time}}</template>
          </el-table-column>
          <el-table-column label="操作" width="90" v-if="look_show">
            <template slot-scope="scope">
              <el-button size="small" type="warning" @click="show_detail(scope)">查看</el-button>
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
import order_editor from '../order/order_editor.vue'
export default {
  name: "finance_account_detail_person",
  data: () => ({
    account_keywords:'',
    pay_type:'',
    pay_type_list:[{
      label:0,
      member:'支付宝'
    },{
      label:1,
      member:'工商银行'
    }],
    transaction_use:'',
    transaction_use_list:[{
      value:0,
      label:'支付'
    },{
      value:1,
      label:'预充值'
    }],
    account_date:'',
    account_list:[{
      storage_id:'20001',
      serial_number:'20088816416101',
      name:'cloths',
      price:'10.00',
      count:'1',
      stock_position:'圆通1',
      strorage_time:'2018-04-18 18：15',
    }],
    look_show:false,
  }),
  components: {
    order_editor
  },
  props: ['show_look'],
  created() {
    //do something after creating vue instance
    this.look_show = this.$route.query.show_look || this.show_look;
    console.log(this.look_show);
  },
  methods: {
    search(){
      console.log('点击了搜索');
    },
    account_date_change(date){
      console.log(date,this.account_date);
    },
    show_detail(cur_list){
      console.log(cur_list);
      this.$layer.iframe({
        title: '订单详情',
        shade: true,//是否显示遮罩
        content: {
          content: order_editor, //传递的组件对象
          parent: this,//当前的vue对象
          data:{tableData:cur_list.row}//props
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
