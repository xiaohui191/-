<template>
  <div id="member_order_record">
    <div class="main_wrap">
      <el-card class="box-card col_text_r">
        <div slot="header" class="clearfix">
          <span>订单信息</span>
        </div>
        <el-row :gutter="20" class="header-bar flex-middle" type="flex">
          <el-col :span="3">订单流水号：</el-col>
          <el-col :span="21"><img src="https://d2v8ggac1o0f6z.cloudfront.net/gsc/DDIF15/96/87/e1/9687e1488c3d4b89a8b9149422660fb2/images/支付明细详情/u5290.png?token=b4175905aeb85df7e1e0bca5802ed320" alt=""></el-col>
        </el-row>
        <el-row :gutter="20" class="header-bar">
          <el-col :span="3">下单人：</el-col>
          <el-col :span="21">林某某</el-col>
        </el-row>
        <el-row :gutter="20" class="header-bar">
          <el-col :span="3">收货人：</el-col>
          <el-col :span="21">林某某</el-col>
        </el-row>
        <el-row :gutter="20" class="header-bar">
          <el-col :span="3">收货地址：</el-col>
          <el-col :span="21">广东省广州市天河区保利中宇广场</el-col>
        </el-row>
        <el-row :gutter="20" class="header-bar">
          <el-col :span="3">联系电话：</el-col>
          <el-col :span="21">802546123</el-col>
        </el-row>
        <el-row :gutter="20" class="header-bar">
          <el-col :span="3">国家与地区：</el-col>
          <el-col :span="21">南非</el-col>
        </el-row>
        <el-row :gutter="20" class="header-bar">
          <el-col :span="3">相关备注：</el-col>
          <el-col :span="21">有易碎品</el-col>
        </el-row>
        <el-row :gutter="20" class="header-bar">
          <el-col :span="3">运输方式：</el-col>
          <el-col :span="21">航空</el-col>
        </el-row>
      </el-card>
      <!-- 快递单号 -->
      <el-card class="box-card col_text_r">
        <div slot="header" class="clearfix">
          <span>快递单号</span>
        </div>
        <el-row :gutter="20" class="header-bar" v-for="(item,index) in express_delivery_list" :key="index">
          <el-col :span="3">{{item.number}}</el-col>
          <el-col :span="2">{{item.place}}</el-col>
          <el-col :span="2" v-if="editor"><el-button size="mini" type="danger" @click="express_delivery(item)">删除</el-button></el-col>
        </el-row>
      </el-card>
      <!-- 相关费用 -->
      <el-card class="box-card col_text_r order_list" v-if="order_type!=1 && (editor || not_released)">
        <div slot="header" class="clearfix">
          <span>相关费用</span>
        </div>
        <el-form :model="fee_list" :rules="fee_rules" ref="fee_list" label-width="120px">
          <el-row :gutter="20" class="header-bar">
            <el-col :span="6">
              <el-form-item label="重量(kg)：" prop="weight">
                <span v-if="not_released">{{fee_list.weight}}</span>
                <el-input type="number" v-model.number="fee_list.weight" v-else></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="体积：" prop="volume">
                <span v-if="not_released">{{fee_list.volume}}</span>
                <el-input type="number" v-model.number="fee_list.volume" v-else></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="运费：" prop="freight">
                <span v-if="not_released">{{fee_list.freight}}</span>
                <el-input type="number" v-model.number="fee_list.freight" v-else></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="附加费：" prop="additional_fee">
                <span v-if="not_released">{{fee_list.additional_fee}}</span>
                <el-input type="number" v-model.number="fee_list.additional_fee" v-else></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="header-bar">
            <el-col :span="6">
              <el-form-item label="总计费用：" prop="total_fee">
                <span v-if="not_released">{{fee_list.total_fee}}</span>
                <el-input type="number" v-model.number="fee_list.total_fee" v-else></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="成本：" prop="cost">
                <span v-if="not_released">{{fee_list.total_fee}}</span>
                <el-input type="number" v-model.number="fee_list.cost" v-else></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="到付费用：" prop="arrival_fee">
                <span v-if="not_released">{{fee_list.arrival_fee}}</span>
                <el-input type="number" v-model.number="fee_list.arrival_fee" v-else></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="header-bar">
            <el-col :span="12">
              <el-form-item label="备注：" prop="desc">
                <span v-if="not_released">{{fee_list.desc}}</span>
                <el-input type="textarea" v-model="fee_list.desc" :autosize="{ minRows: 20, maxRows: 30}" v-else></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
      <!-- 订单操作 -->
      <el-card class="box-card order_list" v-if="editor">
        <div slot="header" class="clearfix">
          <span>订单操作</span>
        </div>
        <el-form :model="account_freeze" :rules="rules" ref="account_freeze" label-width="170px">
          <el-row :gutter="20" class="header-bar">
            <el-col :span="6" v-if="order_type!=1">
              <el-form-item label="订单状态：">
                已确认
              </el-form-item>
            </el-col>
            <el-col :span="6" v-if="order_type!=1">
              <el-form-item label="费用状态：" prop="desc">
                <el-select v-model="account_freeze.fee" placeholder="请选择">
                  <el-option label="未计算" value="0"></el-option>
                  <el-option label="已计算" value="1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="订单状态：" prop="status" v-if="tableData.status!='已入账' && order_type==1">
            <el-select v-model="account_freeze.status" placeholder="请选择">
              <el-option
                v-for="item in status_list"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="账户金额：">
            <el-col :span="21">{{account_freeze.money}}</el-col>
          </el-form-item>
          <el-row :gutter="20" class="header-bar">
            <el-col :span="6">
              <el-form-item label="国际物流单号：" prop="number">
                <el-input v-model="account_freeze.number"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6" v-if="order_type!=1">
              <el-form-item label="付款流水号：" prop="pay_number">
                <el-input v-model="account_freeze.pay_number"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="备注：" prop="desc">
            <el-col :span="10"><el-input type="textarea" v-model="account_freeze.desc" :autosize="{ minRows: 20, maxRows: 30}"></el-input></el-col>
          </el-form-item>
        </el-form>
      </el-card>
      <el-card class="box-card order_list" v-if="not_released">
        <div slot="header" class="clearfix">
          <span>订单操作</span>
        </div>
        <el-form :model="account_freeze" :rules="rules" ref="account_freeze" label-width="170px">
          <el-form-item label="订单状态：">
            {{account_freeze.status}}
          </el-form-item>
          <el-form-item label="审核状态：">
            {{account_freeze.status}}
          </el-form-item>
          <el-form-item label="费用状态：">
            {{account_freeze.status}}
          </el-form-item>
          <el-form-item label="付费状态：">
            {{account_freeze.status}}
          </el-form-item>
          <el-form-item label="国际物流单号：">
            {{account_freeze.status}}
          </el-form-item>
          <el-form-item label="付款流水账：">
            {{account_freeze.status}}
          </el-form-item>
          <el-form-item label="管理员备注：">
            {{account_freeze.desc}}
          </el-form-item>
        </el-form>
      </el-card>
      <el-card class="box-card col_text_r">
        <div slot="header" class="clearfix">
          <span>产品信息</span>
        </div>
        <el-table
          :data="integral_list"
          style="width: 100%">
          <el-table-column label="产品名称">
            <template slot-scope="scope">{{scope.row.storage_id}}</template>
          </el-table-column>
          <el-table-column label="产品单价">
            <template slot-scope="scope">{{scope.row.serial_number}}</template>
          </el-table-column>
          <el-table-column label="产品数量">
            <template slot-scope="scope">{{scope.row.name}}</template>
          </el-table-column>
          <el-table-column label="所属快递号">
            <template slot-scope="scope">{{scope.row.price}}</template>
          </el-table-column>
        </el-table>
        <div class="clearfix total_money">
          <span class="fr">总价值：￥18.00</span>
        </div>
      </el-card>
    </div>
    <div class="text_c" v-if="editor">
      <el-button type="primary" @click="submitForm('account_freeze','fee_list')">保存</el-button>
    </div>
{{tableData}}
  </div>
</template>
<script>
export default {
  name: "member_order_record",
  data(){
    var num_english = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入物流单号！'));
        } else if(!/^[a-z0-9_-]{10,15}$/.test(this.account_freeze.number)){
            callback(new Error('请输入正确单号！'));
        }else{
          callback();
        }
      };
      var pay_number = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入付款流水号！'));
          } else if(!/^[a-z0-9_-]{10,15}$/.test(this.account_freeze.number)){
              callback(new Error('请输入正确单号！'));
              // callback(new Error('请输入10-15位字母或数字的正确单号！'));
          }else{
            callback();
          }
        };
      return{
        order_type:'',
        integral_list:[{
          storage_id:'cloth',
          serial_number:'3.00',
          name:'21',
          price:'4999982312323',
        }],
        express_delivery_list:[{
          number:'4999982312323',
          place:'圆通1'
        },{
          number:'4999982312323',
          place:'圆通2'
        }],
        status_list:[{
          value:0,
          label:'未确认'
        },{
          value:1,
          label:'已确认'
        },{
          value:2,
          label:'无效单'
        }],
        account_freeze: {
          status:0,
          money:'￥100.00',
          number:'',
          fee:'',
          pay_number:'',
          desc:''
        },
        fee_list:{
          weight:'',
          volume:'',
          freight:'',
          additional_fee:'',
          total_fee:'',
          cost:'',
          arrival_fee:'',
          desc:''
        },
        fee_rules:{
          weight:[
            { required: true, message: '重量不能为空'},
            { type: 'number', message: '重量必须为数字值'}
          ],
          volume:[
            { required: true, message: '体积不能为空'},
            { type: 'number', message: '体积必须为数字值'}
          ],
          freight:[
            { required: true, message: '运费不能为空'},
            { type: 'number', message: '运费必须为数字值'}
          ],
          additional_fee:[
            { required: true, message: '附加费不能为空'},
            { type: 'number', message: '附加费必须为数字值'}
          ],
          total_fee:[
            { required: true, message: '总计费用不能为空'},
            { type: 'number', message: '总计费用必须为数字值'}
          ],
          cost:[
            { required: true, message: '成本不能为空'},
            { type: 'number', message: '成本必须为数字值'}
          ],
          arrival_fee:[
            { required: true, message: '到付费用不能为空'},
            { type: 'number', message: '到付费用必须为数字值'}
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        },
        rules:{
          status: [
            { required: true, message: '请选择状态', trigger: 'change' }
          ],
          number: [
            {validator: num_english, trigger: 'blur'},
            { required: true, message: '请输入物流单号', trigger: 'change' }
          ],
          pay_number:[
            {validator: pay_number, trigger: 'blur'},
            { required: true, message: '请输入付款流水号', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写备注', trigger: 'blur' }
          ]
        }
      }
  },
  props: ['tableData','editor','not_released'],
  created() {
    //do something after creating vue instance
    this.order_type = this.$parent.order_type;
    console.log('editor:'+this.editor,'order_type:'+this.$parent.order_type,'not_released:'+this.not_released);
  },
  methods:{
    express_delivery(cur_list){
      console.log(cur_list);
    },
    submitForm(formName,formName_one) {
      this.$refs[formName_one].validate((valid) => {
        if (valid) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              alert('submit!');
            } else {
              console.log('error submit!!');
              return false;
            }
          });
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
