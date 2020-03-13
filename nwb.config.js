module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'y',
      externals: {
        react: 'React'
      }
    }
  },
  webpack: {
    html: {
      template: 'demo/src/index.html',
      mountId: 'app',
      title: 'Demo page 2'
    }
  }
}
