<!--
 * @Author: abc
 * @Date: 2021-08-06 14:21:50
 * @LastEditors: abc
 * @LastEditTime: 2021-08-06 15:34:46
 * @Description: 
-->
<template>
  <div class="private">
    <div class="private-item">
      Segwit地址又称隔离见证地址。在比特币区块链上，经常可以看到类似bc1qmy63mjadtw8nhzl69ukdepwzsyvv4yex5qlmkd这样的以bc开头的地址，这种地址就是隔离见证地址。
      Segwit地址有好几种，一种是以3开头的隔离见证兼容地址（Nested Segwit
      Address），从该地址上无法区分到底是多签地址还是隔离见证兼容地址，好处是钱包程序不用修改，可直接付款到该地址。
      另一种是原生隔离见证地址（Native Segwit
      Address），即以bc开头的地址，它本质上就是一种新的编码方式。
    </div>
    <div class="private-item">生成bc开头地址两种方式：</div>
    <div class="private-item">第一种Bech32编码方式：</div>
    <div class="private-item">
      <pre class="mark">
      const bitcoin = require('bitcoinjs-lib'),
           bech32 = require('bech32'),
           createHash = require('create-hash');
     const keyPair = bitcoin.ECPair.fromWIF(
      'KwdMAjGmerYanjeui5SHS7JkmpZvVipYvB2LJGU1ZxJwYvP98617'
    );
      // 计算公钥:
      let pubKey = kecPair.publicKey; // 返回Buffer对象
      let publicKey  = pubKey.toString('hex'); // 02或03开头的压缩公钥
           // 计算hash160:
      let sha256 = createHash('sha256'),
          ripemd160 = createHash('ripemd160'),
          hash256 = sha256.update(Buffer.from(publicKey, 'hex')).digest(),
          hash160 = ripemd160.update(hash256).digest();

          // 计算bech32编码:
          let words = bech32.toWords(hash160);
          // 头部添加版本号0x00:
          words.unshift(0);
         // 对地址编码:
         let address = bech32.encode('bc', words);
         console.log(address); // bc1qmy63mjadtw8nhzl69ukdepwzsyvv4yex5qlmkd
       </pre
      >
    </div>
    <div class="private-item">
      <el-button type="primary" @click="handleAddressBech32">运行</el-button>
    </div>
    <div class="private-item">
      <span class="private-item-label">Bech32编码生成bc开头的地址：</span>
      <el-input v-model="addressBc" placeholder="请输入内容"></el-input>
    </div>
    <div class="private-item">
      <pre class="mark">
      const bitcoin = require('bitcoinjs-lib');
       const keyPair = bitcoin.ECPair.fromWIF(
      'KwdMAjGmerYanjeui5SHS7JkmpZvVipYvB2LJGU1ZxJwYvP98617'
    );
      // 生成以bc开头的地址
      p2wpkhBc.value = bitcoin.payments.p2wpkh({ pubkey: keyPair.publicKey });
      console.log(p2wpkhBc.value); //bc1qmy63mjadtw8nhzl69ukdepwzsyvv4yex5qlmkd
       </pre
      >
    </div>
    <div class="private-item">
      <el-button type="primary" @click="handleP2wpkh">运行</el-button>
    </div>
    <div class="private-item">
      <span class="private-item-label">bitcoin方法生成以bc开头的地址：</span>
      <el-input v-model="p2wpkhBc" placeholder="请输入内容"></el-input>
    </div>
    <div class="private-item">
      <pre class="mark">
      const bitcoin = require('bitcoinjs-lib');
       const keyPair = bitcoin.ECPair.fromWIF(
      'KwdMAjGmerYanjeui5SHS7JkmpZvVipYvB2LJGU1ZxJwYvP98617'
    );
    // 生成以3开头的地址
      const { address } = bitcoin.payments.p2sh({
        redeem: bitcoin.payments.p2wpkh({ pubkey: keyPair.publicKey })
      });
      console.log(address);//3D9iyFHi1Zs9KoyynUfrL82rGhJfYTfSG4
       </pre
      >
    </div>
    <div class="private-item">
      <el-button type="primary" @click="handleP2sh">运行</el-button>
    </div>
    <div class="private-item">
      <span class="private-item-label">bitcoin方法生成以3开头的地址：</span>
      <el-input v-model="p2sh3" placeholder="请输入内容"></el-input>
    </div>
  </div>
</template>
<script>
const bitcoin = require('bitcoinjs-lib'),
  createHash = require('create-hash'),
  sha256 = createHash('sha256'),
  ripemd160 = createHash('ripemd160');
import { bech32 } from 'bech32';
// import * as assert from 'assert';
import { ref } from 'vue';
export default {
  props: {},
  setup() {
    const addressBc = ref('');
    const p2wpkhBc = ref('');
    const p2sh3 = ref('');
    const keyPair = bitcoin.ECPair.fromWIF(
      'KwdMAjGmerYanjeui5SHS7JkmpZvVipYvB2LJGU1ZxJwYvP98617'
    );
    const handleAddressBech32 = () => {
      // 计算公钥:
      let pubKey = keyPair.publicKey; // 返回Buffer对象
      let publicKey = pubKey.toString('hex'); // 02或03开头的压缩公钥
      // 计算hash160:
      let hash256 = sha256.update(Buffer.from(publicKey, 'hex')).digest(),
        hash160 = ripemd160.update(hash256).digest();
      // 计算bech32编码:
      console.log(bech32);
      let words = bech32.toWords(hash160);
      console.log(words);
      // 头部添加版本号0x00:
      words.unshift(0);
      // 对地址编码:
      addressBc.value = bech32.encode('bc', words);
      console.log(addressBc.value); // bc1qmy63mjadtw8nhzl69ukdepwzsyvv4yex5qlmkd
    };
    const handleP2wpkh = () => {
      // 生成以bc开头的地址
      const { address } = bitcoin.payments.p2wpkh({
        pubkey: keyPair.publicKey
      });
      p2wpkhBc.value = address;
      console.log(p2wpkhBc.value); //bc1qmy63mjadtw8nhzl69ukdepwzsyvv4yex5qlmkd
    };
    const handleP2sh = () => {
      // 生成以3开头的地址
      const { address } = bitcoin.payments.p2sh({
        redeem: bitcoin.payments.p2wpkh({ pubkey: keyPair.publicKey })
      });
      p2sh3.value = address;
      console.log(p2sh3.value); // 3D9iyFHi1Zs9KoyynUfrL82rGhJfYTfSG4
    };
    return {
      addressBc,
      p2wpkhBc,
      p2sh3,
      handleP2wpkh,
      handleP2sh,
      handleAddressBech32
    };
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>
