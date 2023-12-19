import Taro from '@tarojs/taro'
//  小程序自动更新方法
//  在app文件中引入后，在onLaunch生命周期事件中使用
//
export default function () {
  const UDM = Taro.getUpdateManager()
  UDM.onUpdateFailed(() => {
    Taro.showToast({ title: "自动更新失败", icon: "none" })
  })
  UDM.onCheckForUpdate(res => {
    // 请求完新版本信息的回调
    if (res.hasUpdate) {
      console.log('UDM => 有新的线上版本！')
      UDM.onUpdateReady(function () {
        Taro.showModal({
          title: '更新提示',
          content: '新版本已经准备好，是否重启应用？',
          cancelText: '取消',
          cancelColor: '#999',
          confirmText: '重新启动',
          confirmColor: '#b89672',
          success: mod => {
            if (mod.confirm) {
              // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
              UDM.applyUpdate()
            }
          }
        })
      })
    } else {
      console.log('UDM => 没有更新')
    }
  })
}