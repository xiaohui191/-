<template>
  <div id="xyh_content_list_modify">  
      <el-form ref="form" :model="form" label-width="100px" class="xyh_table">
        <el-form-item label="标题" class="xyh_Journalism" style="line-height:40px;">
            <span v-if="list_Journalism == 3">{{form.title}}</span>
            <el-input v-else v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="内容简介" class="xyh_Journalism" style="line-height:40px;">
            <span v-if="list_Journalism == 3">{{form.intro}}</span>
            <el-input type="textarea" v-else :rows="5" v-model="form.intro"></el-input>
        </el-form-item>
        <el-form-item label="选择分类" style="line-height:40px;">
            <span v-if="list_Journalism == 3">{{form.type}}</span>
            <el-select v-else v-model="form.type" placeholder="请选择活动区域" >
                <el-option label="公司新闻" value="1"></el-option>
                <el-option label="行业状态" value="2"></el-option>
                <el-option label="货运常识" value="3"></el-option>
                <el-option label="会员帮助" value="4"></el-option>
                <el-option label="其他帮助" value="5"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="推荐首页" style="line-height:40px;">
          <span v-if="list_Journalism == 3">{{form.is_recommend == 1?'是':'否'}}</span>          
          <el-radio-group v-else v-model="form.is_recommend">
            <el-radio :label="data.id" :key="data.id" v-for="data in recom">{{data.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="内容详情">
            <span v-if="list_Journalism == 3" style="line-height:40px;" v-html="form.content"></span>
            <VueUEditor v-else @ready="editorReady"></VueUEditor>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">{{submit}}</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>
<script>
import { news_add , news_modify} from '@/assets/api/xyh_api'
import VueUEditor from 'vue-ueditor'
export default {
  props: ['id','list_Journalism'],
  data() {
      return {
        form: {
          title: '',
          is_recommend:'1',
          type:'1',
          intro:'',
          content:''
        },

        // 需要修改的参数
        submit:'',      //编辑 新增按钮

        // 推荐首页 是否
        recom:[{
          id:'1',
          label:'是'
        },{
          id:'2',
          label:'否'
        }]
      }
    },
    methods: {
        //  确定按钮
      onSubmit() {
        if(this.list_Journalism == 1){    //新增完成
          news_add(this.form).then(res=>{
            layer.msg('新增成功',{time:1500});
            this.$layer.closeAll();
            this.$parent.init();
          })
        }else if(this.list_Journalism == 2){  //编辑
            news_modify(this.form).then(res=>{
              layer.msg('修改成功',{time:1500});
              this.$layer.closeAll()
              this.$parent.init();
            })
        }else if(this.list_Journalism == 3){  //查看
          this.$layer.closeAll()
        }
      },
      // 初始化
      init(){
          switch (this.list_Journalism){
            case '1':               
                this.submit = '新增'
              break
            case '2':               
                this.submit = '保存'
              break
            case '3':          
                this.submit = '确定'
              break
          };
          if(this.list_Journalism == 1)
            this.submit = "新增"
          else if(this.list_Journalism == 2){
            this.submit = "修改"
            this.look();
            
          }
          else if(this.list_Journalism == 3){
            this.submit = '确定'
            this.look()
          }
      },
      // 获取公告内容方法
      editorReady(editorInstance){
        editorInstance.setHeight(200)
        editorInstance.setContent(this.form.content)
        editorInstance.addListener('contentChange',() => {
          this.form.content = editorInstance.getContent()
        })
      },
      // 查看数据 渲染
      look(){
        this.form = this.id
        console.log(this.form);
      },
    },
    created () {
        this.init();
    },
    components: {
      VueUEditor
    }
}
</script>
<style scoped="">
    
</style>