<!--
 * @Author: abc
 * @Date: 2021-07-28 17:31:16
 * @LastEditors: abc
 * @LastEditTime: 2021-08-06 11:02:15
 * @Description: 私钥
-->
<template>
  <div class="private">
    <div class="private-item">
      <pre class="mark">
      const bitcoin = require('bitcoinjs-lib');

      let testnet = bitcoin.networks.testnet;

      let keyPair = bitcoin.ECPair.makeRandom(testnet).privateKey.toString('hex');
       </pre
      >
    </div>
    <div class="private-item">
      <el-button type="primary" @click="handleGenerate">运行</el-button>
    </div>
    <div class="private-item">
      <span class="private-item-label">生成私钥：</span>
      <el-input v-model="privateKey" placeholder="请输入内容"></el-input>
    </div>
    <div class="private-item">
      对私钥进行Base58编码有两种方式，一种是非压缩的私钥格式，一种是压缩的私钥格式，它们分别对应非压缩的公钥格式和压缩的公钥格式。
    </div>
    <div class="private-item">使用wif这个库实现WIF编码：</div>
    <!-- 非压缩格式私钥 -->
    <div class="private-item">
      <pre class="mark">
    const wif = require('wif');
    // 十六进制表示的私钥:
    let privateKey = '0c28fca386c7a227600b2fe50b7cae11ec86d3bf1fbe471be89827e19d72aa1d';
    // 对私钥编码:
    let encoded = wif.encode(
        0x80, // 0x80前缀
        Buffer.from(privateKey, 'hex'), // 转换为字节
        false // 非压缩格式
   );
       </pre
      >
    </div>
    <div class="private-item">
      <el-button type="primary" @click="handleCompress(false)">运行</el-button>
    </div>
    <div class="private-item">
      <span class="private-item-label">生成非压缩私钥：</span>
      <el-input v-model="noCompressKey" placeholder="请输入内容"></el-input>
    </div>
    <!-- 压缩格式私钥 -->
    <div class="private-item">
      <pre class="mark">
    const wif = require('wif');
    // 十六进制表示的私钥:
    let privateKey = '0c28fca386c7a227600b2fe50b7cae11ec86d3bf1fbe471be89827e19d72aa1d';
    // 对私钥编码:
    let encoded = wif.encode(
        0x80,  // 0x80前缀
        Buffer.from(privateKey, 'hex'), // 转换为字节
        true  // 压缩格式
   );
       </pre
      >
    </div>
    <div class="private-item">
      <el-button type="primary" @click="handleCompress(true)">运行</el-button>
    </div>
    <div class="private-item">
      <span class="private-item-label">生成压缩私钥：</span>
      <el-input v-model="compressKey" placeholder="请输入内容"></el-input>
    </div>
    <!-- bitcoinjs提供的ECPair生成压缩格式的私钥 -->
    <div class="private-item">
      使用bitcoinjs提供的ECPair生成压缩格式的私钥：
    </div>
    <div class="private-item">
      <pre class="mark">
    const bitcoin = require('bitcoinjs-lib');
    // 十六进制表示的私钥:
    let privateKey = '0c28fca386c7a227600b2fe50b7cae11ec86d3bf1fbe471be89827e19d72aa1d';
    // 对私钥编码:
    const encoded = bitcoin.ECPair.fromPrivateKey(Buffer.from(key, 'hex')).toWIF();
    console.log(keyss.toWIF());
       </pre
      >
    </div>
    <div class="private-item">
      <el-button type="primary" @click="handleEncoded">运行</el-button>
    </div>
    <div class="private-item">
      <span class="private-item-label">生成压缩私钥：</span>
      <el-input v-model="encoded" placeholder="请输入内容"></el-input>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
const bitcoin = require('bitcoinjs-lib');
var bip39 = require('bip39');
// eslint-disable-next-line no-unused-vars
var bip32 = require('bip32');
const wif = require('wif');
// eslint-disable-next-line no-unused-vars
const BigInteger = require('bigi');
import { ref } from 'vue';
// var ethUtil = require('ethereumjs-util');
export default {
  name: 'Home',
  setup() {
    const privateKey = ref('');
    const noCompressKey = ref('');
    const compressKey = ref('');
    const encoded = ref('');
    const handleGenerate = () => {
      let testnet = bitcoin.networks.testnet;
      privateKey.value =
        bitcoin.ECPair.makeRandom(testnet).privateKey.toString('hex');
    };
    const handleCompress = (boo) => {
      // 十六进制表示的私钥:
      let privateKey =
        '0c28fca386c7a227600b2fe50b7cae11ec86d3bf1fbe471be89827e19d72aa1d';
      // 对私钥编码:
      const obj = boo ? compressKey : noCompressKey;
      obj.value = wif.encode(
        0x80, // 0x80前缀
        Buffer.from(privateKey, 'hex'), // 转换为字节
        boo // false非压缩格式,true压缩格式
      );
    };
    const handleEncoded = () => {
      console.log('+++++');
      const priv =
        '0c28fca386c7a227600b2fe50b7cae11ec86d3bf1fbe471be89827e19d72aa1d';
      encoded.value = bitcoin.ECPair.fromPrivateKey(
        Buffer.from(priv, 'hex')
      ).toWIF();
      console.log(encoded);
    };
    return {
      privateKey,
      noCompressKey,
      compressKey,
      encoded,
      handleGenerate,
      handleCompress,
      handleEncoded
    };
  },
  components: {},
  mounted() {
    //  var masterKey = bitcoin.HDNode.fromSeedHex(seed, bitcoin.networks.bitcoin);
    // console.log(masterKey);
    /*  // console.log("BTC");

    // 存到localStorage中bip39种子
    localStorage.setItem('masterKey', JSON.stringify(masterKey.toBase58()));
    console.log('root Key：' + masterKey.toBase58());
 */
    /*  var bip32ExtendedKey = masterKey.derivePath("m/44'/0'/0'/0");
    // console.log("btc：BIP32 Extended Private Key：" + bip32ExtendedKey.toBase58())

    var key = bip32ExtendedKey.derive(0);
    // console.log(key);
    var keyPair = key.keyPair;
    // console.log(keyPair);
    var address = keyPair.getAddress().toString();
    //  存到localStorage中btc公钥还有密钥
    localStorage.setItem('BTCaddress', JSON.stringify(address));
    // console.log("btc地址：" + address);
    var privkey = keyPair.toWIF();
    //  存到localStorage中btc私钥
    localStorage.setItem('privBTC', JSON.stringify(privkey));
    // console.log("btc私钥：" + privkey);
    var pubkey = keyPair.getPublicKeyBuffer().toString('hex');
    localStorage.setItem('publBTC', JSON.stringify(pubkey));
    // console.log("btc公钥：" + pubkey);

    // var bip32ExtendedKey = masterKey.derivePath("m/44'/60'/0'/0");
    // console.log("ETH：BIP32 Extended Private Key：" + bip32ExtendedKey.toBase58())
    key = bip32ExtendedKey.derive(0); */

    // console.log(key);
    this.generatePrivateKey();
  },
  methods: {
    generate() {
      var mnemonic = bip39.generateMnemonic(160);
      // 第二个参数rng可以为null:
      var words = bip39.generateMnemonic(
        160,
        null,
        bip39.wordlists.chinese_simplified
      );
      console.log(words);
      console.log(mnemonic);
      console.log('is valid mnemonic? ' + bip39.validateMnemonic(mnemonic));
      const arr = mnemonic.split(' ');
      // 存到localStorage中单词
      var mnemonicArr = mnemonic.replace(/\s+/g, ',').split(',');
      localStorage.setItem('mnemonic', JSON.stringify(mnemonicArr));
      console.log(arr);
      // console.log(bip32.generateMnemonic());
      console.log(bitcoin.networks);
      //console.log(bitcoin.HDNode.fromSeedHex);
      //var seedHex = bip39.mnemonicToSeedHex(mnemonic);
      // console.log(seedHex);
      // e28f392a5cfdf604054a6c961f8ba83a501b57e69ddb29f419289402e0b9d28d199f4986011e3dd720e4d8fe84f93d1fce444d825561a23d84c044b977d27cab
      //e28f392a5cfdf604054a6c961f8ba83a501b57e69ddb29f419289402e0b9d28d199f4986011e3dd720e4d8fe84f93d1fce444d825561a23d84c044b977d27cab
      var seed = bip39.mnemonicToSeedSync(
        'diet section jump truck strong trumpet chapter double pottery whisper judge group pig copy better skin stem peace train entry marriage valve arrange steak'
      );
      console.log(seed);
      var seedAsHex = seed.toString('hex');

      // 存到localStorage中bip39种子
      localStorage.setItem('seed', JSON.stringify(seedAsHex));
      console.log('种子：' + seedAsHex);
    },
    generatePrivateKey() {
      //  let keyPair = bitcoin.ECPair.makeRandom();
      // console.log(keyPair);
      let testnet = bitcoin.networks.testnet;
      let keyPair = bitcoin.ECPair.makeRandom(testnet);
      // 打印私钥:
      console.log(keyPair);
      console.log(keyPair.privateKey.toString('hex'));
      /* const keys = ECPair.fromPrivateKey(
        Buffer.from(my_hex_private_key, 'hex')
      ); */

      // let addr = keyPair.getAddress();
      let pk = keyPair.toWIF();

      console.log('private key = ' + pk);
      //  const privateKey = this.uint8Array(keyPair.privateKey);
      const key =
        '0c28fca386c7a227600b2fe50b7cae11ec86d3bf1fbe471be89827e19d72aa1d';
      // 对私钥编码:
      let encoded = wif.encode(
        0x80, // 0x80前缀
        Buffer.from(key, 'hex'), // 转换为字节
        true // false非压缩格式,true 压缩格式
      );
      console.log(encoded);
      /*   const d = BigInteger.fromBuffer(Buffer.from(privateKey, 'hex'));
      console.log(d); */
      //   const keyPair1 = new bitcoin.ECPair(d);
      const keyss = bitcoin.ECPair.fromPrivateKey(Buffer.from(key, 'hex'));
      console.log(keyss.toWIF());
      let keyWif = 'KwdMAjGmerYanjeui5SHS7JkmpZvVipYvB2LJGU1ZxJwYvP98617',
        ecPair = bitcoin.ECPair.fromWIF(keyWif); // 导入私钥
      // 计算公钥:
      console.log(ecPair);
      let pubKey = ecPair.publicKey; // 返回Buffer对象
      console.log(pubKey.toString('hex')); // 02或03开头的压缩公钥
      let publicKey =
        '02d0de0aaeaefad02b8bdc8a01a1b8b11c696bd3d66a2c5f10780d95b7df42645c';
      const { address } = bitcoin.payments.p2pkh({
        pubkey: Buffer.from(publicKey, 'hex')
      });
      console.log('address=', address);
      // 1LoVGDgRs9hTfTNJNuXKSpywcbdvwRXpmK
      // 1LoVGDgRs9hTfTNJNuXKSpywcbdvwRXpmK
      // 02d0de0aaeaefad02b8bdc8a01a1b8b11c696bd3d66a2c5f10780d95b7df42645c
      // 02d0de0aaeaefad02b8bdc8a01a1b8b11c696bd3d66a2c5f10780d95b7df42645c
      // KwdMAjGmerYanjeui5SHS7JkmpZvVipYvB2LJGU1ZxJwYvP98617
      // KwdMAjGmerYanjeui5SHS7JkmpZvVipYvB2LJGU1ZxJwYvP98617
      // 打印WIF格式的私钥:
      // console.log(keyPair1.toWIF());
      //  const int1 = this.Uint8ArrayToString(keyPair.privateKey);
      // console.log('hex = ' + int1.toHex());
      // 以十六进制打印:
      // console.log('hex = ' + keyPair.d.toHex());
      // 补齐32位:
      // console.log('hex = ' + keyPair.d.toHex(32));
      let message = 'a secret message!', // 原始消息
        hash = bitcoin.crypto.sha256(message), // 消息哈希
        wif1 = 'KwdMAjGmerYanjeui5SHS7JkmpZvVipYvB2LJGU1ZxJwYvP98617',
        keyPair1 = bitcoin.ECPair.fromWIF(wif1);
      console.log(keyPair1);
      // 用私钥签名:
      let signature = keyPair1.sign(Buffer.from(hash, 'hex')); // ECSignature对象
      console.log(Buffer.from(hash, 'hex').toString('hex'));
      const SIGHASH_ALL = 0x02;
      const SIGHASH_NONE = bitcoin.Transaction.SIGHASH_NONE;
      console.log(SIGHASH_NONE);
      let encodedSignature = bitcoin.script.signature
        .encode(signature, SIGHASH_ALL)
        .toString('hex')
        .slice(0, -2);
      console.log(signature);
      //304402205d0b6e817e01e22ba6ab19c0ab9cdbb2dbcd0612c5b8f990431dd0634f5a96530220188b989017ee7e830de581d4e0d46aa36bbe79537774d56cbe41993b3fd66686
      // 304402205d0b6e817e01e22ba6ab19c0ab9cdbb2dbcd0612c5b8f990431dd0634f5a96530220188b989017ee7e830de581d4e0d46aa36bbe79537774d56cbe41993b3fd6668602
      // 打印签名:
      console.log('signature = ' + encodedSignature);
      // 打印公钥以便验证签名:
      console.log('public key = ' + keyPair1.publicKey.toString('hex'));
    }
  }
};
</script>
