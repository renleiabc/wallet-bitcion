<template>
  <div>
    <button @click="chainId">chainId</button>
    <br />
    <button @click="handleUni">UNI</button>
  </div>
</template>

<script>
//import { ref, reactive } from 'vue';
// Created by Chih.Lun.Kang
// 網路上找的範例大部分都不能用，後來嘗試數次只有這方法可行
// 主網的appid => 539ab33xxxx，要去Infura申請，在上面建立一個project
// ####  NOTE  #### : 要特別注意本身轉帳的帳號要儲備足夠數量的 eth 跟 btc
// ####  注意  #### : 目前使用人工轉換儲值手續費，建議在幣價好的時候一次換匯才划算

const uniJSON = require('../plugins/abi/uni.json');
const Web3 = require('web3');
const request = require('request');
const Tx = require('ethereumjs-tx').Transaction;
// const testUrl = 'https://kovan.infura.io/v3/864b6f681de34c9a8ef2270575ad4592';
// const rpcEndpoint ='https://mainnet.infura.io/v3/539ab33d0e2f4755a3b0fa5746dccad2';
const testUrl = 'https://rinkeby.infura.io/v3/864b6f681de34c9a8ef2270575ad4592';
var fromAddress = '0x59e85dDEaD68cc50Cd861fE2F992d9F3F20477cc'; //從哪個帳戶
var toAddress = '0xDb3734369631d36067D7334c6bB947a23Be9b588'; //目標帳戶
var privateKey =
  '92ec6d980cc3f6fa9669281ae92463d04e100ef7b0646b4747b76e757146ea81';

const web3 = new Web3(new Web3.providers.HttpProvider(testUrl));
// (请自己生成，切勿直接复制）;
// (请自己生成，切勿直接复制）;
// USDT contract 連結 https://etherscan.io/address/0xdac17f958d2ee523a2206206994597c13d831ec7#code
// const ContractAddress = '0xdac17f958d2ee523a2206206994597c13d831ec7';
const ContractAddress = '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984';
const UNI = new web3.eth.Contract(uniJSON.abi, ContractAddress);
//  const contract = new web3.eth.Contract(USDTJSON.abi, contractAddress);
console.log(UNI);
web3.eth.getBlock('latest').then((res) => {
  console.log(res);
  console.log('gasLimit: ' + res.gasLimit);
  console.log(res.gasLimit / res.transactions.length);
  console.log(res.transactions.length);
});
async function ethFee() {
  const res = await web3.eth.getBlock('latest');
  console.log('gasLimit: ' + res.gasLimit);
  console.log(res.gasLimit / res.transactions.length);
  console.log(res.transactions);
  const gasLimit = res.gasLimit / res.transactions.length;
  console.log(gasLimit);
  const gasPrice = await web3.eth.getGasPrice();
  console.log(gasPrice);
  console.log(res.transactions.length);
  const gasFee = (parseInt(gasLimit) * parseInt(gasPrice)).toString();
  const ethFee = web3.utils.fromWei(gasFee, 'ether');
  console.log(gasFee);
  console.log(ethFee);
}
ethFee();
// console.log(block);
// console.log('gasLimit: ' + block.gasLimit);
// let amount = web3.utils.toHex(2710);
const amount = web3.utils.toHex(web3.utils.toWei('0.0001', 'ether'));
async function main() {
  const gasPrice = await web3.eth.getGasPrice();
  const block = await web3.eth.getBlock('latest');
  console.log(gasPrice);
  console.log(block.gasLimit);
  web3.eth.getTransactionCount(fromAddress).then((count) => {
    let rawTransaction = {
      from: fromAddress,
      gasPrice: web3.utils.toHex(gasPrice),
      //gasLimit: web3.utils.toHex(60123),
      gasLimit: web3.utils.toHex(
        parseInt(block.gasLimit / block.transactions.length)
      ),
      to: ContractAddress,
      value: 0x0,
      data: UNI.methods
        .transfer(toAddress, web3.utils.toHex(amount))
        .encodeABI(),
      nonce: web3.utils.toHex(count)
    };
    /* 
      ////创建代币的智能合约函数
    let tokenContract = new web3.eth.Contract(erc20Abi, tokenAddress);
    //调用代币的智能合约获取余额功能
    let result = await tokenContract.methods.balanceOf(address).call();
    //获得代币有多少位小数
    let decimals = await tokenContract.methods.decimals().call();
    let weiName = getWeiName(decimals);
    let tokenBalance = web3.utils.fromWei(result, weiName);
    //获得代币的符号
    let symbol = await tokenContract.methods.symbol().call(); */
    let transaction = new Tx(rawTransaction, { chain: 4 });
    // 进行私钥签名
    transaction.sign(Buffer.from(privateKey, 'hex'));
    web3.eth
      .sendSignedTransaction(
        '0x' + transaction.serialize().toString('hex'),
        (err, hash) => {
          if (!err) {
            console.log(hash);
            web3.eth.getTransactionReceipt(hash, (error, result) => {
              console.log(result);
              /*  if (result.status == 1 && result.logs.length != 0) {
                    console.log('true Transaction mined and execution succeed');
                  } else {
                    console.log('false Transaction mined but execution failed');
                  } */
            });
          } else {
            console.log(err);
          }
        }
      )
      .on('receipt', (res) => {
        console.log(res);
      });
  });
}
export default {
  setup() {
    const chainId = () => {
      request.post(
        `${testUrl}`,
        {
          form: JSON.stringify({
            jsonrpc: '2.0',
            method: 'eth_chainId',
            params: [],
            id: 1
          })
        },
        (err, req, tmp) => {
          console.log(tmp);
          const obj = JSON.parse(tmp);
          const num = web3.utils.toDecimal(obj.result);
          console.log(num);
          console.log(err);
          console.log(req);
        }
      );
    };
    const handleUni = () => {
      main()
        .then(() => {})
        .catch((e) => {
          console.log('error', e);
        });
    };
    /* main()
  .then(() => {})
  .catch((e) => {
    console.log('error', e);
  }); */
    return {
      handleUni,
      chainId
    };
  }
};
</script>
