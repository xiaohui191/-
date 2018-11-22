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

//上传图片
export const uploadFile = req => {
  let env = process.env.NODE_ENV
  let $domain = ''
  if(env==='development'){//开发模式
    $domain = '/restapi'
  }else {//发布模式
    $domain = ''
  }
  return $domain + 'index/upload'
}


// 登陆
export const login = function(req){return $.post("login",req?req:{}).then(function(res){return trandata(res)})};
export const islogin = function(req){return $.get("islogin",req?req:{}).then(function(res){return trandata(res)})};
export const logout = function(req){return $.get("logout",req?req:{}).then(function(res){return trandata(res)})};

//获取国家
export const nationality_get = function(req){return $.post("nationality/get",req?req:{}).then(function(res){return trandata(res)})};

//会员管理
export const member_get = function(req){return $.post("member/get",req?req:{}).then(function(res){return trandata(res)})};
export const member_forbid_user = function(req){return $.post("member/forbid_user",req?req:{}).then(function(res){return trandata(res)})};
export const member_get_user = function(req){return $.post("member/get_user",req?req:{}).then(function(res){return trandata(res)})};

//财务管理
export const financing_add = function(req){return $.post("financing/add",req?req:{}).then(function(res){return trandata(res)})};
export const financing_remittance = function(req){return $.post("financing/remittance",req?req:{}).then(function(res){return trandata(res)})};


//系统管理
export const administrator_get =function(req){return $.post('administrator/get',req?req:{}).then(function(res){return trandata(res)})};
export const administrator_update =function(req){return $.post('administrator/update',req?req:{}).then(function(res){return trandata(res)})};
export const administrator_add =function(req){return $.post('administrator/add',req?req:{}).then(function(res){return trandata(res)})};
export const administrator_del =function(req){return $.post('administrator/del',req?req:{}).then(function(res){return trandata(res)})};
