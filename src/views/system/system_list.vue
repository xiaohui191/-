<template>
  <div id="system_list">
    <div class="xyh_top"><h1 v-if="type != 4">{{title}}管理</h1><h1 v-else>系统日志</h1></div>
    <div class="xyh_table">
        <div class="xyh_search">
            <el-input placeholder="请输入关键词搜索" class="input_time" v-model="search.Key_word" style="width:300px;cursor:pointer;" v-if="type != 2 && type != 4">
                <el-button slot="append" @click="sou()">搜索</el-button>
            </el-input>
            <span v-if="type == 4">
                <span class="title_form">操作员</span>
                <el-select v-model="search.select" placeholder="请选择操作员"  class="input_ input_time">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </span>
            <span v-if="type == 4">
                <el-date-picker v-model="search.start_time" class="input_time" type="date" placeholder="开始时间" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
                <span class="title_form">至</span>
                <el-date-picker v-model="search.start_time" class="input_time" type="date" placeholder="结束时间" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
            </span>
            <span v-if="type == 1 || type == 3">
                <span class="title_form">状态：</span>
                <el-select v-model="search.select" placeholder="请选择状态"  class="input_ input_time">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </span>
            <el-button @click="empty()" v-if="type != 2">清空</el-button>
            <el-button @click="modify(1)" v-if="type != 4" style="float:right">添加{{people}}</el-button>
            <el-button v-if="type == 4" style="float:right">清除日志记录</el-button>
        </div>
        <el-table :data="tableData" style="width: 100%" class="table">
            <el-table-column :label="name" align="center">
                <template slot-scope="scope">{{scope.row.username}}</template>
            </el-table-column>
            <el-table-column label="真实姓名" align="center" v-if="type != 4" key="name">
                <template slot-scope="scope">{{scope.row.zsname}}</template>
            </el-table-column>
            <el-table-column label="手机号码" align="center" v-if="type == 1 || type == 3" key="age">
                <template slot-scope="scope">{{scope.row.age}}</template>
            </el-table-column>
            <el-table-column label="超级管理员" align="center" v-if="type == 2" key="admin">
                <template slot-scope="scope">{{scope.row.is_admin==1?'是':'否'}}</template>
            </el-table-column>
            <el-table-column label="角色说明" align="center" v-if="type == 2" key="explain">
                <template slot-scope="scope">{{scope.row.role_explain}}</template>
            </el-table-column>
            <el-table-column label="创建时间" align="center" v-if="type == 2" key="time">
                <template slot-scope="scope">{{scope.row.add_time}}</template>
            </el-table-column>
            <el-table-column label="状态" align="center" v-if="type != 4" key="state">
                <template slot-scope="scope">{{scope.row.status==1?'正常':'冻结'}}</template>
            </el-table-column>
            <el-table-column label="操作日期" align="center" v-if="type == 4" key="operation_time">
                <template slot-scope="scope">{{scope.row.operation_time}}</template>
            </el-table-column>
            <el-table-column label="操作记录" align="center" v-if="type == 4" key="operation_record">
                <template slot-scope="scope">{{scope.row.operation_record}}</template>
            </el-table-column>
            <el-table-column label="操作" align="center" key="operation" v-if="type != 4">
                <template slot-scope="scope">
                    <el-button size="small" @click="modify(2,scope.row)">编辑</el-button>
                    <el-button size="small" @click="del(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <div class="paging" v-if="Number(pages.total)">
        <el-pagination
        background :page-size="Number(pages.page_size)" layout="total,prev, pager, next"
         @current-change="init"
        :total="Number(pages.total)"></el-pagination>
    </div>
  </div>
</template>
<script>
import {administrator_get,administrator_update,administrator_del} from '@/assets/api/api.js';
import '@/assets/scss/system.scss'
import system_add from './system_add'
export default {
  data () {
      return {
        tableData:[],
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }],

        // 弹出层
        components:{
            system_add:'system_add',
        },
        search:{    // 搜索的内容
            select:'',
            start_time:'',
            end_time:'',
            Key_word:''
        },
        // 需要改变的样式
        title:'',
        people:'',
        name:'',
        //    分页所需参数
        pages:{
          page_size:'100',
          total:'100',
        },
        page:1,
      }
  },
  methods: {
      init(value){
          this.type = this.$route.query.id
          switch (Number(this.type)){
            case 1:
                this.title = '打包员'
                this.people = '打包员'
                this.name = '登录名称'
                break
            case 2:
                this.title = '操作权限'
                this.people = '角色'
                this.name = '登录账号'
                administrator_get({page:value?value:this.page}).then(res => {
                  console.log(res);
                  this.pages.page_size = res.per_page;
                  this.pages.total = res.total;
                  this.tableData = res.data;
                })
                break
            case 3:
                this.title = '业务员'
                this.people = '业务员'
                this.name = '业务员名称'
                break
            case 4:
                this.title = '系统日志'
                this.name = '操作者'
                break
        }
      },
      sou(){
          console.log(111111111111111)
      },
    //   删除操作
      del(cur_id){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            administrator_del({'id':cur_id}).then(res=>{
                this.$message({
                    duration:1500,
                    message: '删除成功',
                    type: 'success',
                });
                this.init();
            })
        }).catch(() => {
            this.$message({
                duration:1500,
                message: '已取消删除',
                type: 'success',
            });
        });
      },
    //   新增 和编辑按钮
      modify(modify_id,cur_data){
        if(modify_id == 1){
            this.iframe_title_text = '添加'+this.title;
            if(this.type == 2){
                this.iframe_title_text = '添加角色'
            }
        }else if(modify_id == 2){
            this.iframe_title_text = '编辑'+this.title;
            if(this.type == 2){
                this.iframe_title_text = '编辑角色'
            }
        }
        let iframe_width = 'calc(80%)'
        let iframe_height = '35%'
        if(this.type == 2){
            iframe_width = 'calc(80%)'
            iframe_height = '80%'
        }
        this.$layer.iframe({    //弹窗
            title: this.iframe_title_text,
            shade: true,//是否显示遮罩
            area: [iframe_height, iframe_width],
            content: {
                content: system_add, //传递的组件对象
                parent: this,
                data:{
                    id:this.type,      //把值传输过去
                    modify_id:modify_id,
                    curData:cur_data?cur_data:{}
                }
            }
        });
      },
    // 清空按钮
    empty(){
        this.search.select = '',
        this.search.start_time = '',
        this.search.end_time = '',
        this.init();
    },
  },
  watch:{
      '$route' (to,from){
          this.init();      //当路由变化时 则调用它
      }
  },
  created(){
      this.init();
  },
}
</script>
<style scoped>
</style>
