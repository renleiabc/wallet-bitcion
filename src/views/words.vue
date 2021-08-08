<!--
 * @Author: abc
 * @Date: 2021-08-06 16:26:41
 * @LastEditors: abc
 * @LastEditTime: 2021-08-06 19:21:03
 * @Description: 助记词
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
    <div class="private-item">生成中文助记词：{{ numWordCn }}</div>
    <div class="private-item private-words" v-if="arrWordCn.length">
      <span v-for="(item, index) in arrWordCn" :key="index">
        {{ item }}
      </span>
    </div>
    <div class="private-item">验证是否通过：{{ booWordCn }}</div>
    <div class="private-item">生成种子：{{ seedCn }}</div>
    <div class="private-item">
      <el-button type="primary" @click="handleWordCn">生成</el-button>
    </div>
    <div class="private-item">通过助记词生成计算出根扩展私钥</div>

    <div class="private-item">
      <pre class="mark">
         let wordKey =
      'bleak version runway tell hour unfold donkey defy digital abuse glide please omit much cement sea sweet tenant demise taste emerge inject cause link';
    arrWordKey.value = wordKey.split(' ');
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
      // 注意到以xprv开头的xprv9s21ZrQH...是512位扩展私钥的Base58编码，解码后得到的就是原始扩展私钥。
      console.log('xprv: ' + root.toBase58()); // xprv9s21ZrQH...uLgyr9kF
      console.log('xpub: ' + root.neutered().toBase58()); // xpub661MyMwA...oy32fcRG
      // 生成派生key:
      // eslint-disable-next-line quotes
      let child0 = root.derivePath("m/44'/0'/0'/0/0");
      const obj = bitcoin.payments.p2pkh({
        pubkey: child0.publicKey
      });
      privateKey.value = child0.toWIF();
      // eslint-disable-next-line quotes
      console.log("prv m/44'/0'/0'/0/0: " + child0.toWIF()); // KzuPk3PXKdnd6QwLqUCK38PrXoqJfJmACzxTaa6TFKzPJR7H7AFg
      // eslint-disable-next-line quotes
      address.value = obj.address;
      // eslint-disable-next-line quotes
      console.log("pub m/44'/0'/0'/0/0: " + obj.address); // 1PwKkrF366RdTuYsS8KWEbGxfP4bikegcS
    
      </pre>
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
  </div>
</template>
<script>
const bip39 = require('bip39');
const bip32 = require('bip32');
const bitcoin = require('bitcoinjs-lib');
import { ref } from 'vue';
export default {
  props: {},
  setup() {
    const strWords = ref(''),
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
    //生成中文助记词
    const handleWordCn = () => {
      console.log(bip39);
      // 第二个参数rng可以为null:
      const words = bip39.generateMnemonic(
        160,
        null,
        bip39.wordlists.chinese_simplified
      );
      strWordCn.value = words;
      arrWordCn.value = words.split(' ');
      numWordCn.value = words.split(' ').length;
      console.log(words.split(' ').length);
      console.log(words);
      booWordCn.value = bip39.validateMnemonic(words);
      console.log(booWordCn.value);
      console.log(bip39.wordlists.chinese_simplified);
      console.log(
        'is valid mnemonic? ' +
          bip39.validateMnemonic(bip39.wordlists.chinese_simplified, words)
      );
      let seedBuffer = bip39.mnemonicToSeedSync(words, password);
      let seedAsHex = seedBuffer.toString('hex');
      // or use bip39.mnemonicToSeedHex(words)
      seedCn.value = seedAsHex;
      console.log(seedAsHex);
    };
    let wordKey =
      'bleak version runway tell hour unfold donkey defy digital abuse glide please omit much cement sea sweet tenant demise taste emerge inject cause link';
    arrWordKey.value = wordKey.split(' ');
    const handleWordKey = () => {
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
    return {
      strWords,
      arrWords,
      numWords,
      booWords,
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
      handleWords,
      handleWordCn,
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
