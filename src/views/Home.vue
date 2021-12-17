<!--
 * @Author: abc
 * @Date: 2021-08-08 19:45:39
 * @LastEditors: abc
 * @LastEditTime: 2021-08-12 17:34:19
 * @Description: 首页
-->
<template>
  <div class="private">
    <div class="private-item">生成助记词1</div>
    <div class="private-item private-words" v-if="arrWord1.length">
      <span v-for="(item, index) in arrWord1" :key="index">
        {{ item }}
      </span>
    </div>
    <div class="private-item">生成测试私钥一：{{ privateKey1 }}</div>
    <div class="private-item">生成测试公钥一：{{ publicKey1 }}</div>
    <div class="private-item">生成测试地址一：{{ address1 }}</div>
    <div class="private-item">生成以1开头的地址：{{ addressBTC }}</div>
    <div class="private-item">生成BC地址一：{{ addressfFormal }}</div>
    <div class="private-item">生成助记词2</div>
    <div class="private-item private-words" v-if="arrWord2.length">
      <span v-for="(item, index) in arrWord2" :key="index">
        {{ item }}
      </span>
    </div>
    <div class="private-item">生成测试私钥二：{{ privateKey2 }}</div>
    <div class="private-item">生成测试公钥二：{{ publicKey2 }}</div>
    <div class="private-item">生成测试地址二：{{ address2 }}</div>
    <div class="private-item">生成以1开头的地址：{{ addressBTC2 }}</div>
    <div class="private-item">生成BC地址一：{{ addressfForma2 }}</div>
    <div class="private-item">
      <el-button type="primary" @click="handleTxs">交易</el-button>
    </div>
  </div>
</template>
<script>
import * as bitcoin from 'bitcoinjs-lib';
const bip39 = require('bip39');
const bip32 = require('bip32');
const request = require('request');
import { ref } from 'vue';
const TESTNET = bitcoin.networks.testnet;

const url = 'https://api.blockcypher.com/v1/btc/test3';
export default {
  methods: {
    yourCallbackFunction(user) {
      // gets user as an input
      // id, first_name, last_name, username,
      // photo_url, auth_date and hash
      console.log(user);
    }
  },
  setup() {
    let strWords = ref(''),
      arrWord1 = ref([]),
      arrWord2 = ref([]),
      privateKey1 = ref(''),
      publicKey1 = ref(''),
      address1 = ref(''),
      addressBTC = ref(''),
      addressfFormal = ref(''),
      privateKey2 = ref(''),
      publicKey2 = ref(''),
      address2 = ref(''),
      addressBTC2 = ref(''),
      addressfForma2 = ref(''),
      password = 'bitcoin';

    console.log(
      'Nothing here %cHi Cat %cHey Bear', // Console Message
      'color: red'
    );
    const words = bip39.generateMnemonic(160);
    console.log(words);
    /*  const words = bip39.generateMnemonic(160);
    console.log(words, '++++++++'); */
    // const words1 = bip39.generateMnemonic(160);
    const wordKey1 =
      'step velvet differ snack quiz music copy ivory fog arm dad group steak crawl zebra';
    const wordKey2 =
      'resource lift trip vapor fire rescue sheriff party immense hunt mad kick industry resource jealous';
    const handleWords = (words) => {
      const boo = bip39.validateMnemonic(words);
      console.log(boo);
      if (!boo) return false;
      const arrWords = words.split(' ');
      return arrWords;
    };

    strWords.value = wordKey1;
    arrWord1.value = handleWords(wordKey1);
    arrWord2.value = handleWords(wordKey2);
    // 生成私钥以及测试地址函数
    const handleGenerateKey = (words, password) => {
      // 计算seed:
      let seedBuffer = bip39.mnemonicToSeedSync(words, password);
      let seedHex = seedBuffer.toString('hex');
      console.log('seed: ' + seedHex); // b59a8078...c9ebfaaa
      // 生成root:
      let root = bip32.fromSeed(seedBuffer);
      // 生成派生key:
      // eslint-disable-next-line quotes
      let child = root.derivePath("m/44'/0'/0'/0/0");
      console.log(child);
      const objTest = bitcoin.payments.p2pkh({
        pubkey: child.publicKey,
        network: TESTNET
      });
      const address = objTest.address;
      const obj = bitcoin.payments.p2pkh({
        pubkey: child.publicKey
      });
      const objbc = bitcoin.payments.p2wpkh({
        pubkey: child.publicKey
      });
      const addressfFormal = objbc.address;
      const addressBTC = obj.address;
      console.log(bitcoin.ECPair.fromPrivateKey(child.privateKey).toWIF());
      const privateKey = child.toWIF(); //L2RVpW9CEoD93VTVXuiapBC6HCkWJBfnJ4ossCpoJT9ju2X5QU2w
      const publicKey = child.publicKey.toString('hex');
      return {
        privateKey,
        publicKey,
        address,
        addressfFormal,
        addressBTC
      };
    };
    const obj1 = handleGenerateKey(wordKey1, password);
    const obj2 = handleGenerateKey(wordKey2, password);
    privateKey1.value = obj1.privateKey;
    address1.value = obj1.address;
    publicKey1.value = obj1.publicKey;
    addressfFormal.value = obj1.addressfFormal;
    addressBTC.value = obj1.addressBTC;
    // log balance
    request.get(`${url}/addrs/${address1.value}/balance`, (err, req, body) => {
      console.log('balance => ', JSON.parse(body));
    });
    privateKey2.value = obj2.privateKey;
    publicKey2.value = obj2.publicKey;
    address2.value = obj2.address;
    addressfForma2.value = obj2.addressfFormal;
    addressBTC2.value = obj2.addressBTC;
    // log balance
    request.get(`${url}/addrs/${address2.value}/balance`, (err, req, body) => {
      console.log('balance => ', JSON.parse(body));
    });
    const handleTxs = () => {
      const keys = bitcoin.ECPair.fromWIF(privateKey2.value);
      var newtx = {
        outputs: [{ addresses: [address1.value], value: 20 }],
        inputs: [{ addresses: [address2.value] }]
      };
      // calling the new endpoint, same as above
      request.post(
        'https://api.blockcypher.com/v1/btc/test3/txs/new',
        { form: JSON.stringify(newtx) },
        (err, req, tmp) => {
          console.log(tmp);
          console.log('balance => ', JSON.parse(tmp));
          const tmptx = JSON.parse(tmp);
          tmptx.pubkeys = [];
          tmptx.signatures = tmptx.tosign.map(function (tosign) {
            tmptx.pubkeys.push(keys.publicKey.toString('hex'));
            return bitcoin.script.signature
              .encode(keys.sign(Buffer.from(tosign, 'hex')), 0x02)
              .toString('hex')
              .slice(0, -2);
          });
          console.log(JSON.stringify(tmptx));
          request.post(
            'https://api.blockcypher.com/v1/btc/test3/txs/send',
            { form: JSON.stringify(tmptx) },
            (err, req, tx) => {
              console.log(tx);
            }
          );
        }
      );
      /*  $.post(
        'https://api.blockcypher.com/v1/bcy/test/txs/new',
        JSON.stringify(newtx)
      ).then(function (tmptx) {
        // signing each of the hex-encoded string required to finalize the transaction
        tmptx.pubkeys = [];
        tmptx.signatures = tmptx.tosign.map(function (tosign) {
          tmptx.pubkeys.push(keys.publicKey.toString('hex'));
          return bitcoin.script.signature
            .encode(keys.sign(Buffer.from(tosign, 'hex')), 0x01)
            .toString('hex')
            .slice(0, -2);
        });
        // sending back the transaction with all the signatures to broadcast
        $.post(
          'https://api.blockcypher.com/v1/bcy/test/txs/send',
          JSON.stringify(tmptx)
        )
          .done(function (finaltx) {
            console.log(finaltx);
          })
          .fail(function (xhr) {
            console.log(xhr.responseText);
          });
      }); */
    };
    /* var newtx = {
      inputs: [{ addresses: [address2.value] }],
      outputs: [{ addresses: [address1.value], value: 1000 }]
    };
    request.post(
      'https://api.blockcypher.com/v1/btc/test3/txs/new',
      { form: JSON.stringify(newtx) },
      (err, req, body) => {
        console.log('balance => ', JSON.parse(body));
      }
    ); */

    return {
      strWords,
      arrWord1,
      arrWord2,
      privateKey1,
      publicKey1,
      address1,
      addressfFormal,
      addressBTC,
      privateKey2,
      publicKey2,
      handleTxs,
      address2,
      addressBTC2,
      addressfForma2
    };
  }
};
</script>
