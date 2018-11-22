<template>
  <div id="">
    <div class="main_wrap">
      <el-card class="box-card" shadow="never">
        <el-tabs v-model="activeName" @tab-click="handleClick" class="tab_list">
          <el-tab-pane label="基本资料" name="first">
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
              <div class="foot_cont">
                <el-button type="warning" @click="go_back">退出</el-button>
              </div>
            </div>
          </el-tab-pane>
          <!-- 订单记录 -->
          <el-tab-pane label="订单记录" name="second">
            <el-row :gutter="20" class="header-bar">
              <el-col :span="2">
                <el-select v-model="transport_type" placeholder="请选择运输方式">
                    <el-option
                    v-for="(item,index) in transport_type_list"
                    :key="item.label"
                    :label="item.member"
                    :value="item.label">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="7">
                <el-col :span="6">下单时间：</el-col>
                <el-col :span="18"><el-date-picker
                  v-model="order_date"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker></el-col>
              </el-col>
              <el-col :span="2">
                <el-select v-model="order_status" placeholder="请选择状态">
                    <el-option
                    v-for="(item,index) in order_status_list"
                    :key="item.label"
                    :label="item.member"
                    :value="item.label">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="2">
                <el-button type="success">搜索</el-button>
              </el-col>
            </el-row>
            <el-table
              :data="order_list"
              style="width: 100%">
              <el-table-column label="订单流水号">
                <template slot-scope="scope">{{scope.row.serial_number}}</template>
              </el-table-column>
              <el-table-column label="收货人">
                <template slot-scope="scope">{{scope.row.receiver}}</template>
              </el-table-column>
              <el-table-column label="联系电话">
                <template slot-scope="scope">{{scope.row.phone}}</template>
              </el-table-column>
              <el-table-column label="运输方式">
                <template slot-scope="scope">{{scope.row.transport_type}}</template>
              </el-table-column>
              <el-table-column label="下单时间">
                <template slot-scope="scope">{{scope.row.order_time}}</template>
              </el-table-column>
              <el-table-column label="相关备注">
                <template slot-scope="scope">{{scope.row.remark}}</template>
              </el-table-column>
              <el-table-column label="状态">
                <template slot-scope="scope">{{scope.row.status}}</template>
              </el-table-column>
              <el-table-column label="操作" width="90">
                <template slot-scope="scope">
                  <el-button size="small" type="warning" @click="show_detail(scope)">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="pages_wrap">
              <el-pagination class="pages fr" background :page-size="100" layout="total,prev, pager, next" :total="1000"></el-pagination>
            </div>
          </el-tab-pane>
          <!-- 库存记录 -->
          <el-tab-pane label="库存记录" name="third">
            <el-row :gutter="20" class="header-bar">
              <el-col :span="3">
                <el-input v-model="postal_code" placeholder="请输入快递编号"></el-input>
              </el-col>
              <el-col :span="2">
                <el-select v-model="express_company" placeholder="快递公司">
                    <el-option
                    v-for="(item,index) in express_company_list"
                    :key="item.label"
                    :label="item.member"
                    :value="item.label">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="2">
                <el-select v-model="stock_position" placeholder="库存位置">
                    <el-option
                    v-for="(item,index) in stock_position_list"
                    :key="item.label"
                    :label="item.member"
                    :value="item.label">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="7">
                <el-date-picker
                  v-model="stock_date"
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
              :data="stock_list"
              style="width: 100%">
              <el-table-column label="入库ID">
                <template slot-scope="scope">{{scope.row.storage_id}}</template>
              </el-table-column>
              <el-table-column label="国内快递编号">
                <template slot-scope="scope">{{scope.row.serial_number}}</template>
              </el-table-column>
              <el-table-column label="品名">
                <template slot-scope="scope">{{scope.row.name}}</template>
              </el-table-column>
              <el-table-column label="单价">
                <template slot-scope="scope">{{scope.row.price}}</template>
              </el-table-column>
              <el-table-column label="数量">
                <template slot-scope="scope">{{scope.row.count}}</template>
              </el-table-column>
              <el-table-column label="库存位置">
                <template slot-scope="scope">{{scope.row.stock_position}}</template>
              </el-table-column>
              <el-table-column label="入库时间">
                <template slot-scope="scope">{{scope.row.strorage_time}}</template>
              </el-table-column>
              <el-table-column label="入库时长">
                <template slot-scope="scope">{{scope.row.strorage_long}}</template>
              </el-table-column>
              <el-table-column label="预录状态">
                <template slot-scope="scope">{{scope.row.recorded_status}}</template>
              </el-table-column>
              <el-table-column label="出库状态">
                <template slot-scope="scope">{{scope.row.outbound_status}}</template>
              </el-table-column>
            </el-table>
            <div class="pages_wrap">
              <el-pagination class="pages fr" background :page-size="100" layout="total,prev, pager, next" :total="1000"></el-pagination>
            </div>
          </el-tab-pane>
          <!-- 账户明细 -->
          <el-tab-pane label="账户明细" name="fourth" class="tab_nocard">
            <finance_account_detail_person :show_look="false"></finance_account_detail_person>
          </el-tab-pane>
          <el-tab-pane label="积分明细" name="five" class="tab_nocard">
            <integral_details_show></integral_details_show>
          </el-tab-pane>
          <el-tab-pane label="冻结账户" name="six">
            <el-form :model="account_freeze" :rules="rules" ref="account_freeze" label-width="100px" class="account_freeze_ruleForm">
              <el-form-item label="冻结原因：" prop="reason">
                <el-select v-model="account_freeze.reason" placeholder="请选择">
                <el-option
                  v-for="item in freeze_reason_list"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              </el-form-item>
              <el-form-item label="冻结备注：" prop="desc">
                <el-input type="textarea" v-model="account_freeze.desc" :autosize="{ minRows: 20, maxRows: 30}"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('account_freeze')">提交</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>
<script>
import order_editor from '../order/order_editor.vue'
import finance_account_detail_person from '../finance/finance_account_detail_person.vue'
import integral_details_show from '../finance/integral_details_show.vue'
export default {
  name: "",
  data: () => ({
    activeName: 'first',
    cur_data:[],
    order_list:[{
      serial_number:'20088816416101',
      receiver:'陈信宏',
      phone:'138888888888',
      transport_type:'航空',
      order_time:'2018-04-18 18：15',
      remark:'有易碎品',
      status:'未确认',
    }],
    transport_type:'',
    transport_type_list:[{
      label:0,
      member:'航空'
    },{
      label:1,
      member:'海运'
    }],
    order_date:'',
    order_status:'',
    order_status_list:[{
      label:0,
      member:'已付款'
    },{
      label:1,
      member:'未付款'
    },{
      label:2,
      member:'未确认'
    },{
      label:3,
      member:'未计算'
    },{
      label:4,
      member:'未出库'
    },{
      label:5,
      member:'无效订单'
    },{
      label:6,
      member:'已完成'
    }],
    postal_code:'',
    express_company:'',
    express_company_list:[{
      label:0,
      member:'圆通'
    },{
      label:1,
      member:'申通'
    },{
      label:2,
      member:'天天'
    }],
    stock_position:'',
    stock_position_list:[{
      label:0,
      member:'圆通1'
    },{
      label:1,
      member:'圆通2'
    },{
      label:2,
      member:'圆通3'
    }],
    stock_date:'',//库存记录时间
    stock_list:[{
      storage_id:'20001',
      serial_number:'20088816416101',
      name:'cloths',
      price:'10.00',
      count:'1',
      stock_position:'圆通1',
      strorage_time:'2018-04-18 18：15',
      strorage_long:'5天',
      recorded_status:'已录',
      outbound_status:'未出库',
    }],
    freeze_reason_list:[{
      value:0,
      label:'拖欠贷款'
    },{
      value:1,
      label:'存在恶搞'
    },{
      value:2,
      label:'账户有异常'
    }],
    account_freeze: {
      reason: 0,
      desc:''
    },
    rules:{
      reason: [
        { required: true, message: '请选择活动资源', trigger: 'change' }
      ],
      desc: [
        { required: true, message: '请填写活动形式', trigger: 'blur' }
      ]
    },
  }),
  components: {
    order_editor,
    finance_account_detail_person,
    integral_details_show
  },
  watch:{
    '$route' (to,from){
      if(to.query.tab_name){
        this.activeName = to.query.tab_name;
      }else{
        this.activeName = 'first';
      }
    }
  },
  created() {
    //do something after creating vue instance
    this.cur_data = JSON.parse(sessionStorage.getItem('cur_data'));
    console.log(this.cur_data);
    if(this.$route.query.tab_name){
      this.activeName = this.$route.query.tab_name;
    }else{
      this.activeName = 'first';
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, this.$route);
      this.$router.push('/member_list/member_information?tab_name='+tab.name)
    },
    go_back(){
      this.$router.replace({path: '/member_list'});
    },
    show_detail(cur_list){
      this.$layer.iframe({
        title: '订单详情',
        shade: true,//是否显示遮罩
        content: {
          content: order_editor, //传递的组件对象
          parent: this,//当前的vue对象
          data:{tableData:cur_list.row,editor:false,not_released:false}//props
        },
        shadeClose: false,//点击遮罩是否关闭
        area:['60%','calc(80%)']
      });
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
