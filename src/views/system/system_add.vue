<template>
  <div id="system_add">
      <el-form ref="data" :model="data" label-width="100px" class="xyh_table" :rules="rules2">
        <el-form-item label="登录名称" prop="username" class="xyh_name">
            <el-input type="text" v-model="data.username"></el-input>
        </el-form-item>
        <span>英文字母，请注意大小写</span>
        <el-form-item label="登录密码" prop="password" class="xyh_name">
            <el-input type="password" v-model="data.password"></el-input>
        </el-form-item>
        <span>6-16位，字母、字符、数字</span>
        <el-form-item label="确认密码" prop="notarizePassword" class="xyh_name">
            <el-input type="password" v-model="data.notarizePassword"></el-input>
        </el-form-item>
        <span>请重复输入登录密码</span>
        <el-form-item label="真实姓名" prop="zsname" class="xyh_name">
            <el-input type="text" v-model="data.zsname"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="age" class="xyh_name" v-if="id != 2">
            <el-input type="text" v-model="data.age"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="age" class="xyh_name" v-if="id != 2">
            <template>
                <el-radio v-model="data.radio" label="1">男</el-radio>
                <el-radio v-model="data.radio" label="2">女</el-radio>
            </template>
        </el-form-item>
        <el-form-item label="状态" prop="age" class="xyh_name">
            <template>
                <el-radio v-model="data.status" label="1">正常</el-radio>
                <el-radio v-model="data.status" label="2">冻结</el-radio>
            </template>
        </el-form-item>
        <el-form-item label="后台权限" prop="age" class="age" v-if=" id == 2">
            <el-checkbox v-model="data.checked_all">内容管理</el-checkbox>
            <div class="age_">
                <div>
                    <el-checkbox v-model="data.checked_all"  style="width:120px; margin-left:0px;">广告管理</el-checkbox>
                    <el-checkbox v-model="data.checked_all"  style="width:120px; margin-left:0px;">添加或编辑</el-checkbox>
                    <el-checkbox v-model="data.checked_all"  style="width:120px; margin-left:0px;">删除</el-checkbox>
                </div>
                <div>
                    <el-checkbox v-model="data.checked_all"  style="width:120px; margin-left:0px;">合作伙伴</el-checkbox>
                    <el-checkbox v-model="data.checked_all"  style="width:120px; margin-left:0px;">添加或编辑</el-checkbox>
                    <el-checkbox v-model="data.checked_all"  style="width:120px; margin-left:0px;">删除</el-checkbox>
                </div>
                <div>
                    <el-checkbox v-model="data.checked_all"  style="width:120px; margin-left:0px;">新闻管理</el-checkbox>
                    <el-checkbox v-model="data.checked_all"  style="width:120px; margin-left:0px;">添加或编辑</el-checkbox>
                    <el-checkbox v-model="data.checked_all"  style="width:120px; margin-left:0px;">删除</el-checkbox>
                </div>
                <div>
                    <el-checkbox v-model="data.checked_all"  style="width:120px; margin-left:0px;">快递公司</el-checkbox>
                    <el-checkbox v-model="data.checked_all"  style="width:120px; margin-left:0px;">添加或编辑</el-checkbox>
                    <el-checkbox v-model="data.checked_all"  style="width:120px; margin-left:0px;">删除</el-checkbox>
                </div>
                <div>
                    <el-checkbox v-model="data.checked_all"  style="width:120px; margin-left:0px;">下单备注</el-checkbox>
                    <el-checkbox v-model="data.checked_all"  style="width:120px; margin-left:0px;">添加或编辑</el-checkbox>
                    <el-checkbox v-model="data.checked_all"  style="width:120px; margin-left:0px;">删除</el-checkbox>
                </div>
                <div>
                    <el-checkbox v-model="data.checked_all"  style="width:120px; margin-left:0px;">国家分类</el-checkbox>
                    <el-checkbox v-model="data.checked_all"  style="width:120px; margin-left:0px;">添加或编辑</el-checkbox>
                    <el-checkbox v-model="data.checked_all"  style="width:120px; margin-left:0px;">删除</el-checkbox>
                </div>
                <div>
                    <el-checkbox v-model="data.checked_all"  style="width:120px; margin-left:0px;">仓库设置</el-checkbox>
                    <el-checkbox v-model="data.checked_all"  style="width:120px; margin-left:0px;">添加或编辑</el-checkbox>
                    <el-checkbox v-model="data.checked_all"  style="width:120px; margin-left:0px;">删除</el-checkbox>
                </div>
            </div>
            <el-checkbox v-model="data.checked_all"  style="width:120px; margin-left:0px;">会员管理</el-checkbox>
            <div class="age_">
                <div>
                    <el-checkbox v-model="data.checked_all"  style="width:120px; margin-left:0px;">会员列表</el-checkbox>
                    <el-checkbox v-model="data.checked_all"  style="width:120px; margin-left:0px;">冻结会员</el-checkbox>
                    <el-checkbox v-model="data.checked_all"  style="width:90px; margin-left:0px;">查看</el-checkbox>
                    <el-checkbox v-model="data.checked_all"  style="width:120px; margin-left:0px;">删除</el-checkbox>
                </div>
            </div>
            <el-checkbox v-model="data.checked_all"  style="width:120px; margin-left:0px;">财务管理</el-checkbox>
            <div class="age_">
                <div>
                    <el-checkbox v-model="data.checked_all"  style="width:120px; margin-left:0px;">汇款确认</el-checkbox>
                    <el-checkbox v-model="data.checked_all"  style="width:120px; margin-left:0px;">账户充值</el-checkbox>
                    <el-checkbox v-model="data.checked_all"  style="width:90px; margin-left:0px;">查看</el-checkbox>
                </div>
            </div>
            <el-checkbox v-model="data.checked_all"  style="width:120px; margin-left:0px;">库存管理</el-checkbox>
            <div class="age_">
                <div>
                    <el-checkbox v-model="data.checked_all"  style="width:120px; margin-left:0px;">入库订单号</el-checkbox>
                    <el-checkbox v-model="data.checked_all"  style="width:90px; margin-left:0px;">添加</el-checkbox>
                    <el-checkbox v-model="data.checked_all"  style="width:90px; margin-left:0px;">查看</el-checkbox>
                    <el-checkbox v-model="data.checked_all"  style="width:120px; margin-left:0px;">删除</el-checkbox>
                </div>
                <div>
                    <el-checkbox v-model="data.checked_all"  style="width:120px; margin-left:0px;">未领入库</el-checkbox>
                    <el-checkbox v-model="data.checked_all"  style="width:90px; margin-left:0px;">查看</el-checkbox>
                    <el-checkbox v-model="data.checked_all"  style="width:120px; margin-left:0px;">删除</el-checkbox>
                </div>
            </div>
            <el-checkbox v-model="data.checked_all"  style="width:120px; margin-left:0px;">报价管理</el-checkbox>
            <div class="age_">
                <div>
                    <el-checkbox v-model="data.checked_all"  style="width:120px; margin-left:0px;">利润方案</el-checkbox>
                    <el-checkbox v-model="data.checked_all"  style="width:120px; margin-left:0px;">添加或编辑</el-checkbox>
                    <el-checkbox v-model="data.checked_all"  style="width:90px; margin-left:0px;">查看</el-checkbox>
                    <el-checkbox v-model="data.checked_all"  style="width:120px; margin-left:0px;">删除</el-checkbox>
                </div>
                <div>
                    <el-checkbox v-model="data.checked_all"  style="width:120px; margin-left:0px;">国家管理</el-checkbox>
                    <el-checkbox v-model="data.checked_all"  style="width:120px; margin-left:0px;">添加或编辑</el-checkbox>
                    <el-checkbox v-model="data.checked_all"  style="width:90px; margin-left:0px;">查看</el-checkbox>
                    <el-checkbox v-model="data.checked_all"  style="width:120px; margin-left:0px;">删除</el-checkbox>
                </div>
                <div>
                    <el-checkbox v-model="data.checked_all"  style="width:120px; margin-left:0px;">快递企业</el-checkbox>
                    <el-checkbox v-model="data.checked_all"  style="width:120px; margin-left:0px;">添加或编辑</el-checkbox>
                    <el-checkbox v-model="data.checked_all"  style="width:90px; margin-left:0px;">查看</el-checkbox>
                    <el-checkbox v-model="data.checked_all"  style="width:120px; margin-left:0px;">删除</el-checkbox>
                </div>
                <div>
                    <el-checkbox v-model="data.checked_all"  style="width:120px; margin-left:0px;">报价渠道</el-checkbox>
                    <el-checkbox v-model="data.checked_all"  style="width:120px; margin-left:0px;">添加或编辑</el-checkbox>
                    <el-checkbox v-model="data.checked_all"  style="width:90px; margin-left:0px;">查看</el-checkbox>
                    <el-checkbox v-model="data.checked_all"  style="width:120px; margin-left:0px;">删除</el-checkbox>
                </div>
                <div>
                    <el-checkbox v-model="data.checked_all"  style="width:120px; margin-left:0px;">货物类别</el-checkbox>
                    <el-checkbox v-model="data.checked_all"  style="width:120px; margin-left:0px;">添加或编辑</el-checkbox>
                    <el-checkbox v-model="data.checked_all"  style="width:90px; margin-left:0px;">查看</el-checkbox>
                    <el-checkbox v-model="data.checked_all"  style="width:120px; margin-left:0px;">删除</el-checkbox>
                </div>
                <div>
                    <el-checkbox v-model="data.checked_all"  style="width:120px; margin-left:0px;">物品类别</el-checkbox>
                    <el-checkbox v-model="data.checked_all"  style="width:120px; margin-left:0px;">添加或编辑</el-checkbox>
                    <el-checkbox v-model="data.checked_all"  style="width:90px; margin-left:0px;">查看</el-checkbox>
                    <el-checkbox v-model="data.checked_all"  style="width:120px; margin-left:0px;">删除</el-checkbox>
                </div>
                <div>
                    <el-checkbox v-model="data.checked_all"  style="width:120px; margin-left:0px;">分区管理</el-checkbox>
                    <el-checkbox v-model="data.checked_all"  style="width:120px; margin-left:0px;">添加或编辑</el-checkbox>
                    <el-checkbox v-model="data.checked_all"  style="width:90px; margin-left:0px;">查看</el-checkbox>
                    <el-checkbox v-model="data.checked_all"  style="width:120px; margin-left:0px;">删除</el-checkbox>
                </div>
                <div>
                    <el-checkbox v-model="data.checked_all"  style="width:120px; margin-left:0px;">报价列表</el-checkbox>
                    <el-checkbox v-model="data.checked_all"  style="width:120px; margin-left:0px;">添加或编辑</el-checkbox>
                    <el-checkbox v-model="data.checked_all"  style="width:90px; margin-left:0px;">查看</el-checkbox>
                    <el-checkbox v-model="data.checked_all"  style="width:120px; margin-left:0px;">删除</el-checkbox>
                </div>
                <div>
                    <el-checkbox v-model="data.checked_all"  style="width:120px; margin-left:0px;">报价导出</el-checkbox>
                    <el-checkbox v-model="data.checked_all"  style="width:120px; margin-left:0px;">添加或编辑</el-checkbox>
                    <el-checkbox v-model="data.checked_all"  style="width:90px; margin-left:0px;">查看</el-checkbox>
                    <el-checkbox v-model="data.checked_all"  style="width:120px; margin-left:0px;">删除</el-checkbox>
                </div>
            </div>
            <el-checkbox v-model="data.checked_all"  style="width:120px; margin-left:0px;">订单管理</el-checkbox>
            <div class="age_">
                <div>
                    <el-checkbox v-model="data.checked_all"  style="width:120px; margin-left:0px;">入库订单号</el-checkbox>
                    <el-checkbox v-model="data.checked_all"  style="width:90px; margin-left:0px;">查看</el-checkbox>
                    <el-checkbox v-model="data.checked_all"  style="width:120px; margin-left:0px;">删除</el-checkbox>
                </div>
                <div>
                    <el-checkbox v-model="data.checked_all"  style="width:120px; margin-left:0px;">未计算订单</el-checkbox>
                    <el-checkbox v-model="data.checked_all"  style="width:90px; margin-left:0px;">查看</el-checkbox>
                    <el-checkbox v-model="data.checked_all"  style="width:120px; margin-left:0px;">删除</el-checkbox>
                </div>
                <div>
                    <el-checkbox v-model="data.checked_all"  style="width:120px; margin-left:0px;">未付款订单</el-checkbox>
                    <el-checkbox v-model="data.checked_all"  style="width:90px; margin-left:0px;">查看</el-checkbox>
                    <el-checkbox v-model="data.checked_all"  style="width:120px; margin-left:0px;">删除</el-checkbox>
                </div>
                <div>
                    <el-checkbox v-model="data.checked_all"  style="width:120px; margin-left:0px;">打印订单</el-checkbox>
                    <el-checkbox v-model="data.checked_all"  style="width:90px; margin-left:0px;">查看</el-checkbox>
                    <el-checkbox v-model="data.checked_all"  style="width:120px; margin-left:0px;">删除</el-checkbox>
                </div>
                <div>
                    <el-checkbox v-model="data.checked_all"  style="width:120px; margin-left:0px;">未出库订单</el-checkbox>
                    <el-checkbox v-model="data.checked_all"  style="width:90px; margin-left:0px;">查看</el-checkbox>
                    <el-checkbox v-model="data.checked_all"  style="width:120px; margin-left:0px;">删除</el-checkbox>
                </div>
                <div>
                    <el-checkbox v-model="data.checked_all"  style="width:120px; margin-left:0px;">已出库订单</el-checkbox>
                    <el-checkbox v-model="data.checked_all"  style="width:90px; margin-left:0px;">查看</el-checkbox>
                    <el-checkbox v-model="data.checked_all"  style="width:120px; margin-left:0px;">删除</el-checkbox>
                </div>
                <div>
                    <el-checkbox v-model="data.checked_all"  style="width:120px; margin-left:0px;">无效订单</el-checkbox>
                    <el-checkbox v-model="data.checked_all"  style="width:90px; margin-left:0px;">查看</el-checkbox>
                    <el-checkbox v-model="data.checked_all"  style="width:90px; margin-left:0px;">编辑</el-checkbox>
                    <el-checkbox v-model="data.checked_all"  style="width:120px; margin-left:0px;">删除</el-checkbox>
                </div>
            </div>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit('data')">提交保存</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>
<script>
import {administrator_add,administrator_update} from '@/assets/api/api.js';
export default {
  props: ['id','modify_id','curData'],
  data() {
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.data.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        data:{    // 渲染内容
            username:'',
            password:'',
            notarizePassword:'',
            zsname:'',
            age:'',
            radio:'1',
            status:'1',
            checked_all:''
        },
        rules2: {
            notarizePassword: [
                { validator: validatePass2, required: true, trigger: 'blur' }
            ],
            password:[
                { required: true, message: '登录密码不能为空', trigger: 'blur'},
                { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
            ],
            username:[
                { required: true, message: '登录名称不能为空', trigger: 'blur'}
            ],
            zsname:[
                { required: true, message: '真实姓名不能为空', trigger: 'blur'}
            ]
        }
        // 需要修改的参数
      }
    },
    methods: {
        //  确定按钮
        sub_ok(){
          if(this.modify_id==1){
            this.$message({
                  duration:1500,
                  message: '新增成功',
                  type: 'success',
              });
          }else{
            this.$message({
                duration:1500,
                message: '编辑成功',
                type: 'success',
            });
          }
          this.$layer.closeAll();
          this.$parent.init();
        },
      onSubmit(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              let fun = '';
              if(this.modify_id==1){
                fun = administrator_add;
              }else{
                fun = administrator_update;
              }
              switch (this.id) {
                case '1':
                  console.log('11111111');
                  break;
                case '2':
                  fun(this.data).then(res => {
                    console.log(res);
                    this.sub_ok();
                  })
                  break;
                case '3':

                  console.log('33333');
                  break;
              }
            } else {
                console.log('error submit!!');
                return false;
            }
          });
      },
      // 初始化
      init(){
          console.log(this.id);
      },
    },
    created () {
      if(this.modify_id==2){
        this.data.username = this.curData.username;
        this.data.zsname = this.curData.zsname;
        this.data.status = this.curData.status;
        this.data.id = this.curData.id;
        console.log(this.curData);
      }
        this.init();
    }
}
</script>
<style scoped>

</style>
