<!--
 * @Author: abc
 * @Date: 2021-08-05 17:24:23
 * @LastEditors: abc
 * @LastEditTime: 2021-08-08 19:55:11
 * @Description: 
-->
<template>
  <el-container>
    <el-header>
      <div id="nav">
        <router-link to="/">首页</router-link> |
        <router-link to="/transfer">转账</router-link> |
        <router-link to="/record">记录</router-link> |
        <router-link to="/uni">UNI 代币转账</router-link>|
        <router-link to="/web3">Web3 方法汇总</router-link>
      </div>
    </el-header>
    <el-main>
      <el-row justify="center">
        <el-col :span="16">
          <router-view />
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<style lang="scss">
@import './assets/index.scss';
</style>
