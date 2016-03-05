import fs from 'fs'

import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'

import ClientDevConfig from './webpack.client.dev.config'

const APP_PATH = process.cwd()
const DEV_PORT = process.env.DEV_PORT || 8081

function runDevServer() {

  /*
    ugly temporary hack so we can start dev whil I find a solution to couple
    server side rendering and static generation.
  */
  if (!fs.existsSync('.build')) {
    fs.mkdirSync('.build')
  }
  fs.writeFileSync('.build/index.html', `
  <html>
  <body>
      <div id="root">Loading...</div>
      <script src="/vendor.js"></script>
      <script src="/app.js"></script>
  </body>
  </html>
  `)

  const compiler = webpack(ClientDevConfig)
  const server = new WebpackDevServer(compiler, ClientDevConfig.devServer)
  server.listen(DEV_PORT, 'localhost', () => {
    console.log('Webpack dev server listening on port', DEV_PORT)
  })
}

runDevServer()
