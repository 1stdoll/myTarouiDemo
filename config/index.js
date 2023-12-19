// const fs = require("fs");
// const path = require('path');
import fs from "fs";
import path from "path";

const config = {
  projectName: 'taroApp',
  date: '2020-3-8',
  designWidth: 750,
  deviceRatio: {
    '640': 2.34 / 2,
    '750': 1,
    '828': 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: `dist/${process.env.TARO_ENV}`,
  // outputRoot: 'dist',
  babel: {
    sourceMap: true,
    presets: [
      ['env', {
        modules: false
      }]
    ],
    plugins: [
      'transform-decorators-legacy',
      'transform-class-properties',
      'transform-object-rest-spread',
      ['transform-runtime', {
        helpers: false,
        polyfill: false,
        regenerator: true,
        moduleName: 'babel-runtime'
      }
      ]
    ]
  },
  plugins: [
    '@tarojs/plugin-sass'
  ],
  defineConstants: {
  },
  alias: {},
  mini: {
    webpackChain(chain) {
      chain.optimization.sideEffects(false)
    },
    // 验证输出目录中taro-ui目录是否存在且正确
    onRunOver(_path = '') {
      console.log('distPath =>', _path)
      const outPath = path.join(_path, 'taro-ui')
      const fromPath = path.join(_path, '.store/taro-ui@2.3.4/node_modules/taro-ui')
      console.log('fromPath =>', path.join(_path, '.store/taro-ui@2.3.4/node_modules/taro-ui'))
      console.log('outPath =>', outPath.toString())
      const existsDir = () => {
        console.log('hasDir in outPath =>', fs.existsSync(outPath))
        if (!fs.existsSync(outPath)) {
          console.log('hasDir in fromPath =>', fs.existsSync(fromPath))
          if (fs.existsSync(fromPath)) {
            console.log('run renameSync')
            fs.renameSync(fromPath, outPath)
            existsDir()
          } else console.error('组件目录不存在')
        } else console.log(_path + '/taro-ui ok')
      }
      existsDir()
      if (process.env.TARO_ENV === 'alipay') {
        // console.log(path.resolve(__dirname, '..', 'mini.project.json'))
        if (!fs.existsSync('../dist/alipay/mini.project.json')) {
          fs.copyFileSync(path.resolve(__dirname, '..', 'mini.project.json'), path.resolve(__dirname, '..', 'dist/alipay/mini.project.json'))
        } else console.log('dist/alipay/mini.project.json ok')
      }
    },
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
          browsers: [
            'last 3 versions',
            'Android >= 4.1',
            'ios >= 8'
          ]
        }
      },
      pxtransform: {
        enable: true,
        config: {

        }
      },
      url: {
        enable: true,
        config: {
          limit: 10240 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
          browsers: [
            'last 3 versions',
            'Android >= 4.1',
            'ios >= 8'
          ]
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
