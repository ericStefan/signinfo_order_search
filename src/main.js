import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import axios from 'axios';

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(router);

Vue.prototype.$axios = axios //全局注册，使用方法为:this.$axios


Vue.config.productionTip = false
if (process.env.NODE_ENV !== 'production') {
  // 在非生产模式下使用mock
 require('@/mock');
}

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
