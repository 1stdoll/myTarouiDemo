/* eslint-disable no-undef */
import Taro from '@tarojs/taro';
import barcode from './barcode';
import qrcode from './qrcode';
// var barcode = require('./barcode');
// var qrcode = require('./qrcode');

var env = Taro.getEnv()

function convert_length(length) {
  if (env === 'WEAPP') {
    return Math.round(wx.getSystemInfoSync().windowWidth * length / 750);
  }

  if (env === 'ALIPAY') {
    return Math.round(my.getSystemInfoSync().windowWidth * length / 750);
  }
}

function barc(id, code, width, height, type) {
  let canvasEvent = null
  if (env === 'WEAPP') canvasEvent = wx.createCanvasContext(id)
  if (env === 'ALIPAY') canvasEvent = my.createCanvasContext(id)
  if (type === '2d') canvasEvent.getContext('2d')
  barcode.code128(canvasEvent, code, convert_length(width), convert_length(height))
}

function qrc(id, code, size, type) {
  let canvasEvent = null
  if (env === 'WEAPP') canvasEvent = wx.createCanvasContext(id)
  if (env === 'ALIPAY') canvasEvent = my.createCanvasContext(id)
  if (type === '2d') canvasEvent.getContext('2d')
  qrcode.api.draw(code, {
    ctx: canvasEvent,
    width: convert_length(size),
    height: convert_length(size)
  })
}

export default {
  barcode: barc,
  qrcode: qrc
}