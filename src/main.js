/*
 * @Author: abc
 * @Date: 2021-08-05 17:24:23
 * @LastEditors: abc
 * @LastEditTime: 2021-11-02 19:10:28
 * @Description:mian file
 */
import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import mixins from './plugins/mixins';
import util from './plugins/common';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
const localizedFormat = require('dayjs/plugin/localizedFormat');
dayjs.extend(localizedFormat);
const Web3 = require('web3');
const app = createApp(App);
app.provide('util', util);
dayjs.extend(utc);
// 配置全局属性
app.config.globalProperties.$util = util;
app.config.globalProperties.$timeUTC = (millisecond) => {
  if (millisecond) {
    return dayjs.utc(parseInt(millisecond) * 1000).format('LLL');
  }
};
app.use(store).use(router).use(ElementPlus).use(mixins).mount('#app');
app.config.globalProperties.$Web3 = Web3;
app.config.globalProperties.foo = 'foo';
