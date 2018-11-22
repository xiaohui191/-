function trandata (data) {
    var def = $.Deferred();
    var res = data;
    if(typeof data !== 'object'){
      res = JSON.parse(data);
    }
    if(res.Error==200){
      return def.resolve(res);
    }else{
      return def.reject();
    }
  };
  
  // 登陆
  //export const login = function(req){return $.post("login",req?req:{}).then(function(res){return trandata(res)})};
  
  
  //上传图片
  export const uploadFile = req => {
    let env = process.env.NODE_ENV
    let $domain = ''
    if(env==='development'){//开发模式
      $domain = '/restapi'
    }else {//发布模式
      $domain = ''
    }
    return $domain + '/index/upload'
  }
  
  // 广告管理--列表
  export const advertising_list = function(req){return $.post("advertising/get",req?req:{}).then(function(res){return trandata(res)})};

  // 广告管理--新增
  export const advertising_add = function(req){return $.post("advertising/add",req?req:{}).then(function(res){return trandata(res)})};

  // 广告管理--修改广告排序和是否启用
  export const rank_show = function(req){return $.post("advertising/rank_show",req?req:{}).then(function(res){return trandata(res)})};

  // 广告管理--修改广告
  export const modify = function(req){return $.post("advertising/modify",req?req:{}).then(function(res){return trandata(res)})};

  // 广告管理--删除广告
  export const advertising_del = function(req){return $.post("advertising/del",req?req:{}).then(function(res){return trandata(res)})};


  // 新闻管理--列表
  export const news_list = function(req){return $.post("news/get",req?req:{}).then(function(res){return trandata(res)})};

  // 新闻管理--新增
  export const news_add = function(req){return $.post("news/add",req?req:{}).then(function(res){return trandata(res)})};

  // 新闻管理--删除
  export const news_del = function(req){return $.post("news/del",req?req:{}).then(function(res){return trandata(res)})};

  // 新闻管理--修改
  export const news_modify = function(req){return $.post("news/modify",req?req:{}).then(function(res){return trandata(res)})};

  
  // 快递公司--新增
  export const express_add = function(req){return $.post("express/add",req?req:{}).then(function(res){return trandata(res)})};
  
  // 快递公司--列表
  export const express_list = function(req){return $.post("express/get",req?req:{}).then(function(res){return trandata(res)})};
  
  // 快递公司--修改
  export const express_edit = function(req){return $.post("express/modify",req?req:{}).then(function(res){return trandata(res)})};
  
  // 快递公司--删除
  export const express_del = function(req){return $.post("express/del",req?req:{}).then(function(res){return trandata(res)})};
  

  // 仓库设置--新增
  export const warehouse_add = function(req){return $.post("warehouse/add",req?req:{}).then(function(res){return trandata(res)})};

  // 仓库设置--列表
  export const warehouse_list = function(req){return $.post("warehouse/get",req?req:{}).then(function(res){return trandata(res)})};

  // 仓库设置--修改
  export const warehouse_edit = function(req){return $.post("warehouse/modify",req?req:{}).then(function(res){return trandata(res)})};

  // 仓库设置--删除
  export const warehouse_del = function(req){return $.post("warehouse/del",req?req:{}).then(function(res){return trandata(res)})};

  // 合作伙伴--新增
  export const partner_add = function(req){return $.post("partner/add",req?req:{}).then(function(res){return trandata(res)})};

  // 合作伙伴--列表
  export const partner_list = function(req){return $.post("partner/get",req?req:{}).then(function(res){return trandata(res)})};

  // 合作伙伴--删除
  export const partner_del = function(req){return $.post("partner/del",req?req:{}).then(function(res){return trandata(res)})};

  // 合作伙伴--修改
  export const partner_modify = function(req){return $.post("partner/modify",req?req:{}).then(function(res){return trandata(res)})};


  // 国家分类--新增
  export const nationality_add = function(req){return $.post("nationality/add",req?req:{}).then(function(res){return trandata(res)})};

  // 国家分类--列表
  export const nationality_list = function(req){return $.post("nationality/get",req?req:{}).then(function(res){return trandata(res)})};

  // 国家分类--修改
  export const nationality_modify = function(req){return $.post("nationality/modify",req?req:{}).then(function(res){return trandata(res)})};

  // 国家分类--删除
  export const nationality_del = function(req){return $.post("nationality/del",req?req:{}).then(function(res){return trandata(res)})};


  // 下单备注--新增
  export const order_remark_add = function(req){return $.post("order_remark/add",req?req:{}).then(function(res){return trandata(res)})};

  // 下单备注--列表
  export const order_remark_get = function(req){return $.post("order_remark/get",req?req:{}).then(function(res){return trandata(res)})};

  // 下单备注--列表
  export const order_remark_modify = function(req){return $.post("order_remark/modify",req?req:{}).then(function(res){return trandata(res)})};

  // 下单备注--列表
  export const order_remark_del = function(req){return $.post("order_remark/del",req?req:{}).then(function(res){return trandata(res)})};