

const path = require('path');
const webpack = require('webpack');

/*
 * SplitChunksPlugin is enabled by default and replaced
 * deprecated CommonsChunkPlugin. It automatically identifies modules which
 * should be splitted of chunk by heuristics using module duplication count and
 * module category (i. e. node_modules). And splits the chunks…
 *
 * It is safe to remove "splitChunks" from the generated configuration
 * and was added as an educational example.
 *
 * https://webpack.js.org/plugins/split-chunks-plugin/
 *
 */

/*
 * We've enabled Postcss, autoprefixer and precss for you. This allows your app
 * to lint  CSS, support variables and mixins, transpile future CSS syntax,
 * inline images, and more!
 *
 * To enable SASS or LESS, add the respective loaders to module.rules
 *
 * https://github.com/postcss/postcss
 *
 * https://github.com/postcss/autoprefixer
 *
 * https://github.com/jonathantneal/precss
 *
 */

const autoprefixer = require('autoprefixer');
const precss = require('precss');


/*
 * We've enabled HtmlWebpackPlugin for you! This generates a html
 * page for you when you compile webpack, which will make you start
 * developing and prototyping faster.
 *
 * https://github.com/jantimon/html-webpack-plugin
 *
 */


const MultipageHtmlWebpackPlugin = require('multipage-html-webpack-plugin')

module.exports = {
	mode: 'development',
	entry: './src/index.js',

	output: {
		filename: '[name].[chunkhash].js',
		path: path.resolve(__dirname, 'dist')
	},

	plugins: [
    new webpack.ProgressPlugin(),
    new MultipageHtmlWebpackPlugin(),
    new MultipageHtmlWebpackPlugin({
      pages: './src/pages/*.html',
      pagesPath: 'pages/'
		})
  ],

	module: {
		rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader'
        ]
      },
			{
				test: /.(js|jsx)$/,
				include: [path.resolve(__dirname, 'src')],
				loader: 'babel-loader',

				options: {
					plugins: ['syntax-dynamic-import'],

					presets: [
						[
							'@babel/preset-env',
							{
								modules: false
							}
						]
					]
				}
			}
		]
	},

	optimization: {
		splitChunks: {
			cacheGroups: {
				vendors: {
					priority: -10,
					test: /[\\/]node_modules[\\/]/
				}
			},

			chunks: 'async',
			minChunks: 1,
			minSize: 30000,
			name: true
		}
	},

	devServer: {
		open: true,
		host: '0.0.0.0'
	}
};
