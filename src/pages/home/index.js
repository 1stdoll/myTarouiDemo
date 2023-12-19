/* eslint-disable no-undef */
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import './index.scss'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  poiPkrRef = Taro.createRef()
  config = {
    navigationBarTitleText: '首页',
    enablePullDownRefresh: true,
    backgroundTextStyle: 'dark'
  };


  componentDidShow = () => { }

  render() {
    return (
      <View className='page'>
        <AtButton />
      </View>
    )
  }
}
export default Home