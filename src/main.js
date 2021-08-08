/*
 * @Author: abc
 * @Date: 2021-08-05 17:24:23
 * @LastEditors: abc
 * @LastEditTime: 2021-08-06 10:49:14
 * @Description:mian file
 */
import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import mixins from './plugins/mixins';
import util from './plugins/common';
const app = createApp(App);
app.provide('util', util);
// 配置全局属性
app.config.globalProperties.$util = util;
app.use(store).use(router).use(ElementPlus).use(mixins).mount('#app');
