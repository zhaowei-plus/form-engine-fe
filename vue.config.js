const isBuild = process.env.NODE_ENV === 'production'

module.exports = {
  publicPath: isBuild ? './child-react/dist' : './',

  // filenameHashing: false,

  configureWebpack: {
    externals: {
      react: 'React',
      'react-router-dom': 'ReactRouterDOM',
      'react-dom': 'ReactDOM',
      moment: 'moment'
    }
  },

  chainWebpack: config => {
    config.optimization.splitChunks({
      cacheGroups: {
        vendors: {
          name: `chunk-vendors-process-engine-form`,
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'initial'
        },
        common: {
          name: `chunk-common`,
          minChunks: 2,
          priority: -20,
          chunks: 'initial',
          reuseExistingChunk: true
        }
      }
    })
  },
  devServer: {
    proxy: {
      '/form-engine': {
        // target: "https://mock.api.jituancaiyun.com/app/mock/67",
        // target: 'http://vcmq.free.qydev.com/form-engine',
        target: 'http://10.0.16.26:8987/form-engine-platform',
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/form-engine': '/'
        },
        onProxyReq (proxyReq, req, res) {
          // 在请求头中注入登录信息
          proxyReq.setHeader('ubpmLoginInfo', '{"ubpmUid":"111","ubpmSourceType":1,"ubpmUserName":"TestTest","ubpmTenantId":"123456"}'
          )
        }
      },
      '/engine-config': {
        target: 'https://mock.api.jituancaiyun.com/app/mock/68',
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/engine-config': '/'
        }
      },
      '/script-engine': {
        target: 'https://mock.api.jituancaiyun.com/app/mock/74',
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/script-engine': '/'
        }
      }
    }
  }
}
