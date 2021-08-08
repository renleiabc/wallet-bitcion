<!--
 * @Author: abc
 * @Date: 2021-08-07 18:37:09
 * @LastEditors: abc
 * @LastEditTime: 2021-08-08 00:31:30
 * @Description: 余额
-->
<template>
  <div class="private">
    <div class="private-item">生成助记词</div>
    <div class="private-item">生成英文助记词：{{ numWords }}</div>
    <div class="private-item private-words" v-if="arrWords.length">
      <span v-for="(item, index) in arrWords" :key="index">
        {{ item }}
      </span>
    </div>
    <div class="private-item">验证是否通过：{{ booWords }}</div>
    <div class="private-item">生成种子：{{ seeds }}</div>
    <div class="private-item">
      <el-button type="primary" @click="handleWords">生成</el-button>
    </div>
    <div class="private-item private-words" v-if="arrWordKey.length">
      <span v-for="(item, index) in arrWordKey" :key="index">
        {{ item }}
      </span>
    </div>
    <div class="private-item">
      <el-button type="primary" @click="handleWordKey">生成</el-button>
    </div>
    <div class="private-item">种子：{{ seedKey }}</div>
    <div class="private-item">xprv：{{ xprv }}</div>
    <div class="private-item">xpub：{{ xpub }}</div>
    <div class="private-item">privateKey：{{ privateKey }}</div>
    <div class="private-item">publicKey：{{ publicKey }}</div>
    <div class="private-item">生成以1开头的地址：{{ address }}</div>
    <div class="private-item">生成以bc开头的地址：{{ addressBc }}</div>
    <div class="private-item">生成以3开头的地址：{{ address3 }}</div>
    <div class="private-item">
      比特币测试地址：mt4fp9zbXxTxV2KvqpbzHCDhPcWEx9Kr4o
    </div>
  </div>
</template>
<script>
const bip39 = require('bip39');
const bip32 = require('bip32');
const bitcoin = require('bitcoinjs-lib');
import { ref } from 'vue';
const request = require('request');
export default {
  props: {},
  setup() {
    let strWords = ref(''),
      arrWords = ref([]),
      numWords = ref(0),
      booWords = ref(false),
      seeds = ref(''),
      strWordCn = ref(''),
      arrWordCn = ref([]),
      numWordCn = ref(0),
      booWordCn = ref(false),
      seedCn = ref(''),
      seedKey = ref(''),
      xprv = ref(''),
      xpub = ref(''),
      privateKey = ref(''),
      publicKey = ref(''),
      address = ref(''),
      addressBc = ref(''),
      address3 = ref(''),
      arrWordKey = ref([]),
      password = 'bitcoin';
    const handleWords = () => {
      const words = bip39.generateMnemonic(160);
      strWords.value = words;
      arrWords.value = words.split(' ');
      numWords.value = words.split(' ').length;
      console.log(words.split(' ').length);
      console.log(words);
      booWords.value = bip39.validateMnemonic(words);
      console.log('is valid mnemonic? ' + bip39.validateMnemonic(words));
      let seedBuffer = bip39.mnemonicToSeedSync(words, password);
      let seedAsHex = seedBuffer.toString('hex');
      // or use bip39.mnemonicToSeedHex(words)
      seeds.value = seedAsHex;
      console.log(seedAsHex);
    };
    let wordKey =
      'library junior special parrot dry boring taste before round slush cotton together they boss response';
    arrWordKey.value = wordKey.split(' ');
    const handleWordKey = () => {
      const boo = bip39.validateMnemonic(wordKey);
      console.log(boo);
      if (!boo) {
        alert('助记词错误');
      }
      // 计算seed:
      let seedBuffer = bip39.mnemonicToSeedSync(wordKey, password);
      let seedHex = seedBuffer.toString('hex');
      console.log('seed: ' + seedHex); // b59a8078...c9ebfaaa
      seedKey.value = seedHex;
      console.log(bip32);
      // 生成root:
      let root = bip32.fromSeed(seedBuffer);
      console.log(root);
      xprv.value = root.toBase58();
      xpub.value = root.neutered().toBase58();
      console.log('xprv: ' + root.toBase58()); // xprv9s21ZrQH...uLgyr9kF
      console.log('xpub: ' + root.neutered().toBase58()); // xpub661MyMwA...oy32fcRG
      // 生成派生key:
      // eslint-disable-next-line quotes
      let child0 = root.derivePath("m/44'/0'/0'/0/0");
      // 生成以1开头的地址：
      const obj = bitcoin.payments.p2pkh({
        pubkey: child0.publicKey
      });
      privateKey.value = child0.toWIF();
      publicKey.value = child0.publicKey.toString('hex');
      // 生成以bc开头的地址：
      const objBc = bitcoin.payments.p2wpkh({
        pubkey: child0.publicKey
      });
      privateKey.value = child0.toWIF();
      // 生成以3开头的地址：
      const obj3 = bitcoin.payments.p2sh({
        redeem: bitcoin.payments.p2wpkh({ pubkey: child0.publicKey })
      });
      privateKey.value = child0.toWIF();
      // eslint-disable-next-line quotes
      console.log("prv m/44'/0'/0'/0/0: " + child0.toWIF()); // KzuPk3PXKdnd6QwLqUCK38PrXoqJfJmACzxTaa6TFKzPJR7H7AFg
      // eslint-disable-next-line quotes
      address.value = obj.address;
      addressBc.value = objBc.address;
      address3.value = obj3.address;
      // eslint-disable-next-line quotes
      console.log("pub m/44'/0'/0'/0/0: " + obj.address); // 1PwKkrF366RdTuYsS8KWEbGxfP4bikegcS
    };
    const TESTNET = bitcoin.networks.testnet;
    console.log(TESTNET);
    const keyPair = bitcoin.ECPair.makeRandom({ network: TESTNET });
    console.log(keyPair.publicKey);
    const objTest = bitcoin.payments.p2pkh({
      pubkey: keyPair.publicKey,
      network: TESTNET
    });
    console.log(objTest.address);
    // https://explorer.api.bitcoin.com/bch/v1/addr/1PoqKNokgoBFExPRsLjctHoDTAEZobCK9h
    // https://explorer.api.bitcoin.com/bch/v1/txs/?address=1PoqKNokgoBFExPRsLjctHoDTAEZobCK9h&pageNum=0
    let addr = '1PoqKNokgoBFExPRsLjctHoDTAEZobCK9h';
    let apiUrl = 'https://explorer.api.bitcoin.com/bch/v1';
    let address1 = 'mt4fp9zbXxTxV2KvqpbzHCDhPcWEx9Kr4o';
    // log unspent transactions
    request.get(
      `${apiUrl}/txs/?address=${addr}&pageNum=0`,
      (err, req, body) => {
        console.log('utxo => ', JSON.parse(body));
      }
    );
    // log balance
    request.get(`${apiUrl}/addr/${addr}`, (err, req, body) => {
      console.log('balance => ', JSON.parse(body));
    });
    // log balance
    request.get(
      `https://blockchain.info/rawaddr/${address1}`,
      (err, req, body) => {
        console.log('balance => ', JSON.parse(body));
      }
    );
    return {
      strWords,
      arrWords,
      numWords,
      booWords,
      handleWords,
      seeds,
      strWordCn,
      arrWordCn,
      numWordCn,
      booWordCn,
      seedCn,
      seedKey,
      xprv,
      xpub,
      privateKey,
      publicKey,
      address,
      addressBc,
      address3,
      arrWordKey,
      handleWordKey
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
