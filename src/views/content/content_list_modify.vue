<template>
  <div id="xyh_content_list_modify">  
      <el-form ref="form" :model="data" label-width="100px" class="xyh_table">
        <el-form-item :label="name" prop="name" style="margin-right:30px;">
            <el-input v-model="data.name"></el-input>
        </el-form-item>
        <el-form-item label="品牌图片" v-if="id == 1" class="xyh_ipone" style="margin-right:30px;">
            <el-upload class="upload_demo" :action="uploadFile" :on-success="uploadSuccess" :before-upload="beforeAvatarUpload" :show-file-list='false' list-type="picture">
                <span class="xyh_img">
                    <img :src="data.image" alt="">
                </span>
                <div><el-button size="small" type="primary">点击上传</el-button></div>
                <span slot="tip" class="el_upload_tip">图片大小不能超过 2MB!</span>
            </el-upload>
        </el-form-item>
        <el-form-item label="名牌链接" v-if="id == 1"  style="margin-right:30px;">
            <el-input v-model="data.link"></el-input>
        </el-form-item>
        <el-form-item label="申报总值" v-if="id == 5"  style="margin-right:30px;">
            <el-input v-model="data.total_value"></el-input>
        </el-form-item>
        <el-form-item label="所属快递" v-if="id == 6"  style="margin-right:30px;">
            <el-select v-model="data.express_company" placeholder="请选择活动区域" style="width:100%">
                <el-option v-for="item in express" :key="item.id" :label="item.name" :value="item.name"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="分类排序"  style="margin-right:30px;">
            <el-input v-model="data.sort"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">{{submit}}</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>
<script>
import { uploadFile , express_list , express_add ,express_edit , warehouse_add , warehouse_edit , partner_add , partner_modify , nationality_add , nationality_modify , order_remark_add , order_remark_modify} from '@/assets/api/xyh_api'
export default {
  props: ['id','modify_id','look'],
  data() {
      return {
        uploadFile:uploadFile(),    //  图片上传  

        data:{    // 渲染内容
            name: '',
            image:'',               
            link:'',
            total_value:'',
            express_company:'',
            sort:''
        },

        // 需要修改的参数
        name:'',    //名字按钮
        submit:'',      //编辑 新增按钮

        add:'',     //新增
        express:[],
      }
    },
    methods: {
        //  确定按钮
      onSubmit() {
        if(this.modify_id == 1){
            if(this.id == 1)
                this.add = partner_add
            else if(this.id == 3)
                this.add = express_add
            else if(this.id == 4)
                this.add = order_remark_add
            else if(this.id == 5)
                this.add = nationality_add
            else if(this.id == 6){
                this.add = warehouse_add
            }
            this.add(this.data).then(res=>{
                layer.msg('新增成功',{time:1500});
                this.$layer.closeAll()
                this.$parent.init();
            })
        }else if(this.modify_id == 2){
            if(this.id == 1)
                this.add = partner_modify
            else if(this.id == 3)
                this.add = express_edit
            else if(this.id == 4)
                this.add = order_remark_modify
            else if(this.id == 5)
                this.add = nationality_modify
            else if(this.id == 6){
                this.add = warehouse_edit
            }
            this.add(this.data,{id:this.data.id}).then(res=>{
                layer.msg('编辑成功',{time:1500});
                this.$layer.closeAll()
                this.$parent.init();
            })
        }
      },

       // 图片上传
      uploadSuccess(res){
        this.data.image = res.url;
      },
      
      // 上传图片限制
      beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2;
        this.img_loading = true;
        if (!isLt2M) {
            layer.msg('上传头像图片大小不能超过 2MB!',{time:1500});
            this.img_loading = false;
        }
        return isLt2M;
      },

      // 初始化
      init(){
          switch (this.id){
            case '1':
                this.name = '品牌名称'
                this.modify_id == 2?this.look_():'';
              break
            case '3':
                this.name = '分类名称'
                this.modify_id == 2?this.look_():'';
              break
            case '4':
                this.name = '备注名称'
                this.modify_id == 2?this.look_():'';
              break
            case '5':
                this.name = '国家名称'
                this.modify_id == 2?this.look_():'';
              break
            case '6':
                this.name = '分类名称'
                this.modify_id == 2?this.look_():'';
                this.express_list();
              break
          };
          if(this.modify_id == 1)
            this.submit = "新增"
          else if(this.modify_id == 2)
            this.submit = "修改"
      },
    //回显
      look_(){
          this.data = this.look
      },
    //   快递公司名称
      express_list(){
          express_list().then(res=>{
              this.express = res.data
          })
      }
    },
    created () {
        this.init();
    }
}
</script>
<style scoped>
    
</style>