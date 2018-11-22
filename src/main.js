// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import layer from 'vue-layer'
import VueWechatTitle from 'vue-wechat-title';
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/scss/base.scss'
import '@/assets/api/comm'
import './assets/js/layer/theme/default/layer.css'
import '@/assets/js/lightbox/lightbox.min'
import '@/assets/js/lightbox/lightbox.min.css'
import '@/assets/js/fonticons/iconfont.css'

import '@/assets/scss/member.scss'

Vue.use(VueWechatTitle) //动态设置网站title
Vue.use(ElementUI);
Vue.prototype.$layer = layer(Vue);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
