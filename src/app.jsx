/* eslint-disable no-undef */
import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
import dva from './utils/dva';
import Home from './pages/scanload/index'

import './app.scss'

const dvaApp = dva.createApp({
  initialState: {},
});
const store = dvaApp.getStore();
class App extends Component {

  globalData = {}

  isPhoneX = () => Taro.$store().home.isIphoneX

  url = ''

  scan_time = ''

  config = {
    pages: [
      'pages/home/index',
    ],
    window: {
      lazyCodeLoading: "requiredComponents",
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
  }

  // loadOver = false

  loginBack = false

  componentDidMount() {
  }

  componentDidShow() { }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider>
        <Home />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
