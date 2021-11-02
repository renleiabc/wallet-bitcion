<!--
 * @Author: abc
 * @Date: 2021-08-08 19:52:32
 * @LastEditors: abc
 * @LastEditTime: 2021-11-02 17:56:10
 * @Description: 转账
-->
<template>
  <div>转账</div>
  <div>fromAddress：{{ accountInfo.fromAddress }}</div>
  <div>fromPrivate：{{ accountInfo.fromPrivate }}</div>
  <div>toAddress：{{ accountInfo.toAddress }}</div>
  <div>privateKey：{{ accountInfo.privateKey }}</div>
  <div style="margin-top: 30px"></div>
  <button @click="sendTransfer">转账</button>
  <button @click="query">查询</button>
  <button @click="sendTrans">转账1</button>
</template>
<script>
const Web3 = require('web3');
// eslint-disable-next-line no-unused-vars
var Tx = require('ethereumjs-tx');
var abi = require('../plugins/abi/rnt.json');
const request = require('request');
import { ref } from 'vue';
export default {
  setup() {
    console.log(abi);
    // eslint-disable-next-line no-unused-vars
    var address1 = '0x59e85dDEaD68cc50Cd861fE2F992d9F3F20477cc';
    // eslint-disable-next-line no-unused-vars
    const testUrl =
      'https://kovan.infura.io/v3/864b6f681de34c9a8ef2270575ad4592';
    // eslint-disable-next-line no-unused-vars
    const mainUrl =
      'https://mainnet.infura.io/v3/864b6f681de34c9a8ef2270575ad4592';
    var web3 = new Web3(Web3.givenProvider || testUrl);
    // 生成具有公私钥的账户对象
    //entropy - String (可选): 用于增加混淆度的随机字符串，至少 32 字符长。如果未设定将使用 randomhex 生成一个随机字符串
    const entropy = '123456';
    const address = web3.eth.accounts.create(entropy).address;
    console.log(address);
    const privateKey =
      '77beee44fd1efa334c7a19fe80afc9466d4868d050ff04cb3fdc6a7255840d0a';
    const fromAddress = '0x59e85dDEaD68cc50Cd861fE2F992d9F3F20477cc';
    const fromPrivate =
      '92ec6d980cc3f6fa9669281ae92463d04e100ef7b0646b4747b76e757146ea81';
    const toAddress = '0xDb3734369631d36067D7334c6bB947a23Be9b588';
    web3.eth.getBlockNumber().then((res) => {
      console.log(res);
    });
    web3.eth
      .getBalance('0x59e85dDEaD68cc50Cd861fE2F992d9F3F20477cc')
      .then((res) => {
        console.log(res);
      });
    var contract = new web3.eth.Contract(abi, address); //合约实例
    console.log(contract);
    const newTxt = {
      jsonrpc: '2.0',
      id: 1,
      method: 'eth_getBalance',
      params: [fromAddress, 'latest']
    };
    // 1个以太币 = 10的 18次方 Wei
    request.post(
      `${testUrl}`,
      { form: JSON.stringify(newTxt) },
      (err, req, tmp) => {
        console.log(web3);
        console.log(typeof tmp);
        const obj = JSON.parse(tmp);
        console.log(obj.result);
        const num = web3.utils.toDecimal(obj.result);
        console.log(num);
        const eth = web3.utils.fromWei(`${num}`, 'ether');
        console.log(eth);
        /*  console.log(parseInt(num, 16));
        const eth = web3.fromWei(parseInt(num, 16), 'ether');
        console.log(eth); */
      }
    );
    const send = web3.utils.toWei('0.0001', 'ether');
    console.log(send);
    const value = web3.utils.fromDecimal(send);
    console.log(value);
    var count = web3.eth.getTransactionCount(fromAddress);
    console.log(count);
    // eslint-disable-next-line no-unused-vars
    const tranData = {
      jsonrpc: '2.0',
      method: 'eth_call',
      params: [
        {
          from: fromAddress,
          to: toAddress,
          value: value
        },
        'latest'
      ],
      id: 1
    };
    var gasPrice = web3.eth.gasPrice;
    var gasLimit = 21000;
    // const gas = 10000;
    var coinContract = new web3.eth.Contract(abi, toAddress);
    console.log(coinContract);
    /* var data = coinContract.transfer.getData(
      toAddress,
      1000000000000000000000,
      { from: fromAddress }
    ); */
    //  console.log(data);
    console.log(web3.utils.toHex(count));
    // eslint-disable-next-line no-unused-vars
    var rawTransaction = {
      chainId: 42,
      from: fromAddress,
      nonce: web3.utils.toHex(count),
      gasPrice: web3.utils.toHex(gasPrice),
      gasLimit: web3.utils.toHex(gasLimit),
      to: toAddress,
      value: value
      // data: data
    };
    const sendTransfer = () => {
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
      var privKey = new Buffer.from(fromPrivate, 'hex');
      console.log(Tx);
      var tx = new Tx.Transaction(rawTransaction, {
        chain: 'kovan',
        hardfork: 'petersburg'
      });
      // 用私钥签名交易信息
      tx.sign(privKey);
      var serializedTx = tx.serialize();
      // 发送交易
      web3.eth.sendSignedTransaction(
        '0x' + serializedTx.toString('hex'),
        function (err, hash) {
          if (!err) {
            console.log(hash);
          } else {
            console.log(err);
          }
        }
      );
    };

    /*  contract.methods
      .balanceOf(address)
      .call({ from: address }, (err, balance) => {
        console.log(err, balance);
      }); */

    //查询合约名称
    /*  contract.methods
      .name()
      .call()
      .then(function (result) {
        console.log(result);
      }); */
    //查询某一地址交易记录
    /*  contract.getPastEvents(
      'Transfer',
      {
        filter: { _from: '0x6cc5f688a315f3dc28a7781717a9a798a59fda7b' },
        fromBlock: 230813,
        toBlock: 'latest'
      },
      (error, events) => {
        console.log(events);
      }
    ); */
    const query = () => {
      var headers = {
        'Content-Type': 'application/json'
      };

      var dataString =
        '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["latest",true], "id":1}';

      var options = {
        url: testUrl,
        method: 'POST',
        headers: headers,
        body: dataString
      };

      function callback(error, response) {
        if (!error && response.statusCode == 200) {
          const json = response.body;
          var obj = JSON.parse(json);

          var hex = obj.result.number;
          var final = parseInt(hex, 16);
          console.log(final);
        }
      }

      request(options, callback);
    };
    const sendTrans = () => {
      // 转账数量，单位 Wei，web3.utils.toWei 可将 1 个 Ether 转换为 Wei
      const amount = web3.utils.toHex(web3.utils.toWei('0.0001', 'ether'));
      var privKey = new Buffer.from(fromPrivate, 'hex');
      web3.eth
        .getTransactionCount(fromAddress)
        .then(async (count) => {
          //creating raw tranaction
          const txParams = {
            chainId: 42,
            from: fromAddress,
            gasPrice: web3.utils.toHex(1 * 1e9),
            gasLimit: web3.utils.toHex(210000),
            to: toAddress,
            value: amount,
            nonce: web3.utils.toHex(count)
          };
          //creating tranaction via ethereumjs-tx
          const tx = new Tx.Transaction(txParams, { chain: 42 });
          //signing transaction with private key
          tx.sign(privKey);
          //sending transacton via web3 module
          web3.eth
            .sendSignedTransaction('0x' + tx.serialize().toString('hex'))
            .on('transactionHash', console.log);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const accountInfo = ref({
      fromAddress,
      toAddress,
      privateKey,
      fromPrivate
    });
    return {
      accountInfo,
      sendTransfer,
      query,
      sendTrans
    };
  }
};
</script>
