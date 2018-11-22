<template>
  <div id="xyh_content_list">
    <div class="xyh_top"><h1>{{title}}</h1></div>
    <div class="xyh_table">
        <div class="xyh_search">
            <span class="title_form">{{name}}</span>
            <el-input v-model="search.name" placeholder="请输入关键词" class="input_"></el-input>

            <span class="title_form" v-if="type == 1">国家代码</span>
            <el-input v-model="search.name" v-if="type == 1" placeholder="请输入关键词" class="input_"></el-input>

            <el-button>搜索</el-button>
            <el-button @click="empty()">清空</el-button>
            <el-button @click="modify(1)">新增</el-button>
        </div>
        <el-table :data="tableData" style="width: 100%" class="table">
            <el-table-column label="编号" align="center">
                <template slot-scope="scope">{{scope.row.id}}</template>
            </el-table-column>
            <el-table-column :label="label_name" align="center" key="name">
                <template slot-scope="scope">{{scope.row.name}}</template>
            </el-table-column>
            <el-table-column label="国家代码" v-if="type == 1" align="center" key="code">
                <template slot-scope="scope">{{scope.row.code}}</template>
            </el-table-column>
            <el-table-column label="燃油" v-if="type == 2" align="center" key="fuel">
                <template slot-scope="scope">{{scope.row.fuel}}</template>
            </el-table-column>
            <el-table-column label="排序" align="center" key="sort">
                <template slot-scope="scope">{{scope.row.sort}}</template>
            </el-table-column>
            <el-table-column label="操作" align="center" key="operation">
                <template slot-scope="scope">
                    <el-button size="small" @click="modify(2)">编辑</el-button>
                    <el-button size="small" @click="del()">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <div class="paging">
        <el-pagination
            v-if="total == 0?false:true"
            background
            @current-change="handleCurrentChange"
            :current-page.sync="current_page"
            :page-size="Number(per_page)"
            layout="total, prev, pager, next"
            :total="Number(total)">
        </el-pagination>
    </div>
  </div>
</template>
<script>
import '@/assets/scss/content_list.scss'
import offerIstration_countryModify from './offerIstration_countryModify'
export default {
  data () {
      return {
          // 弹出层
        components:{
            offerIstration_countryModify:'offerIstration_countryModify'
        },
        tableData:[{
            id:1,
            name: '王小虎',
            code:'CAD',
            sort:'123',
            fuel:'1.12L',
            type:'第一类型'
        }],
        search:{    // 搜索的内容
            name:'',
            country:''
        },
        // 需要改变的样式
        title:'',
        name:'',        //搜索框的内容

        label_name:'',
        iframe_title_text:'',

        //    分页所需参数
        current_page:1,          //当前页面
        per_page:'10',              //当前展示的数据条数
        total:'1',                 // 数据总数
      }
  },
  methods: {
      init(){
          this.type = this.$route.query.id
          switch (Number(this.type)){
            case 1:
                this.title = '国家管理'
                this.name = '国家名称 ：'
                this.label_name = '国家名称'
                break
            case 2:
                this.title = '快递企业'
                this.name = '企业名称 ：'
                this.label_name = '企业名称'
                break
        }
      },
    //   删除操作
      del(){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            // branch_controller_del({'group_id':id}).then(res=>{
                this.$message({
                    duration:1500,
                    message: '删除成功',
                    type: 'success',
                });
                this.init();
            // })
        }).catch(() => {
            this.$message({
                duration:1500,
                message: '已取消删除',
                type: 'success',
            });
        });
      },
    //   新增 和编辑按钮
      modify(modify_id){
        if(modify_id == 1){
            this.iframe_title_text = this.title+'新增';
            this.$layer.iframe({    //弹窗
                title: this.iframe_title_text,
                shade: true,//是否显示遮罩
                area: ['25%', ''],
                content: {
                    content: offerIstration_countryModify, //传递的组件对象
                    parent: this,
                    data:{
                        id:this.type,      //把值传输过去
                        modify_id:modify_id
                    }
                }
            });
        }else if(modify_id == 2){
            this.iframe_title_text = this.title+'编辑';
            this.$layer.iframe({    //弹窗
                title: this.iframe_title_text,
                shade: true,//是否显示遮罩
                area: ['25%', ''],
                content: {
                    content: offerIstration_countryModify, //传递的组件对象
                    parent: this,
                    data:{
                        id:this.type,      //把值传输过去
                        modify_id:modify_id
                    }
                }
            });
        }
      },
    // 清空按钮
    empty(){
        this.search.name = '',
        this.search.select = '',
        this.search.start_time = '',
        this.search.end_time = '',
        this.init();
    },
    // 分页
    handleCurrentChange(val){
        this.current_page = val;
        this.search.page = val;
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
