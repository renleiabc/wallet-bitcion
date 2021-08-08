/*
 * @Author: abc
 * @Date: 2021-08-06 10:24:38
 * @LastEditors: abc
 * @LastEditTime: 2021-08-06 10:27:10
 * @Description:
 */
const util = {
  uint8Array(uint8Array) {
    return Array.prototype.map
      .call(uint8Array, (x) => ('00' + x.toString(16)).slice(-2))
      .join('');
  },
  buf2hex(buffer) {
    return Array.prototype.map
      .call(new Uint8Array(buffer), (x) => ('00' + x.toString(16)).slice(-2))
      .join('');
  }
};
export default util;
