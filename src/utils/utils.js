import Taro from '@tarojs/taro'

const env = Taro.getEnv()

export const getToken = () => Taro.getStorageSync('token')

export const replaceHtml = (html = '') => {
  // console.log(html)
  var res = html.replace(/\<(font)/g, '<span')
    .replace(/\<(font)/g, '/span')
    .replace(/\<(br)\>/g, '<br />')
    .replace(/\<(section)\>/g, '')
    .replace(/\<\/(section)\>/g, '')
    .replace(/\<(p)/g, '<div')
    .replace(/\<\/(p)/g, '<div')
    .replace(/\<(img)/g, '<img style="max-width:100%;height:auto"')
    // .replace(/\<[i][m][g]/g, '<img class="rich_img"')
    .replace(/(line-height\:)\s(normal)/g, 'line-height:1.8em')

  // console.log(html.indexOf('img'))
  // .replace(/(font-size:)[\s]*[\d]*(px)/g, 'font-size:1em')
  // console.log(res)
  return res
}

export function moment(date) {
  let T = 0
  let aTc = 0
  if (!date) {
    T = new Date()
  } else {
    if (typeof date === 'string') {
      T = new Date(date.replace(/[-]/g, '/'))
    } else {
      T = new Date(date)
    }

  }
  let Tarr = [1, 2, 3, 4, 5, 6]
  const dataArr = (D) => {
    Tarr[0] = D.getFullYear()
    Tarr[1] = D.getMonth() + 1
    Tarr[2] = D.getDate()
    Tarr[3] = D.getHours()
    Tarr[4] = D.getMinutes()
    Tarr[5] = D.getSeconds()
  }
  dataArr(T)

  const format = (v) => {
    let F = v || 'YYYY-M-D H:m:S'
    let Ft = Tarr
    if (F.indexOf('MM') !== -1) {
      if (Ft[1] < 10) Ft[1] = `0${Ft[1]}`
    }
    if (F.indexOf('DD') !== -1) {
      if (Ft[2] < 10) Ft[2] = `0${Ft[2]}`
    }
    if (F.indexOf('HH') !== -1 || F.indexOf('hh') !== -1) {
      if (Ft[3] < 10) Ft[3] = `0${Ft[3]}`
    }
    if (F.indexOf('mm') !== -1) {
      if (Ft[4] < 10) Ft[4] = `0${Ft[4]}`
    }
    if (F.indexOf('SS') !== -1) {
      if (Ft[5] < 10) Ft[5] = `0${Ft[5]}`
    }
    // console.log('time=>', Ft)
    let f = F.replace(/[Y]+/g, Ft[0])
      .replace(/[M]+/g, Ft[1])
      .replace(/[D]+/g, Ft[2])
      .replace(/[H]+/g, Ft[3])
      .replace(/[h]+/g, Ft[3])
      .replace(/[m]+/g, Ft[4])
      .replace(/[S]+/g, Ft[5])
    return f
  }
  const add = (v = 0, t = '') => {
    if (!t) {
      t = 'day'
    }
    let V = v
    let Tt = t
    let adT = T
    const dateAdd = {
      'year': () => adT.setFullYear(adT.getFullYear() + V),
      'month': () => adT.setMonth(adT.getMonth() + V),
      'day': () => adT.setDate(adT.getDate() + V),
      'hour': () => adT.setHours(adT.getHours() + V),
      'minutes': () => adT.setMinutes(adT.getMinutes() + V),
      'seconds': () => adT.setSeconds(adT.getSeconds() + V),
    }
    dateAdd[Tt]()
    dataArr(adT)
    aTc = adT
    const ad = {
      format,
      count,
      value: Tarr,
      callback: adT
    }
    return ad
  }

  const count = (end) => {
    let ct = [0, 0, 0, 0, 0]
    let l = 0
    // console.log('end  => ', end)
    let now = new Date()
    if (typeof (end) === 'string') {

      let enD = new Date(end.replace(/[-]/g, '/'))
      console.log('end  Date => ', enD)

      l = enD - now
      console.log('count now-end=> ', l)
      if (!end && aTc !== 0) {
        enD = aTc
      }
      l = parseInt(l / 1000)
      // console.log('count_l=>', l)

    }
    if (typeof (end) === 'number') {
      l = parseInt(end / 1000)
    }
    // console.log('count l=> ', l)
    if (end && l > 0) {
      ct[0] = l >= 86400 ? parseInt(l / 86400) : 0
      ct[1] = l >= 3600 ? parseInt(l % 86400 / 3600) : 0
      ct[2] = parseInt(l / 3600)
      ct[3] = l >= 60 ? parseInt(l % 3600 / 60) : 0
      ct[4] = parseInt(l % 60)
    }
    return ct
  }
  const mt = {
    format,
    add,
    count,
    value: Tarr
  }
  return mt
}

export function getDate(date) {
  let T = new Date(date)
  if (!date) {
    T = new Date()
  }
  let Tarr = [1, 2, 3, 4, 5, 6]
  Tarr[0] = T.getFullYear()
  Tarr[1] = T.getMonth() + 1
  Tarr[2] = T.getDate()
  Tarr[3] = T.getHours()
  Tarr[4] = T.getMinutes()
  Tarr[5] = T.getSeconds()
  // console.log(Tarr)
  return Tarr
}

export function pathParams(url) {
  // console.log('url=>', url)
  const paramsStr = url.replace(/(https)[^\?]+\?/, '')
  const paramsArr = paramsStr.split('&')
  const params = {}
  // console.log('paramsArr=>', paramsArr)
  paramsArr.forEach((i) => {
    const a = i.split('=')
    params[a[0]] = a[1]
  })
  // console.log(data)
  return { ...params, paramsStr }
}

export function MiniParams(url) {
  // console.log('url=>', url)
  const paramsArr = url.split('&')
  const params = {}
  // console.log('paramsArr=>', paramsArr)
  paramsArr.forEach(i => {
    const a = i.split('=')
    let apptype = 0
    const typeMap = ['wx', 'ali']
    if (env === 'ALIPAY') apptype = 1
    if (a[0].toLowerCase().indexOf(typeMap[1 - apptype]) > -1) return
    if (a[0].toLowerCase() === `${typeMap[apptype]}appid`) { params['appId'] = a[1]; return }
    if (a[0].indexOf('path') > -1) { if (a[0] === `${typeMap[apptype]}path` || (a[0] === 'path' && !params.path)) { params['path'] = decodeURIComponent(a[1]); return }; return }
    if (typeof params['extraData'] === 'undefined') params['extraData'] = {}
    params['extraData'][a[0]] = a[1]
  })
  // console.log(data)
  return params
}

export const classObj = (obj) => {
  const classArr = Object.keys(obj).map(i => obj[i] ? i : '')
  return classArr.join(" ")
}

export const getDateLost = (date) => {
  const now = new Date()
  const p_d = new Date(date.replace(/[-]/g, '/'))
  // console.warn('getDateLost', p_d - now)
  return p_d - now
}
// export const getKitchenStatus = (status, type, send) => {
//   const sendStatus = {
//     1: '等待骑士取货',
//     2: '骑士配送中',
//     3: '骑士已送达',
//     4: '等待骑士接单',
//     5: '已取消',
//     100: '骑士已到店',
//   }
//   const orderStatus = {
//     10: '待付款',
//     20: '已付款(备餐中)',
//     22: type === 12 ? '待配送' : '待取餐',
//     30: type === 12 ? sendStatus[send] : '待取餐',
//     60: '退款申请中',
//     70: '已完成',
//     90: '审核不通过',
//     100: '待付款',
//     110: '已退款',
//     500: '已取消',
//   }
//   return orderStatus[status]
// }

export const Toast = (option = { title: "" }) => {
  Taro.showToast({ icon: "none", ...option })
}

export const showLoading = (option = { title: "..." }) => {
  Taro.showLoading({ ...option })
}