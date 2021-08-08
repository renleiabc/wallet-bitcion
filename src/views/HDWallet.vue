<!--
 * @Author: abc
 * @Date: 2021-08-06 15:55:04
 * @LastEditors: abc
 * @LastEditTime: 2021-08-06 16:21:25
 * @Description: HD钱包
-->
<template>
  <div></div>
</template>
<script>
const bip32 = require('bip32');
const bitcoin = require('bitcoinjs-lib');
export default {
  props: {},
  setup() {
    console.log(bip32);
    let xprv =
        'xprv9s21ZrQH143K4EKMS3q1vbJo564QAbs98BfXQME6nk8UCrnXnv8vWg9qmtup3kTug96p5E3AvarBhPMScQDqMhEEm41rpYEdXBL8qzVZtwz',
      root = bip32.fromBase58(xprv);
    console.log(root);
    // m/0:
    var m_0 = root.derive(0);
    console.log(m_0);
    const obj = bitcoin.payments.p2pkh({
      pubkey: m_0.publicKey
    });

    console.log('xprv m/0: ' + m_0.toBase58()); //xprv9vV8wfuBFqPwqk1QRQ6W8NWXV7fnTQmf56r5dYXz4YNDafrhGeg6N2dVF7MPhrPUomzdQSSZAj5XXLCirjqKuEVSnbbqWd1BvkxkGPiNxY9
    console.log('xpub m/0: ' + m_0.neutered().toBase58()); // xpub69UVMBS56CxF4E5sXRdWVWTG39WGrsVWSKmgRvwbcsuCTUBqpBzLupwy6P98uDM99qVb6Y32drbSFz7iaj5TDYPuRgoHL4U1bQRFHygiMZC
    console.log(' prv m/0: ' + m_0.toWIF()); //L3sZcLifBMDkutRFKy7HKNJ5hjJo8vKt8WrHW5mqenSf2e47SHaT
    console.log(' pub m/0: ' + obj.address); //1EwGHVkkRNB98FZyhwpmxU9Ax9fVpnBCcZ
    // m/1:
    var m_1 = root.derive(0);
    console.log(m_1.privateKey);
    const obj1 = bitcoin.payments.p2pkh({
      pubkey: m_1.publicKey
    });
    console.log('xprv m/1: ' + m_1.toBase58());
    console.log('xpub m/1: ' + m_1.neutered().toBase58());
    console.log(' prv m/1: ' + m_1.toWIF());
    console.log(' pub m/1: ' + obj1.address);
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

<style scoped lang="scss"></style>
