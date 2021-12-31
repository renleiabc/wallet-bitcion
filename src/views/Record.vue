<template>
  <el-table :data="arr" style="width: 100%" stripe v-loading="loading">
    <el-table-column type="expand">
      <template #default="props">
        <p>Transaction Hash: {{ props.row.hash }}</p>
        <p>Block: {{ props.row.blockNumber }}</p>
        <p>Timestamp: {{ $timeUTC(props.row.timeStamp) }}</p>
        <p>From: {{ props.row.from }}</p>
        <p>to: {{ props.row.to }}</p>
        <p>value: {{ $Web3.utils.fromWei(props.row.value, 'ether') }}</p>
      </template>
    </el-table-column>
    <el-table-column
      label="Txn Hash"
      prop="hash"
      width="250"
      show-overflow-tooltip
    />
    <el-table-column label="Block Number" prop="blockNumber" />
    <el-table-column label="value">
      <template #default="scope">
        {{ $Web3.utils.fromWei(scope.row.value, 'ether') }}
      </template>
    </el-table-column>
    <el-table-column label="Timestamp">
      <template #default="scope">
        {{ $timeUTC(scope.row.timeStamp) }}
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    :page-size="10"
    layout="prev, pager, next"
    :total="total.length"
    @current-change="handleChange"
  >
  </el-pagination>
</template>

<script>
import { ref, reactive, toRefs, getCurrentInstance, onBeforeMount } from 'vue';
const request = require('request');
const tokens = '9QX5IUVSVDRTZ3U7FXDGIKQ3T6M2V9B6DG';
const address = '0x59e85dDEaD68cc50Cd861fE2F992d9F3F20477cc';
const objData = {
  module: 'account', // 模块类别
  action: 'txlist', // 请求接口
  address: address, // 请求参数：代币合约地址
  startblock: 0, // 请求参数：查询起始区块
  endblock: 999999999, // 请求参数：查询结束区块
  //page: 1, // 分页页码
  // offset: 10, // 偏移量（每页数量）
  sort: 'desc', // 请求参数：排序类别
  apikey: tokens // 请求参数：apikey
};
const objPage = {
  module: 'account', // 模块类别
  action: 'txlist', // 请求接口
  address: address, // 请求参数：代币合约地址
  startblock: 0, // 请求参数：查询起始区块
  endblock: 999999999, // 请求参数：查询结束区块
  page: 1, // 分页页码
  offset: 10, // 偏移量（每页数量）
  sort: 'desc', // 请求参数：排序类别
  apikey: tokens // 请求参数：apikey
};
const result = reactive({ arr: [], total: [] });
const loading = ref(false);
const handleGetTransList = (data = objData) => {
  loading.value = true;
  result.arr = [];
  request.get(
    'https://ibax.io/api/newsEventsLink',

    (err, req, tmp) => {
      const res = JSON.parse(tmp);
      console.log(res);
    }
  );
  request.post(
    'https://api-kovan.etherscan.io/api',
    { form: data },
    (err, req, tmp) => {
      //  console.log(tmp);
      const res = JSON.parse(tmp);
      if (res.status === '1') {
        const arr = JSON.parse(tmp).result;
        if (data.page) {
          result.arr = arr;
        } else {
          result.total = arr;
        }
      }
      loading.value = false;
    }
  );
  return result;
};
export default {
  setup() {
    const { ctx } = getCurrentInstance();

    console.log(ctx);
    onBeforeMount(() => {
      console.log(ctx.foo);
    });
    handleGetTransList(objData);
    const result = handleGetTransList(objPage);
    const { total, arr } = toRefs(result);
    console.log(result);
    const handleChange = (page) => {
      console.log(page);
      objPage.page = page;
      const data = handleGetTransList(objPage);
      console.log(data);
      result.arr = data.arr;
    };
    return {
      total,
      arr,
      handleChange,
      loading
    };
  },
  mounted() {
    console.log(this.$Web3.utils.fromWei('10000000000000000', 'ether'));
  }
};
</script>
