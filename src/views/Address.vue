<!--
 * @Author: abc
 * @Date: 2021-08-05 17:24:23
 * @LastEditors: abc
 * @LastEditTime: 2021-08-06 11:22:49
 * @Description: 公钥和地址
-->
<template>
  <div class="private">
    <div class="private-item">根据私钥推算出公钥：</div>
    <div class="private-item">
      <pre class="mark">
      const bitcoin = require('bitcoinjs-lib');

      let keyWif = 'KwdMAjGmerYanjeui5SHS7JkmpZvVipYvB2LJGU1ZxJwYvP98617';

      const ecPair = bitcoin.ECPair.fromWIF(keyWif); // 导入私钥
      // 计算公钥:
      let pubKey = ecPair.publicKey; // 返回Buffer对象

      console.log(pubKey.toString('hex')); // 02或03开头的压缩公钥
       </pre
      >
    </div>
    <div class="private-item">
      <el-button type="primary" @click="handlePublicKey">运行</el-button>
    </div>
    <div class="private-item">
      <span class="private-item-label">生成压缩公钥：</span>
      <el-input v-model="publicKey" placeholder="请输入内容"></el-input>
    </div>
    <div class="private-item">实现公钥到地址的编码:</div>
    <div class="private-item">
      <pre class="mark">
      const bitcoin = require('bitcoinjs-lib');

      let publicKey = '02d0de0aaeaefad02b8bdc8a01a1b8b11c696bd3d66a2c5f10780d95b7df42645c';
      const { address } = bitcoin.payments.p2pkh({
        pubkey: Buffer.from(publicKey, 'hex')
      });
      console.log('address=', address);// 1开头的地址
       </pre
      >
    </div>
    <div class="private-item">
      <el-button type="primary" @click="handleAddress">运行</el-button>
    </div>
    <div class="private-item">
      <span class="private-item-label">生成压缩公钥：</span>
      <el-input v-model="address" placeholder="请输入内容"></el-input>
    </div>
  </div>
</template>
<script>
const bitcoin = require('bitcoinjs-lib');
import { ref, getCurrentInstance, inject } from 'vue';

export default {
  props: {},
  data() {
    return {};
  },
  setup() {
    console.log(getCurrentInstance());
    console.log(inject('util'));
    const { uint8Array } = inject('util');
    const publicKey = ref('');
    const address = ref('');
    const handlePublicKey = () => {
      let keyWif = 'KwdMAjGmerYanjeui5SHS7JkmpZvVipYvB2LJGU1ZxJwYvP98617';
      const ecPair = bitcoin.ECPair.fromWIF(keyWif); // 导入私钥
      // 计算公钥:
      let pubKey = ecPair.publicKey; // 返回Buffer对象
      console.log(uint8Array(ecPair.publicKey));
      publicKey.value = pubKey.toString('hex'); // 02或03开头的压缩公钥
    };
    //
    const handleAddress = () => {
      let publicKey1 =
        '02d0de0aaeaefad02b8bdc8a01a1b8b11c696bd3d66a2c5f10780d95b7df42645c';
      const obj = bitcoin.payments.p2pkh({
        pubkey: Buffer.from(publicKey1, 'hex')
      });
      console.log(obj);
      // 1LoVGDgRs9hTfTNJNuXKSpywcbdvwRXpmK
      address.value = obj.address;
    };
    return {
      publicKey,
      address,
      handleAddress,
      handlePublicKey
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>
