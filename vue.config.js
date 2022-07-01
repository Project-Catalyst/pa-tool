let publicPath = ''
if (process.env.APP_ENV === 'production') {
  publicPath = '/pa-tool/'
}
if (process.env.APP_ENV === 'staging') {
  publicPath = '/'
}
if (process.env.APP_ENV === 'development') {
  publicPath = '/'
}
module.exports = {
  publicPath: publicPath
}
