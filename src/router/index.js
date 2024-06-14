import Vue from 'vue'
import Router from 'vue-router'

// 1. 定义（路由）组件。
import ClientList from '@/views/ClientList.vue'
import ClientInfo from '@/views/ClientInfo.vue'

Vue.use(Router)

// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
export default new Router({
    routes: [
        {
            // 根路由
            path: '/',
            name: 'ClientList',
            component: ClientList,
        },
        {
            path: '/ClientInfo',
            name: 'ClientInfo',
            component: ClientInfo  
        }
    ]
})