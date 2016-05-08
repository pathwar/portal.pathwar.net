/* Thanks to ryanflorence/react-project */
import path from 'path'
import webpack from 'webpack'

export const APP_PATH = process.cwd()

export const CLIENT_ENTRY = path.join(APP_PATH, 'src/client.js')
export const SERVER_ENTRY = path.join(APP_PATH, 'src/server.js')
export const APP_ENTRIES_PATH = path.join(APP_PATH, 'src')
export const NODE_ENV = process.env.NODE_ENV
export const FONT_REGEX = /\.(otf|eot|svg|ttf|woff|woff2).*$/
export const IMAGE_REGEX = /\.(gif|jpe?g|png)$/
export const CSS_REGEX = /\.css$/
export const JS_REGEX = /\.js$/
export const JS_EXCLUDE_REGEX = /node_modules/
export const CSS_LOADER_QUERY = 'modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'

export const LOADERS = [
  { test: /\.json$/,
    loader: 'json-loader'
  },
  { test: FONT_REGEX,
    loader: 'url-loader?limit=10000'
  },
  { test: IMAGE_REGEX,
    loader: 'url-loader?limit=10000'
  }
]

export const PLUGINS = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
    'process.env.VERSION': JSON.stringify(require("./package.json").version),
  })
]
