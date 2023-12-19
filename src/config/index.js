/** 
 * 线上环境
 * 为了方便测试，使用的是聚合数据免费接口
 * 网址：https://www.juhe.cn/
 */
export const ONLINEHOST = 'http://api.juheapi.com'

/** 
 * 测试环境
 */
export const QAHOST = 'http://xxx.cn'

/** 
 * 线上mock
 */
export const MOCKHOST = 'http://192.168.1.233:8603/wxa'

/** 
 * 是否mock
 */
export const ISMOCK = false

/**
 * 当前的host  ONLINEHOST | QAHOST | MOCKHOST
 */
export const MAINHOST = MOCKHOST

// 输出日志信息
export const NOCONSOLE = true;

/**
 * 全局的分享信息 不用每一个都去写
 */
export const SHAREINFO = {
  'title': '分享标题',
  'path': '路径',
  'imageUrl': '图片'
}