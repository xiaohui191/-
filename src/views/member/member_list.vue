<template>
  <div id="member_list">
    <div class="main_wrap">
      <breadCrumbs class="bread_crumbs" :bread_crumbs_list="bread_crumbs_list"></breadCrumbs>
      <el-card class="box-card" shadow="never">
        <el-row :gutter="20" class="header-bar">
          <el-col :span="2">
            <el-select v-model="member_condition.usertype" placeholder="会员类型"
              @change="init()">
                <el-option
                v-for="(item,index) in member_type_list"
                :key="item.label"
                :label="item.member"
                :value="item.label">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="2">
            <el-select v-model="member_condition.membership_id" @change="init()" placeholder="会员等级">
                <el-option
                v-for="(item,index) in member_grade_list"
                :key="item.label"
                :label="item.member"
                :value="item.label">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="2">
            <el-select v-model="member_condition.status" @change="init()" placeholder="会员状态">
                <el-option
                v-for="(item,index) in member_status_list"
                :key="item.label"
                :label="item.member"
                :value="item.label">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-date-picker
              v-model="member_date"
              type="daterange"
              @change="date_change"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-col>
          <el-col :span="3">
            <el-input v-model="member_condition.name" placeholder="请输入关键字"></el-input>
          </el-col>
          <el-col :span="2">
            <el-button type="success" @click="init()">搜索</el-button>
          </el-col>
          <el-col :span="2">
            <el-select v-model="member_condition.nationality_id" @change="init()" placeholder="国家选择">
                <el-option
                v-for="(item,index) in country_list"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="4">
            <el-button type="warning" @click="downloadExl(tableData)">导出</el-button>
            <a href="" download="这里是下载的文件名.xlsx" ref="hf"></a>
          </el-col>
        </el-row>
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column label="类型" width="80">
            <template slot-scope="scope">{{scope.row.type}}</template>
          </el-table-column>
          <el-table-column label="等级" width="60">
            <template slot-scope="scope">{{scope.row.grade}}</template>
          </el-table-column>
          <el-table-column label="会员ID" width="80">
            <template slot-scope="scope">{{scope.row.member_id}}</template>
          </el-table-column>
          <el-table-column label="会员名称">
            <template slot-scope="scope">{{scope.row.member_name}}</template>
          </el-table-column>
          <el-table-column :label="member_condition.usertype==1?'真实姓名':'企业名称'" v-if="type==1">
            <template slot-scope="scope">{{member_condition.usertype==1?scope.row.name:scope.row.company}}</template>
          </el-table-column>
          <el-table-column label="国家">
            <template slot-scope="scope">{{scope.row.country}}</template>
          </el-table-column>
          <el-table-column label="联系电话" width="120">
            <template slot-scope="scope">{{scope.row.phone}}</template>
          </el-table-column>
          <el-table-column label="会员金额" width="120" v-if="type!=2">
            <template slot-scope="scope">{{scope.row.money}}</template>
          </el-table-column>
          <el-table-column label="会员积分" width="120" v-if="type!=2">
            <template slot-scope="scope">{{scope.row.integral}}</template>
          </el-table-column>
          <el-table-column label="会员状态" width="80" v-if="type!=2">
            <template slot-scope="scope">{{scope.row.status}}</template>
          </el-table-column>
          <el-table-column label="冻结时间" width="150" v-if="type==2">
            <template slot-scope="scope">{{scope.row.time}}</template>
          </el-table-column>
          <el-table-column label="冻结原因" v-if="type==2">
            <template slot-scope="scope">{{scope.row.reason}}</template>
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button size="small" type="warning" @click="edit(scope)" v-if="type!=2">编辑</el-button>
              <el-button size="small" type="danger" v-if="type!=2">删除</el-button>
              <el-button size="small" type="danger" @click="release(scope)" v-else>解除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
    <div class="pages_wrap" v-if="Number(pages.total)">
      <el-pagination class="pages fr" background :page-size="Number(pages.page_size)" layout="total,prev, pager, next"
        @current-change="init"
       :total="Number(pages.total)"></el-pagination>
    </div>
  </div>
</template>
<script>
import bread_crumbs from '@/components/bread_crumbs'
import member_release from './member_release.vue'
import { nationality_get,member_get,member_forbid_user } from '@/assets/api/api.js'
export default {
  name: "member_list",
  data: () => ({
    type:1,//个人会员页面：1；企业会员页面：2；冻结会员页面：3
    bread_crumbs_list:['会员管理','会员列表'],
    country_list:[],
    member_type_list:[{
      label:1,
      member:'个人会员'
    },{
      label:2,
      member:'企业会员'
    }],
    member_grade_list:[{
      label:0,
      member:'会员等级'
    },{
      label:1,
      member:'1级'
    },{
      label:2,
      member:'2级'
    },{
      label:3,
      member:'3级'
    },{
      label:4,
      member:'4级'
    },{
      label:5,
      member:'5级'
    }],
    member_status_list:[{
      label:0,
      member:'会员状态'
    },{
      label:1,
      member:'已冻结'
    },{
      label:2,
      member:'已解除'
    }],
    member_date:'',
    member_condition:{
      name:'',//搜索内容
      usertype:2,//类型（1个人，2企业）
      membership_id:0,//会员等级id
      status:0,//状态(1正常，2冻结)
      nationality_id:'0',//国家id
      begin_time:'',//开始时间，格式：2018-05-06
      end_time:'',//结束时间，格式：2018-05-06
      page:1
    },
    pages:{
      page_size:'100',
      total:'100',
    },
    tableData: [],
    tmpDown:'' //导出的二进制对象
  }),
  components: {
    'breadCrumbs':bread_crumbs,
    member_release
  },
  watch:{
    //侦测router变化
    '$route' (to, from){
      //初始化筛选条件
      this.member_condition = {
        name:'',//搜索内容
        usertype:2,//类型（1个人，2企业）
        membership_id:0,//会员等级id
        status:0,//状态(1正常，2冻结)
        nationality_id:'0',//国家id
        begin_time:'',//开始时间，格式：2018-05-06
        end_time:'',//结束时间，格式：2018-05-06
        page:0
      }
      this.init();
    }
  },
  created() {
    //do something after creating vue instance
    nationality_get().then(res => {
      this.country_list = res.data
      this.country_list.unshift({
        id:'0',
        name:'全部国家'
      })
    })
    //初始化筛选条件
    this.member_condition = {
      name:'',//搜索内容
      usertype:2,//类型（1个人，2企业）
      membership_id:0,//会员等级id
      status:0,//状态(1正常，2冻结)
      nationality_id:'0',//国家id
      begin_time:'',//开始时间，格式：2018-05-06
      end_time:'',//结束时间，格式：2018-05-06
      page:0
    }
    this.init();
  },
  methods: {
    init(value){
      this.member_condition.page = value;
      this.type = this.$route.query.type;
      console.log(this.type);
      // type=1:个人会员/企业会员；type=2:冻结会员；
      switch (this.type) {
        case '1':
          member_get(this.member_condition).then(res => {
            this.pages.page_size = res.per_page;
            this.pages.total = res.total;
            this.tableData = res.data;
            console.log(this.pages);
          })
          break;
        default:
          member_forbid_user(this.member_condition).then(res => {
            this.pages.page_size = res.per_page;
            this.pages.total = res.total;
            this.tableData = res.data;
            console.log(this.pages);
          })
      }
    },
    date_change(value){
      this.member_condition.begin_time = this.member_date[0];
      this.member_condition.end_time = this.member_date[1];
      this.init();
    },
    downloadExl(json, type) {
        if(json.length==0){
          layer.msg('当前表格为空，无需导出',{
            time:'1500'
          })
          return
        }
        var tmpdata = json[0];
        let new_json = [];
        new_json.push(tmpdata);
        new_json.unshift({});
        var keyMap = []; //获取keys
        for (var k in tmpdata) {
            keyMap.push(k);
            new_json[0][k] = k;
        }
      var tmpdata = [];//用来保存转换好的new_json
            new_json.map((v, i) => keyMap.map((k, j) => Object.assign({}, {
                v: v[k],
                position: (j > 25 ? this.getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1)
            }))).reduce((prev, next) => prev.concat(next)).forEach((v, i) => tmpdata[v.position] = {
                v: v.v
            });
            var outputPos = Object.keys(tmpdata); //设置区域,比如表格从A1到D10
            var tmpWB = {
                SheetNames: ['mySheet'], //保存的表标题
                Sheets: {
                    'mySheet': Object.assign({},
                        tmpdata, //内容
                        {
                            '!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1] //设置填充区域
                        })
                }
            };
            this.tmpDown = new Blob([this.s2ab(XLSX.write(tmpWB,
                {bookType: (type == undefined ? 'xlsx':type),bookSST: false, type: 'binary'}//这里的数据是用来定义导出的格式类型
                ))], {
                type: ""
            }); //创建二进制对象写入转换好的字节流
        var href = URL.createObjectURL(this.tmpDown); //创建对象超链接
        this.$refs.hf.href = href; //绑定a标签
        this.$refs.hf.click(); //模拟点击实现下载
        setTimeout(function() { //延时释放
            URL.revokeObjectURL(this.tmpDown); //用URL.revokeObjectURL()来释放这个object URL
        }, 100);
    },
    s2ab(s) { //字符串转字符流
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    },
     // 将指定的自然数转换为26进制表示。映射关系：[0-25] -> [A-Z]。
    getCharCol(n) {
        let temCol = '',
        s = '',
        m = 0
        while (n > 0) {
            m = n % 26 + 1
            s = String.fromCharCode(m + 64) + s
            n = (n - m) / 26
        }
        return s
    },
    edit(cur_li){
      sessionStorage.setItem('cur_data',JSON.stringify(cur_li.row))
      this.$router.push({path:'/member_list/member_information'});
    },
    release(cur_li){
      this.$layer.iframe({
        title: '解除冻结',
        shade: true,//是否显示遮罩
        content: {
          content: member_release, //传递的组件对象
          parent: this,//当前的vue对象
          data:{tableData:cur_li.row}//props
        },
        shadeClose: false,//点击遮罩是否关闭
        area:['80%','calc(80%)']
      });
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
