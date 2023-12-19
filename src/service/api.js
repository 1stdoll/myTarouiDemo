const files = require.context("./apis", false, /\.js$/);
const fileList = files.keys();
const apis = {};

fileList.forEach((key) => {
  const apiName = key.replace(/^\.\//, "").replace(/\.js$/, "");

  apis[apiName] = files(key);
});

export default apis;
