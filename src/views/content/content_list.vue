<template>
  <div id="xyh_content_list">
    <div class="xyh_top"><h1>{{title}}</h1></div>
    <div class="xyh_table">
        <div class="xyh_search">
            <span class="title_form" v-if="type == 2 || type == 3 || type == 6?false:true">{{title}}</span><el-input v-model="search.title" placeholder="请输入关键词" class="input_"></el-input> 
            <span v-if="type == 1 || type == 2 || type == 3 || type == 4 || type == 5?false:true">
                <span class="title_form">所属快递：</span>
                <el-select v-model="search.express_company" placeholder="请选择"  class="input_">
                    <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.name">
                    </el-option>
                </el-select>
            </span>
            <span v-if=" type == 3 || type == 4 || type == 5 || type == 6?false:true">
                <span class="title_form">时间：</span>
                <el-date-picker v-model="search.begin_time" class="input_time" type="date" placeholder="开始时间" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
                <span class="title_form">至</span>
                <el-date-picker v-model="search.end_time" class="input_time" type="date" placeholder="结束时间" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
            </span>
            <span v-if="type == 3 || type == 1 || type == 2 || type == 4 || type == 5|| type == 6?false:true">
                <span class="title_form">状态：</span>
                <el-select v-model="search.select" placeholder="请选择"  class="input_">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </span>
            <span v-if="type == 1 || type == 3 || type == 4 || type == 5 || type == 6?false:true">
                <span class="title_form">类型：</span>
                <el-select v-model="search.type" placeholder="请选择"  class="input_">
                    <el-option label="公司新闻" value="1"></el-option>
                    <el-option label="行业状态" value="2"></el-option>
                    <el-option label="货运常识" value="3"></el-option>
                    <el-option label="会员帮助" value="4"></el-option>
                    <el-option label="其他帮助" value="5"></el-option>
                </el-select>
            </span>
            <span v-if="type == 1 || type == 2 || type == 3 || type == 6 ||  type == 4?false:true">
                <span class="title_form">申报总值</span>
                <el-input v-model="search.total_value" placeholder="请输入关键词" class="input_"></el-input>
            </span>
            <el-button @click="search_()">搜索</el-button>
            <el-button @click="empty()">清空</el-button>
            <el-button @click="modify(1)">新增</el-button>
        </div> 
        <el-table :data="tableData" style="width: 100%" class="table">
            <el-table-column label="编号" align="center">
                <template slot-scope="scope">{{scope.row.id}}</template>
            </el-table-column>
            <el-table-column v-if="type==1 || type==3 || type==4 || type==5 || type==6" :label="label_name" align="center" key="name">
                <template slot-scope="scope">{{scope.row.name}}</template>
            </el-table-column>
            <el-table-column label="申报总值" v-if="type == 5" align="center" key="total_value">
                <template slot-scope="scope">{{scope.row.total_value}}</template>
            </el-table-column>
            <el-table-column label="所属快递" v-if="type == 6" align="center" key="express_company">
                <template slot-scope="scope">{{scope.row.express_company}}</template>
            </el-table-column>
            <el-table-column label="品牌图片" v-if="type == 1?true:false" align="center"  key="img">
                <template slot-scope="scope">
                    <span class="xyh_img">
                        <img :src="scope.row.image" alt="">
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="品牌链接" v-if="type == 1" align="center" key="url">
                <template slot-scope="scope">{{scope.row.link}}</template>
            </el-table-column>
            <el-table-column label="排序" v-if="type != 2 " align="center" key="sort">
                <template slot-scope="scope">{{scope.row.sort}}</template>
            </el-table-column>
            <el-table-column label="标题" v-if="type == 2" align="center" key="address">
                <template slot-scope="scope">{{scope.row.title}}</template>
            </el-table-column>
            <el-table-column label="添加时间" v-if="type == 2 || type == 1" align="center" key="time">
                <template slot-scope="scope">{{scope.row.add_time}}</template>
            </el-table-column>
            <el-table-column label="操作" align="center" key="operation">
                <template slot-scope="scope">
                    <el-button size="small" @click="modify(3,scope.row)" v-if="type == 2">查看</el-button>
                    <el-button size="small" @click="modify(2,scope.row)">编辑</el-button>
                    <el-button size="small" @click="del(scope.row.id)">删除</el-button>
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
import { news_list,news_del,express_list,warehouse_list,express_del , warehouse_del , partner_list ,partner_del ,  nationality_list , nationality_del , order_remark_get , order_remark_del} from '@/assets/api/xyh_api'
import list_modify from './content_list_modify'
import list_Journalism from './content_list_Journalism'
export default {
  data () {
      return {
        tableData: [],
        options: [],
        
        // 弹出层
        components:{
            list_modify:'list_modify',
            list_Journalism:'list_Journalism'
        },
        search:{    // 搜索的内容
            title:'',
            type:'',
            begin_time:'',
            express_company:'',
            end_time:'',
            total_value:''
        },
        // 需要改变的样式
        title:'',
        label_name:'',
        iframe_title_text:'',

        //    分页所需参数
        current_page:1,          //当前页面
        per_page:'',              //当前展示的数据条数
        total:'',                 // 数据总数

        del1:''
      }
  },
  methods: {
      init(){
          this.type = this.$route.query.id
          switch (Number(this.type)){
            case 1:
                this.title = '合作伙伴'
                this.label_name = '品牌名称'
                this.partner_list()
                break
            case 2:
                this.title = '新闻管理'
                this.news_list();
                break
            case 3:
                this.title = '快递公司'
                this.label_name = '名称'
                this.express_list();
                break
            case 4:
                this.title = '下单备注'
                this.label_name = '备注名称'
                this.order_remark_get();
                break
            case 5:
                this.title = '国家分类'
                this.label_name = '国家名称'
                this.nationality_list();
                break
            case 6:
                this.title = '仓库设置'
                this.label_name = '名称'
                this.express_list_name();
                this.warehouse_list();
                break
        }
      },
    //   删除操作
      del(id){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            if(this.type == 2){
                this.del1 = news_del
            }else if(this.type == 3){
                this.del1 = express_del
            }else if(this.type == 6){
                this.del1 = warehouse_del
            }else if(this.type == 1){
                this.del1 = partner_del
            }else if(this.type == 5){
                this.del1 = nationality_del
            }else if(this.type == 4){
                this.del1 = order_remark_del
            }

            this.del1({'id':id}).then(res=>{
                layer.msg('删除成功',{time:1500});
                this.init();
            })         
        }).catch(() => {
                layer.msg('删除已取消',{time:1500});
        });
      },
    //   新增 和编辑按钮
      modify(modify_id,look){
        if(this.type == 2){
            if(modify_id == 1){
                this.iframe_title_text = this.title+'新增';
            }else if(modify_id == 2){
                this.iframe_title_text = this.title+'编辑';
            }else if(modify_id == 3){
                this.iframe_title_text = '查看'+this.title;
            } 
            this.$layer.iframe({    //弹窗
                title: this.iframe_title_text,
                shade: true,//是否显示遮罩
                area: ['50%', ''],
                content: {
                    content: list_Journalism, //传递的组件对象
                    parent: this,
                    data:{
                        list_Journalism:modify_id,
                        id:look
                    }
                }
            });        
        }else{
            if(modify_id == 1){
                this.iframe_title_text = this.title+'新增';
            }else if(modify_id == 2){
                this.iframe_title_text = this.title+'编辑';
            }
            this.$layer.iframe({    //弹窗
                title: this.iframe_title_text,
                shade: true,//是否显示遮罩
                area: ['25%', ''],
                content: {
                    content: list_modify, //传递的组件对象
                    parent: this,
                    data:{
                        id:this.type,      //把值传输过去
                        modify_id:modify_id,
                        look:look

                    }
                }
            });
        }
      },
    // 搜索按钮
    search_(){
        this.init();
    },
    // 清空按钮
    empty(){
        this.search.title = '',
        this.search.type = '',
        this.search.begin_time = '',
        this.search.end_time = '',
        this.search.express_company = '',
        this.search.total_value = '',
        this.init();
    },
    // 分页
    handleCurrentChange(val){
        this.current_page = val;
        this.search.page = val;
        this.init();
    },

    // 新闻管理---列表
    news_list(){
        news_list(this.search).then(res=>{
            this.tableData = res.data;
            this.total = res.total;
            this.per_page = res.per_page
        })
    },
    // 快递公司---列表
    express_list(){
        this.search.name = this.search.title;
        express_list(this.search).then(res=>{
            this.tableData = res.data;
            this.total = res.total;
            this.per_page = res.per_page
        })
    },
    //   快递公司名称
    express_list_name(){
        express_list().then(res=>{
            this.options = res.data
        })
    },
    // 仓库列表 - 列表
    warehouse_list(){
        this.search.name = this.search.title;
        warehouse_list(this.search).then(res=>{
            this.tableData = res.data;  
            this.total = res.total;
            this.per_page = res.per_page          
        })
    },
    // 合作伙伴列表
    partner_list(){
        this.search.name = this.search.title;
        partner_list(this.search).then(res=>{
            this.tableData = res.data;  
            this.total = res.total;
            this.per_page = res.per_page
        })
    },
    // 国家分类列表
    nationality_list(){
        this.search.name = this.search.title;
        nationality_list(this.search).then(res=>{
            this.tableData = res.data;  
            this.total = res.total;
            this.per_page = res.per_page
        })
    },
    // 下单备注列表
    order_remark_get(){
        this.search.name = this.search.title;
        order_remark_get(this.search).then(res=>{
            this.tableData = res.data;  
            this.total = res.total;
            this.per_page = res.per_page
        })
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