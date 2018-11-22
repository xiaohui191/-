<template>
  <div id="order_list">
    <div class="main_wrap">
      <el-card class="box-card">
        <el-row :gutter="20" class="header-bar">
          <el-col :span="3">
            <el-input v-model="account_keywords" placeholder="请输入关键词"></el-input>
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
          <el-table-column :label="order_type==5?'出库时间':'下单时间'" width="150">
            <template slot-scope="scope">{{scope.row.order_time}}</template>
          </el-table-column>
          <el-table-column label="相关备注">
            <template slot-scope="scope">{{scope.row.desc}}</template>
          </el-table-column>
          <el-table-column label="状态" width="80" v-if="order_type!=1">
            <template slot-scope="scope">{{scope.row.status}}</template>
          </el-table-column>
          <el-table-column label="操作" :width="(order_type==4 || order_type==5 || order_type==6)?'180':'120'">
            <template slot-scope="scope">
              <el-button size="small" type="warning" @click="editor(scope)" v-if="order_type!=4 && order_type!=5 && order_type!=6">编辑</el-button>
              <el-button size="small" type="info" @click="show_detail(scope)" v-if="order_type==4 || order_type==5 || order_type==6">查看</el-button>
              <el-button size="small" type="primary" @click="outbound(scope)" v-if="order_type==4">立即出库</el-button>
              <el-button size="small" type="danger" @click="del(scope)" v-if="order_type==5 || order_type==6">删除</el-button>
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
import order_editor from './order_editor.vue'
export default {
  name: "order_list",
  data: () => ({
    order_type:1,
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
    tableData : [{
      serial_number: '20088816416101',
      orders: 'ashin',
      receiver: '陈伟宏',
      phone:'12345678912',
      send_type:'航空',
      order_time:'2018-04-18 18:15',
      desc:'有易碎品',
      status:'未计算'
    }]
  }),
  components: {
    order_editor
  },
  watch:{
    '$route' (to,from){
      this.order_type = to.query.type;
      console.log('order_type:'+this.order_type);
    }
  },
  created() {
    //do something after creating vue instance
    this.order_type = this.$route.query.type;
    console.log('order_type:'+this.order_type);
  },
  methods: {
    search(){
      console.log('点击了搜索');
    },
    account_date_change(date){
      console.log(date,this.account_date);
    },
    editor(cur_list){
      console.log(cur_list);
      this.$layer.iframe({
        title: '订单详情',
        shade: true,//是否显示遮罩
        content: {
          content: order_editor, //传递的组件对象
          parent: this,//当前的vue对象
          data:{tableData:cur_list.row,editor:true}//props
        },
        shadeClose: false,//点击遮罩是否关闭
        area:['80%','calc(80%)']
      });
    },
    show_detail(cur_list){
      console.log(cur_list);
      this.$layer.iframe({
        title: '订单详情',
        shade: true,//是否显示遮罩
        content: {
          content: order_editor, //传递的组件对象
          parent: this,//当前的vue对象
          data:{tableData:cur_list.row,editor:false,not_released:this.order_type==6?false:true}//props
        },
        shadeClose: false,//点击遮罩是否关闭
        area:['80%','calc(80%)']
      });
    },
    outbound(cur_list){
      console.log(cur_list);

    },
    del(cur_list){
      console.log(cur_list);

    },
  }
}
</script>
<style lang="scss" scoped>
</style>
