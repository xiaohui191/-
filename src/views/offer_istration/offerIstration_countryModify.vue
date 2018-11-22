<template>
  <div id="xyh_content_list_modify">  
      <el-form ref="form" :model="data" label-width="100px" class="xyh_table">
        <el-form-item :label="name" style="margin-right:20px;">
            <el-input v-model="data.name"></el-input>
        </el-form-item>
        <el-form-item label="申报总值" style="margin-right:20px;">
            <el-input v-model="data.zongzhi"></el-input>
        </el-form-item>
        <el-form-item label="分类排序" style="margin-right:20px;">
            <el-input v-model="data.sort"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">{{submit}}</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>
<script>
import { uploadFile} from '@/assets/api/xyh_api'
export default {
  props: ['id','modify_id'],
  data() {
      return {
        data:{    // 渲染内容
            name: '',
            zongzhi:'',
            sort:''
        },

        // 需要修改的参数
        name:'',    //名字按钮
        submit:'',      //编辑 新增按钮
      }
    },
    methods: {
        //  确定按钮
      onSubmit() {
        if(this.modify_id == 1){
            let add = ''
            if(this.id == 1)
                add = 1
            else if(this.id == 3)
                add = 3
            else if(this.id == 4)
                add = 4
            else if(this.id == 5)
                add = 5
            else if(this.id == 6)
                add = 6             //这一截样式可以替换 接口的调用  而参数则传  data 所有的数据都存在  而且后台不用怕 数据的多少
                
            this.$message({
              duration:1500,
              message: '新增成功',
              type: 'success',
          });
          this.$layer.closeAll()
        }else if(this.modify_id == 2){
            this.$message({
              duration:1500,
              message: '编辑成功',
              type: 'success',
          });
          this.$layer.closeAll()
        }
      },

      // 初始化
      init(){
          switch (this.id){
            case '1':
                this.name = '国家名称'
              break
            case '2':
                this.name = '企业名称'
              break
          };
          if(this.modify_id == 1)
            this.submit = "新增"
          else if(this.modify_id == 2)
            this.submit = "修改"
      },
    },
    created () {
        this.init();
    }
}
</script>
<style scoped>
    
</style>