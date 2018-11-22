<template>
  <div :class="isCollapse ? 'left clearfix small': 'left clearfix'">
    <div class="menu-switch" @click="switchBtn()"><i class="el-icon-more"></i></div>
    <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" :router="true" :collapse="isCollapse" :unique-opened="true">
      <template v-for="(nav,index) in navs">
        <el-menu-item v-if="!nav.subNav" :index="(index+1).toString()" :route="nav.href?nav.href:(index+1).toString()" :key="index">{{(index+1).toString()}}处理中心</el-menu-item>
        <el-submenu :key="index" :index="(index+1).toString()" v-else>
          <template slot="title"><i :class="['iconfont',nav.icon]"></i><span>{{nav.title}}</span></template>
          <el-menu-item v-for="(subNav,idex) in nav.subNav" :key="idex" :index="`${(index+1).toString()}-${(idex+1).toString()}`" :route="subNav.sub_href?subNav.sub_href:`${(index+1).toString()}-${(idex+1).toString()}`">{{subNav.sub_title}}</el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
    <div class="isPrincipal" v-if="isAdmin">
      <div v-if="Number(step)===3">
        <el-button type="danger" v-if="isCollapse===false" @click="submit()">提交审核</el-button>
        <el-tooltip class="item" effect="dark" content="提交审核" placement="right-start" v-else>
          <el-button type="danger" size="small" @click="submit()"><i class="el-icon-info"></i></el-button>
        </el-tooltip>
      </div>
      <div v-if="Number(step)===2">
        <el-button type="danger" v-if="isCollapse===false" @click="reviewing()">审核中</el-button>
        <el-tooltip class="item" effect="dark" content="审核中" placement="right-start" v-else>
          <el-button type="danger" size="small" @click="reviewing()"><i class="el-icon-info"></i></el-button>
        </el-tooltip>
      </div>
      <div v-if="Number(step)===0">
        <el-button type="danger" v-if="isCollapse===false" @click="reviewsuccess()">审核成功</el-button>
        <el-tooltip class="item" effect="dark" content="审核成功" placement="right-start" v-else>
          <el-button type="danger" size="small" @click="reviewsuccess()"><i class="el-icon-info"></i></el-button>
        </el-tooltip>
      </div>
      <div v-if="Number(step)===1">
        <el-button type="danger" v-if="isCollapse===false" @click="reviewfail()">审核失败</el-button>
        <el-tooltip class="item" effect="dark" content="审核失败" placement="right-start" v-else>
          <el-button type="danger" size="small" @click="reviewfail()"><i class="el-icon-info"></i></el-button>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,
      isAdmin: false,
      step: '3',
      activeIndex:'0',
      navs:[{
        title:'内容管理',
        href:'',
        icon:'icon-neirong',
        subNav:[{
          sub_title:'广告管理',
          icon:'',
          sub_href:'/content_istration'
        },{
          sub_title:'合作伙伴',
          icon:'',
          sub_href:'/content_list?id=1'
        },{
          sub_title:'新闻管理',
          icon:'',
          sub_href:'/content_list?id=2'
        },{
          sub_title:'快递公司',
          icon:'',
          sub_href:'/content_list?id=3'
        },{
          sub_title:'下单备注',
          icon:'',
          sub_href:'/content_list?id=4'
        },{
          sub_title:'国家分类',
          icon:'',
          sub_href:'/content_list?id=5'
        },{
          sub_title:'仓库设置',
          icon:'',
          sub_href:'/content_list?id=6'
        }]
      },{
        title:'会员管理',
        href:'',
        icon:'icon-huiyuan',
        subNav:[{
          sub_title:'会员列表',
          icon:'',
          sub_href:'/member_list?type=1'
        },{
          sub_title:'冻结会员',
          icon:'',
          sub_href:'/member_list?type=2'
        }]
      },{
        title:'财务管理',
        href:'',
        icon:'icon-caiwu',
        subNav:[{
          sub_title:'账户充值',
          icon:'',
          sub_href:'/finance_recharge'
        },{
          sub_title:'汇款确认',
          icon:'',
          sub_href:'/finance_remittance'
        },{
          sub_title:'账户明细',
          icon:'',
          sub_href:'/finance_account_detail'
        },{
          sub_title:'付款记录',
          icon:'',
          sub_href:'/pay_record'
        },{
          sub_title:'积分明细',
          icon:'',
          sub_href:'/integral_details'
        }]
      },{
      title:'库存管理',
      href:'',
      icon:'icon-kucun',
      subNav:[{
        sub_title:'快递入库',
        icon:'',
        sub_href:'/stock_storage'
      },{
        sub_title:'入库列表',
        icon:'',
        sub_href:'/stock_list?type=1'
      },{
        sub_title:'未领入存',
        icon:'',
        sub_href:'/stock_list?type=2'
      }]
    },{
      title:'订单管理',
      href:'',
      icon:'icon-dingdan',
      subNav:[{
        sub_title:'未确认订单',
        icon:'',
        sub_href:'/order_list?type=1'
      },{
        sub_title:'未计算订单',
        icon:'',
        sub_href:'/order_list?type=2'
      },{
        sub_title:'未付款订单',
        icon:'',
        sub_href:'/order_list?type=3'
      },{
        sub_title:'打印订单',
        icon:'',
        sub_href:'/order_print'
      },{
        sub_title:'未出库订单',
        icon:'',
        sub_href:'/order_list?type=4'
      },{
        sub_title:'已出库订单',
        icon:'',
        sub_href:'/order_list?type=5'
      },{
        sub_title:'无效订单',
        icon:'',
        sub_href:'/order_list?type=6'
      }]
    },{
      title:'报价管理',
      href:'',
      icon:'icon-baojia',
      subNav:[{
        sub_title:'利润方案',
        icon:'',
        sub_href:''
      },{
        sub_title:'国家管理',
        icon:'',
        sub_href:'/offerIstration_country?id=1'
      },{
        sub_title:'快递企业',
        icon:'',
        sub_href:'/offerIstration_country?id=2'
      },{
        sub_title:'报价渠道',
        icon:'',
        sub_href:''
      },{
        sub_title:'货物类型',
        icon:'',
        sub_href:''
      },{
        sub_title:'物品类别',
        icon:'',
        sub_href:''
      },{
        sub_title:'分区管理',
        icon:'',
        sub_href:''
      },{
        sub_title:'报价列表',
        icon:'',
        sub_href:''
      },{
        sub_title:'报价导出',
        icon:'',
        sub_href:''
      }]
    },{
      title:'系统管理',
      href:'',
      icon:'icon-xitong',
      subNav:[{
        sub_title:'积分设置',
        icon:'',
        sub_href:'/system_integral?id=1'
      },{
        sub_title:'等级设置',
        icon:'',
        sub_href:'/system_integral?id=2'
      },{
        sub_title:'经验值设置',
        icon:'',
        sub_href:'/system_integral?id=3'
      },{
        sub_title:'打包员管理',
        icon:'',
        sub_href:'/system_list?id=1'
      },{
        sub_title:'操作员管理',
        icon:'',
        sub_href:'/system_list?id=2'
      },{
        sub_title:'业务员管理',
        icon:'',
        sub_href:'/system_list?id=3'
      },{
        sub_title:'系统日志',
        icon:'',
        sub_href:'/system_list?id=4'
      }]
    }
    // {
    // title:'测试一级栏目',
    // href:'',
    // icon:'icon-xitong',}
    ]
    };
  },
  methods: {
    set_curItem(){
      var _this = this;
      for(let i=0;i<_this.navs.length;i++){
        if(this.navs[i].href){
          if(this.navs[i].href==this.$route.fullPath){
            this.activeIndex = i;
          }
        }else if(!this.navs[i].href && _this.navs[i].subNav){
          for(var y=0; y<_this.navs[i].subNav.length;y++){
            if(!_this.navs[i].subNav[y].sub_href){
              _this.navs[i].subNav[y].sub_href = '/'+(i+1)+'-'+(y+1);
            }
            if(_this.navs[i].subNav[y].sub_href==_this.$route.fullPath){
              this.activeIndex = (i+1)+'-'+(y+1)
            }
          }
        }else{
          this.activeIndex = this.$route.fullPath.substr(1)
        }
      }
      if(this.$route.fullPath=='/index'){
        this.activeIndex = '0';
      }
    },
    //开关导航
    switchBtn(){
      this.isCollapse = !this.isCollapse
      if(this.isCollapse){
        this.$emit('change',true);
      }else{
        this.$emit('change',false);
      }
    },
  },
  watch:{
    '$route' (to,from){
      //console.log(to);
      this.set_curItem();
    }
  },
  created() {
    //do something after creating vue instance
    this.set_curItem();
  },
  mounted(){
    // 判断账号是否为负责人，如果是负责人显示导航按钮
    // let is_Admin = JSON.parse(sessionStorage.getItem("userInfoData")).is_admin
    // if(Number(is_Admin)===1){
    //   this.isAdmin = true
    // }
  }
}
</script>
