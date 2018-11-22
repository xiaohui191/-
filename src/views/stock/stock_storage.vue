<template>
  <div id="stock_storage">
    <div class="main_wrap">
      <el-card class="box-card">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="快递类型：" prop="express_type">
            <el-select v-model="ruleForm.region" placeholder="请选择快递方式">
              <el-option label="申通" value="0"></el-option>
              <el-option label="EMS" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择库存：" prop="stock_type">
            <el-select v-model="ruleForm.region" placeholder="请选择库存">
              <el-option label="综合1" value="0"></el-option>
              <el-option label="综合2" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="扫描单号：" prop="scan_number">
            <el-input type="text" v-model.number="ruleForm.scan_number" auto-complete="off" style="width:217px"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即添加</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  name: "stock_storage",
  data(){
    var num_english = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入单号！'));
        } else if(!/^[a-z0-9_-]{10,15}$/.test(this.ruleForm.scan_number)){
            callback(new Error('请输入10-15位字母或数字的正确单号！'));
        }else{
          callback();
        }
      };
      return{
        ruleForm: {
          express_type: '',
          stock_type: '',
          scan_number:''
        },
        rules: {
          express_type: [
            { required: true, message: '请选择快递类型', trigger: 'change' }
          ],
          stock_type: [
            { required: true, message: '请选择库存', trigger: 'change' }
          ],
          scan_number:[
            {validator: num_english, trigger: 'blur'},
            { required: true, message: '单号不能为空'}
          ]
        }
      }
  },
  methods: {
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
