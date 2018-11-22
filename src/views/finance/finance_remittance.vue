<template>
  <div id="remittance">
    <div class="main_wrap">
      <el-card class="box-card" shadow="never">
        <el-row :gutter="20" class="header-bar">
          <el-col :span="5">
            <div>
              <el-input placeholder="输入关键词搜索" v-model="remittance_condition.name" class="input-with-select">
                <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
              </el-input>
            </div>
          </el-col>
          <el-col :span="3">
            <el-select v-model="remittance_condition.status" placeholder="选择状态">
              <el-option
                v-for="(item,index) in status_list"
                :key="item.label"
                :label="item.member"
                :value="item.label">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="7">
            <el-date-picker
              v-model="account_date"
              type="daterange"
              @change='account_date_change'
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-col>
        </el-row>
        <el-table
          :data="remittance_list"
          style="width: 100%">
          <el-table-column label="会员ID">
            <template slot-scope="scope">{{scope.row.member_id}}</template>
          </el-table-column>
          <el-table-column label="会员名称">
            <template slot-scope="scope">{{scope.row.member_name}}</template>
          </el-table-column>
          <el-table-column label="汇款人/单位">
            <template slot-scope="scope">{{scope.row.company}}</template>
          </el-table-column>
          <el-table-column label="汇款银行">
            <template slot-scope="scope">{{scope.row.bank}}</template>
          </el-table-column>
          <el-table-column label="汇款金额">
            <template slot-scope="scope">{{scope.row.price}}</template>
          </el-table-column>
          <el-table-column label="流水号">
            <template slot-scope="scope">{{scope.row.serial_num}}</template>
          </el-table-column>
          <el-table-column label="汇款时间">
            <template slot-scope="scope">{{scope.row.time}}</template>
          </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">{{scope.row.status}}</template>
          </el-table-column>
          <el-table-column label="操作" width="80">
            <template slot-scope="scope">
              <el-button size="small" type="warning" @click="edit(scope)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
    <div class="pages_wrap" v-if="Number(pages.total)">
      <el-pagination class="pages fr" background :page-size="Number(pages.page_size)" layout="total,prev, pager, next"
        @current-change="init"
       :total="Number(pages.total)"></el-pagination>
    </div>
  </div>
</template>
<script>
import { financing_remittance } from '@/assets/api/api.js'
import remittance_detail from './remittance_detail';
export default {
  name: "remittance",
  data: () => ({
    status_list:[
      {
        label:0,
        member:'汇款状态'
      },{
      label:1,
      member:'已入账'
    },{
      label:2,
      member:'未入账'
    }],
    account_date:'',
    remittance_list:[],
    remittance_condition:{
      name:'',//搜索内容
      status:0,//状态(1正常，2冻结)
      begin_time:'',//开始时间，格式：2018-05-06
      end_time:'',//结束时间，格式：2018-05-06
      page:0
    },
    pages:{
      page_size:'100',
      total:'100',
    },
  }),
  created() {
    //do something after creating vue instance
    this.init();
  },
  methods: {
    init(value){
      this.remittance_condition.page = value;
      financing_remittance(this.remittance_condition).then(res => {
        this.pages.page_size = res.per_page;
        this.pages.total = res.total;
        this.remittance_list = res.data;
        console.log(res);
      })
    },
    search(){
      console.log('点击了搜索');
    },
    account_date_change(date){
      this.member_condition.begin_time = this.account_date[0];
      this.member_condition.end_time = this.account_date[1];
      this.init();
    },
    edit(cur_data){
      console.log(cur_data);
      this.$layer.iframe({
        title: '汇款确认详情',
        shade: true,//是否显示遮罩
        content: {
          content: remittance_detail, //传递的组件对象
          parent: this,//当前的vue对象
          data:{tableData:cur_data.row}//props
        },
        shadeClose: false,//点击遮罩是否关闭
        area:['60%','calc(80%)']
      });
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
