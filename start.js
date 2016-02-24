import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'

import ClientDevConfig from './webpack.client.dev.config'

const APP_PATH = process.cwd()
const DEV_PORT = process.env.DEV_PORT || 8081

function runDevServer(cb) {
  console.log(ClientDevConfig)
  const compiler = webpack(ClientDevConfig)
  const server = new WebpackDevServer(compiler, ClientDevConfig.devServer)
  server.listen(DEV_PORT, 'localhost', () => {
    console.log('Webpack dev server listening on port', DEV_PORT)
    cb()
  })
}

runDevServer(() => {
    console.log('Start complete')
})
