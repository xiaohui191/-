<template>
  <div id="xyh_content_istration">
    <div class="xyh_top"><h1>广告管理</h1></div>
    <div class="xyh_table">
        <div class="xyh_search" style="text-align:right">
            <el-button @click="modify(1)">新增广告</el-button>
        </div> 
        <el-table :data="tableData" style="width: 100%" class="table">
            <el-table-column label="广告名称" align="center">
                <template slot-scope="scope">{{scope.row.name}}</template>
            </el-table-column>
            <el-table-column label="广告图片" align="center">
                <template slot-scope="scope">
                    <span class="xyh_img"><img :src="scope.row.image" alt=""></span>
                </template>
            </el-table-column>
            <el-table-column label="广告位置" align="center">
                <template slot-scope="scope">{{scope.row.location}}</template>
            </el-table-column>
            <el-table-column label="是否显示" align="center">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.status" @change="sort(scope.row)" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                </template>
            </el-table-column>
            <el-table-column label="排序" align="center">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.sort" style="width:50px;" @change="status(scope.row)"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="添加时间" align="center">
                <template slot-scope="scope">{{scope.row.add_time}}</template>
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
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
import { advertising_list , rank_show , advertising_del} from '@/assets/api/xyh_api'
export default {
  data () {
      return {
          tableData: [],

          //    分页所需参数
          current_page:1,          //当前页面
          per_page:'10',              //当前展示的数据条数
          total:'1',                 // 数据总数
          page:''
      }
  },
  methods: {
      init(){
          advertising_list({'page':this.page}).then(res=>{        //列表数据
                this.tableData = res.data;
                this.total = res.total;
                this.per_page = res.per_page
                for (let i = 0; i < res.data.length; i++) {
                    if(res.data[i].status == 1){
                        this.tableData[i].status = true
                    }else if(res.data[i].status == 2){
                        this.tableData[i].status = false
                    }
                }
          })
      },
    //   排序接口调用
      status(row){
          rank_show({id:row.id,sort:row.sort}).then(res=>{
                layer.msg('修改成功',{time:1500});   
                this.init();  
          })
      },
    //   开关接口调用
      sort(row){
          if(row.status == true){
              row.status = 1
          }else{
              row.status = 2
          }
          rank_show({id:row.id,status:row.status}).then(res=>{
                layer.msg('修改成功',{time:1500});              
                this.init();           
          })
      },
    //   新增 编辑按钮
      modify(type,row){
          sessionStorage.setItem('key', JSON.stringify(row));
          this.$router.push({path:'content_istration_modify',query:{type:type}})
      },
    //   删除按钮
      del(id){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            advertising_del({'id':id}).then(res=>{
                layer.msg('删除成功',{time:1500});
                this.init();
            })
        }).catch(() => {
                layer.msg('取消删除',{time:1500});            
        });
      },
      // 分页
    handleCurrentChange(val){
        this.current_page = val;
        this.page = val;
        this.init();
    },
  },
  created(){
      this.init();
  },
}
</script>
<style scoped>
</style>