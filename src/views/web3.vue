<template>
  <div>
    <i class="iconfont el-supply-chain"></i>
    <i class="iconfont el-gerenzhuye"></i>
    <i class="iconfont el-a-059"></i>
    <div>连接网络的ID：{{ chainId }}</div>
    <div>网络类型：{{ private1 }}</div>
    <div>获取正在连接的对等节点的数量：{{ peer }}</div>
    <div>查看当前节点是否正在连接其它对等节点:{{ isListening }}</div>
    <button @click="handleTrade">发送交易</button>
  </div>
</template>

<script>
const Web3 = require('web3');
const Tx = require('ethereumjs-tx');
const common = require('ethereumjs-common');
const linkJSON = require('../plugins/abi/link.json');
// eslint-disable-next-line no-unused-vars
const contractAddress = '0x01BE23585060835E02B77ef475b0Cc51aA1e0709';
console.log(linkJSON);
// eslint-disable-next-line no-unused-vars
var address1 = '0x59e85dDEaD68cc50Cd861fE2F992d9F3F20477cc';
// eslint-disable-next-line no-unused-vars
const testUrl = 'https://kovan.infura.io/v3/864b6f681de34c9a8ef2270575ad4592';
// eslint-disable-next-line no-unused-vars
const mainUrl = 'https://mainnet.infura.io/v3/864b6f681de34c9a8ef2270575ad4592';
// eslint-disable-next-line no-unused-vars
const binance = 'https://http-testnet.hecochain.com';
// eslint-disable-next-line no-unused-vars
const testnet = 'https://data-seed-prebsc-1-s1.binance.org:8545';
// eslint-disable-next-line no-unused-vars
const rinkeby = 'https://rinkeby.infura.io/v3/864b6f681de34c9a8ef2270575ad4592';
// eslint-disable-next-line no-unused-vars
const bian = 'https://data-seed-prebsc-1-s1.binance.org:8545';
const web3 = new Web3(new Web3.providers.HttpProvider(rinkeby));
const address = '0x51F8507c8dEd46e42522044A2E570912B7A38AE4';
const getEthBalance = async () => {
  const res = await web3.eth.getBalance(address);
  console.log(res);
  const ethBalance = web3.utils.fromWei(`${res}`, 'ether');
  console.log(ethBalance);
  return ethBalance;
};
getEthBalance();
// eslint-disable-next-line no-unused-vars
const getTokenBalance = async (contractAddress, contractABI) => {
  const tokenContract = new web3.eth.Contract(contractABI, contractAddress);
  const res = await tokenContract.methods.balanceOf(address).call();
  console.log(res);
  const balance = web3.utils.fromWei(`${res}`, 'ether');
  console.log(balance);
  return balance;
};
// getTokenBalance(contractAddress, linkJSON);
const sendEthTransfer = async (
  privateKey, // 私钥
  fromAddress, // 转出账户的地址
  toAddress, // 转入账户的地址
  amount, // 转账的金额
  symbol, // 币种符号，币安链的币种符号是 BNB，火币链的币种符号 HT
  callback // 转账后的回调函数，进行交易后的处理
) => {
  // 获取余额
  const res = await web3.eth.getBalance(fromAddress);
  const balance = web3.utils.fromWei(`${res}`, 'ether');
  // 获取单个gas的价值，最先小单位是wei
  const gasPrice = await web3.eth.getGasPrice();
  // const weiPrice = web3.toWei(gasPrice, 'Gwei');
  // 区块gas limit是单个区块允许的最多gas总量，以此可以用来决定单个区块中能打包多少笔交易。目前使用的gas limit为21000，有时候设置为30000
  const gasLimit = 21000;
  const gasFee = (parseInt(gasLimit) * parseInt(gasPrice)).toString();
  console.log(gasFee);
  const ethFee = web3.utils.fromWei(gasFee, 'ether');
  console.log(ethFee);
  const ethGas = parseFloat(amount) + parseFloat(ethFee);
  // 如果账户里面的余小于转账金额加上消耗的gas费用，则不用进行转账，然后通过回调函数进行处理
  if (parseFloat(balance) < ethGas) {
    typeof callback == 'function' && callback('amount');
    return;
  }
  //返回指定地址发出的交易数量。
  const count = await web3.eth.getTransactionCount(fromAddress);
  console.log(count);
  var privKey = new Buffer.from(privateKey, 'hex');
  const value = web3.utils.toHex(web3.utils.toWei(amount, 'ether'));
  const txParams = {
    from: fromAddress,
    gasPrice: web3.utils.toHex(gasPrice),
    gasLimit: web3.utils.toHex(gasLimit),
    to: toAddress,
    value: value,
    nonce: web3.utils.toHex(count)
  };
  // 获取链的id
  const chainId = await web3.eth.net.getId();
  const chain = common.default.forCustomChain(
    'mainnet',
    {
      name: symbol,
      networkId: chainId,
      chainId: chainId
    },
    'petersburg'
  );
  //通过ethereumjs tx创建传输
  // const tx = new Tx.Transaction(txParams, { chain: chainId });
  const tx = new Tx.Transaction(txParams, { common: chain });
  // 使用私钥签名事务
  tx.sign(privKey);
  // 通过web3模块发送交易
  var serializedTx = tx.serialize();
  try {
    await web3.eth
      .sendSignedTransaction('0x' + serializedTx.toString('hex'))
      .on('receipt', (res) => {
        console.log(res);
        typeof callback == 'function' && callback(res);
      });
  } catch (error) {
    // console.log('Error : ', error);
    typeof callback == 'function' && callback('error');
  }
};
import { ref } from 'vue';
export default {
  setup() {
    web3.eth
      .getBalance('0x59e85dDEaD68cc50Cd861fE2F992d9F3F20477cc')
      .then((res) => {
        console.log(res);
      });
    const chainId = ref('');
    web3.eth.net.getId().then((res) => {
      console.log(res);
      chainId.value = res;
    });
    const peer = ref('');
    web3.eth.net.getPeerCount().then((res) => {
      console.log(res);
      peer.value = res;
    });
    const private1 = ref('');
    web3.eth.net.getNetworkType().then((res) => {
      console.log(res);
      private1.value = res;
      // "main" 代表主网
      // "morden" 代表 morden 测试网
      // "ropsten" 代表 ropsten 测试网
      // "private" 表示检测不到当前网络
    });
    // 查看当前节点是否正在连接其它对等节点。
    web3.eth.net.isListening().then((res) => {
      console.log(res);
    });
    /*  web3.bzz.net.isListening().then((res) => {
      console.log(res);
    });
    web3.shh.net.isListening().then((res) => {
      console.log(res);
    }); */
    const handleTrade = () => {
      const privateKey =
        '55bde7b83e62271fa978b572b4c7a1bddb7b449ddb2b8cbf023224e811bdf284';
      const fromAddress = '0x51F8507c8dEd46e42522044A2E570912B7A38AE4';
      const toAddress = '0x59e85dDEaD68cc50Cd861fE2F992d9F3F20477cc';
      const amount = '0.01';
      sendEthTransfer(privateKey, fromAddress, toAddress, amount, handleManage);
    };
    const handleManage = (params) => {
      console.log(params);
    };
    return {
      private1,
      chainId,
      peer,
      handleTrade
    };
  }
};
</script>
