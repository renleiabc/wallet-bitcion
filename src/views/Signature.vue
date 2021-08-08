<!--
 * @Author: abc
 * @Date: 2021-08-06 10:54:11
 * @LastEditors: abc
 * @LastEditTime: 2021-08-06 17:34:14
 * @Description: 签名
-->
<template>
  <div class="private">
    <div class="private-item">私钥签名：</div>
    <div class="private-item">
      <pre class="mark">
      const bitcoin = require('bitcoinjs-lib');
       let message = 'a secret message!', // 原始消息
        hash = bitcoin.crypto.sha256(message), // 消息哈希
        wif = 'KwdMAjGmerYanjeui5SHS7JkmpZvVipYvB2LJGU1ZxJwYvP98617',
        keyPair = bitcoin.ECPair.fromWIF(wif);
      // 用私钥签名:
      let signature = keyPair.sign(Buffer.from(hash, 'hex')); // ECSignature对象
      const SIGHASH_ALL = 0x02;
      const SIGHASH_NONE = bitcoin.Transaction.SIGHASH_NONE;
      console.log(SIGHASH_NONE);
      let encodedSignature = bitcoin.script.signature
        .encode(signature, SIGHASH_ALL)
        .toString('hex')
        .slice(0, -2);
      console.log(encodedSignature);
      // 打印公钥以便验证签名:
      console.log('public key = ' + keyPair.publicKey.toString('hex'));
       </pre
      >
    </div>
    <div class="private-item">
      <el-button type="primary" @click="handleSignatrue">运行</el-button>
    </div>
    <div class="private-item">
      <span class="private-item-label">blockcypher：</span>
      <el-input v-model="blockcypher" placeholder="请输入内容"></el-input>
    </div>
    <div class="private-item">
      <span class="private-item-label">生成私钥信息签名：</span>
      <el-input v-model="signature" placeholder="请输入内容"></el-input>
    </div>
    <div class="private-item">使用公钥进行签名进行验证:</div>
    <div class="private-item">
      <pre class="mark">
     let signAsStr =
        '304402205d0b6e817e01e22ba6ab19c0' +
        'ab9cdbb2dbcd0612c5b8f990431dd063' +
        '4f5a96530220188b989017ee7e830de5' +
        '81d4e0d46aa36bbe79537774d56cbe41' +
        '993b3fd66686' +
        '02';
      let signAsBuffer = Buffer.from(signAsStr, 'hex');
      let signature = bitcoin.script.signature.decode(signAsBuffer).signature; // ECSignature对象
      console.log(signature);
      let message = 'a secret message!'; // 原始消息
      // eslint-disable-next-line no-unused-vars
      let hash = bitcoin.crypto.sha256(message); // 消息哈希
      let pubKeyAsStr =
          '02d0de0aaeaefad02b8bdc8a01a1b8b11c696bd3d66a2c5f10780d95b7df42645c',
        pubKeyAsBuffer = Buffer.from(pubKeyAsStr, 'hex');
      // eslint-disable-next-line no-unused-vars
      let pubKeyOnly = bitcoin.ECPair.fromPublicKey(pubKeyAsBuffer); // 从public key构造ECPair
      let result = pubKeyOnly.verify(hash, signature);
      console.log('Verify result: ' + result);
       </pre
      >
    </div>
    <div class="private-item">
      <el-button type="primary" @click="handleBoo">运行</el-button>
    </div>
    <div class="private-item">
      <span class="private-item-label">验证是否通过：</span>
      <el-input v-model="boo" placeholder="请输入内容"></el-input>
    </div>
    <div class="private-item">多重签名:</div>
    <div class="private-item">
      <pre class="mark">
     const pubkeys = [
        '026477115981fe981a6918a6297d9803c4dc04f328f22041bedff886bbc2962e01',
        '02c96db2302d19b43d4c69368babace7854cc84eb9e061cde51cfa77ca4a22b8b9',
        '03c6103b3b83e4a24a0e33a4df246ef11772f9992663db0c35759a5e2ebf68d8e9'
      ].map((hex) => Buffer.from(hex, 'hex'));
      const { address } = bitcoin.payments.p2sh({
        redeem: bitcoin.payments.p2ms({ m: 2, pubkeys })
      });
      console.log(address); //36NUkt6FWUi3LAWBqWRdDmdTWbt91Yvfu7
     // 使用Base58编码即得到总是以3开头的多重签名地址，这个地址实际上是一个脚本哈希后的编码。
       以3开头的地址就是比特币的多重签名地址，但从地址本身无法得知签名所需的M/N。
       </pre
      >
    </div>
    <div class="private-item">
      <el-button type="primary" @click="handleMultisig">运行</el-button>
    </div>
    <div class="private-item">
      <span class="private-item-label">多重签名地址：</span>
      <el-input v-model="multisig" placeholder="请输入内容"></el-input>
    </div>
  </div>
</template>
<script>
const bitcoin = require('bitcoinjs-lib');
// import * as assert from 'assert';
import { ref } from 'vue';
var bip32 = require('bip32');
export default {
  props: {},
  setup() {
    const signature = ref('');
    const boo = ref('');
    const blockcypher = ref('');
    const multisig = ref('');
    const handleSignatrue = () => {
      let message = 'a secret message!'; // 原始消息
      let hash = bitcoin.crypto.sha256(message); // 消息哈希
      let wif = 'KwdMAjGmerYanjeui5SHS7JkmpZvVipYvB2LJGU1ZxJwYvP98617';
      let keyPair = bitcoin.ECPair.fromWIF(wif);
      // 用私钥签名:
      let objSignature = keyPair.sign(Buffer.from(hash, 'hex')); // ECSignature对象
      console.log(Buffer.from(hash, 'hex').toString('hex'));
      const SIGHASH_ALL = 0x02;
      const SIGHASH_NONE = bitcoin.Transaction.SIGHASH_NONE;
      console.log(SIGHASH_NONE);
      blockcypher.value = bitcoin.script.signature
        .encode(objSignature, SIGHASH_ALL)
        .toString('hex');
      signature.value = bitcoin.script.signature
        .encode(objSignature, SIGHASH_ALL)
        .toString('hex')
        .slice(0, -2);
      console.log(signature.value);
    };
    const handleBoo = () => {
      let signAsStr =
        '304402205d0b6e817e01e22ba6ab19c0' +
        'ab9cdbb2dbcd0612c5b8f990431dd063' +
        '4f5a96530220188b989017ee7e830de5' +
        '81d4e0d46aa36bbe79537774d56cbe41' +
        '993b3fd66686' +
        '02';
      let signAsBuffer = Buffer.from(signAsStr, 'hex');
      console.log(bitcoin);
      let signature = bitcoin.script.signature.decode(signAsBuffer).signature; // ECSignature对象
      console.log(signature);
      let message = 'a secret message!'; // 原始消息
      // eslint-disable-next-line no-unused-vars
      let hash = bitcoin.crypto.sha256(message); // 消息哈希
      let pubKeyAsStr =
          '02d0de0aaeaefad02b8bdc8a01a1b8b11c696bd3d66a2c5f10780d95b7df42645c',
        pubKeyAsBuffer = Buffer.from(pubKeyAsStr, 'hex');
      // eslint-disable-next-line no-unused-vars
      let pubKeyOnly = bitcoin.ECPair.fromPublicKey(pubKeyAsBuffer); // 从public key构造ECPair
      let result = pubKeyOnly.verify(hash, signature);
      boo.value = 'Verify result: ' + result;
      console.log('Verify result: ' + result);
    };
    const handleMultisig = () => {
      console.log(bip32);
      const pubkeys = [
        '026477115981fe981a6918a6297d9803c4dc04f328f22041bedff886bbc2962e01',
        '02c96db2302d19b43d4c69368babace7854cc84eb9e061cde51cfa77ca4a22b8b9',
        '03c6103b3b83e4a24a0e33a4df246ef11772f9992663db0c35759a5e2ebf68d8e9'
      ].map((hex) => Buffer.from(hex, 'hex'));
      const { address } = bitcoin.payments.p2sh({
        redeem: bitcoin.payments.p2ms({ m: 2, pubkeys })
      });
      multisig.value = address;
      console.log(address); //36NUkt6FWUi3LAWBqWRdDmdTWbt91Yvfu7
    };
    return {
      boo,
      signature,
      blockcypher,
      handleSignatrue,
      handleBoo,
      multisig,
      handleMultisig
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
