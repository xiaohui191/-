<template>
  <div id="xyh_content_istration">
    <div class="xyh_top"><h1 style=" padding-bottom: none; ">{{title}}</h1><span><el-button @click="Return()">返回列表</el-button></span></div>
    <div class="xyh_table">
        <div class="xyh_search">
          <el-form :model="form" ref="form" label-width="100px">
            <el-form-item label="广告名称 :" prop="name" :rules="{required: true, message: '广告名称不能为空', trigger: 'blur'}">
              <el-input v-model="form.name" style="width:300px"></el-input>
              <span class="xyh_span_text">广告名称只是作为辨别多个广告条目之用，并不显示在广告中</span>
            </el-form-item>
            <el-form-item label="广告位置 :">
              <el-select v-model="form.location" placeholder="请选择活动区域">
                <el-option label="PC首页轮播图" value="1"></el-option>
                <el-option label="PC新闻中心" value="2"></el-option>
                <el-option label="PC业务范围" value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="广告图片 :" class="xyh_ipone">
              <el-upload class="upload_demo" :action="uploadFile" :on-success="uploadSuccess" :before-upload="beforeAvatarUpload" :show-file-list='false' list-type="picture">
                <span class="xyh_img">
                  <img :src="form.image" alt="">
                </span>
                <div><el-button size="small" type="primary">点击上传</el-button></div>
                <span slot="tip" class="el_upload_tip">图片大小不能超过 2MB!</span>
              </el-upload>
            </el-form-item>
            <el-form-item label="排序 :" prop="sort">
              <el-input v-model="form.sort" style="width:50px"></el-input>
            </el-form-item>          
            <el-form-item label="是否显示 :">
              <el-switch v-model="form.status" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            </el-form-item> 
            <span class="xyh_submit"><el-button @click="submit('form')">提交保存</el-button></span>
          </el-form>
        </div>
    </div>
  </div>
</template>
<script>
import { advertising_add , uploadFile , modify} from '@/assets/api/xyh_api'
import '@/assets/scss/content_list.scss'
export default {
  data () {
      return {
          uploadFile:uploadFile(),    //  图片上传
          title:'新增广告',
          form: {
            name: '',
            sort:'',
            location: '',
            status:false,
            image:''
          },
      }
  },
  methods: {
      init(){
          this.type =  this.$route.query.type
          switch (Number(this.type)){
            case 1:
                this.title = '新增广告'
              break
            case 2:
                this.title = '编辑广告'
                this.exit();
              break
        }
      },
      // 数据回显
      exit(){
          this.form = JSON.parse(sessionStorage.getItem('key'));
          if(this.form.location == 'PC首页轮播图'){
            this.form.location = '1'
          }else if(this.form.location == 'PC新闻中心'){
            this.form.location = '2'
          }else if(this.form.location == 'PC业务范围'){
            this.form.location = '3'
          }
      },
       // 图片上传
      uploadSuccess(res){
        this.form.image = res.url;
      },
      // 上传图片限制
      beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2;
        this.img_loading = true;
        if (!isLt2M) {
            layer.msg('上传头像图片大小不能超过 2MB!',{time:1500})
            this.img_loading = false;
        }
        return isLt2M;
      },
      // 提交信息
      submit(formName){
        let this_ = this
        if(this.type == 1){   //  this.type 是判断 新增和编辑的
          if(this.form.status == true){
            this.form.status = 1
          }else if(this.form.status == false){
            this.form.status = 2
          }
          this.$refs[formName].validate((valid) => {    //表单  验证
            if (valid) {
              advertising_add(this.form).then(res=>{
                layer.msg('新增成功',{time:1500},function(){
                  this_.$router.push({path:'content_istration'})
                });                
              })
            } else {
              return false;
            }
          });
          if(this.form.status == 1){
            this.form.status = true
          }else if(this.form.status == 2){
            this.form.status = false
          }
        }else if(this.type == 2){
          this.$refs[formName].validate((valid) => {    //表单  验证
            if (valid) {
              if(this.form.status == true){
                this.form.status = 1
              }else if(this.form.status == false){
                this.form.status = 2
              }
              modify(this.form).then(res=>{
                layer.msg('编辑成功',{time:1500},function(){
                  this_.$router.push({path:'content_istration'})
                });               
              })
              if(this.form.status == 1){
                this.form.status = true
              }else if(this.form.status == 2){
                this.form.status = false
              }
            } else {
              return false;
            }
          }); 
        }
      },
      // 返回列表
      Return(){
          this.$router.push({path:'content_istration'})
      }
  },
  created(){
      this.init();
  },
}
</script>
<style scoped>
</style>