
// eslint-disable-next-line import/no-mutable-exports
let uma = {};
if (process.env.TARO_ENV === 'weapp') {
  uma = require('umtrack-wx');
  uma.init({
    appKey: '5f1f805ab4fa6023ce1a28c8',
    useOpenid: false,
    autoGetOpenid: false,
    debug: false
  });
} else if (process.env.TARO_ENV === 'alipay') {
  uma = require('umtrack-alipay');
  uma.init({
    appKey: '5f1f84fad62dd10bc71c7afd',
    debug: false
  });
}
export default uma;