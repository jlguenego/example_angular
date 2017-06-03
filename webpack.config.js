const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: {
		'22_resource': './app/22_resource/app.js',
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, './wpk')
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js']
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			use: [{
				loader: 'ng-annotate-loader'
			}, {
				loader: 'babel-loader'
			}]
		}, {
			test: /\.ts$/,
			exclude: /node_modules/,
			use: [{
				loader: 'awesome-typescript-loader',
				options: {
					configFileName: path.resolve(__dirname, './src/tsconfig.json')
				}
			}]
		}, {
			test: /\.css$/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: 'css-loader?minimize&sourceMap'
			})
		}, {
			test: /\.scss$/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: 'css-loader?minimize&sourceMap!sass-loader?sourceMap'
			})
		}, {
			test: /\.html$/,
			use: [{
				loader: 'ngtemplate-loader',
				options: {
					relativeTo: 'app'
				}
			}, {
				loader: 'html-loader',
				options: {
					attrs: 'img-svg:src',
					root: path.resolve('./app')
				}
			}]
		}]
	},
	devtool: 'source-map',
	plugins: [
		new ExtractTextPlugin('[name].css'),
		// new webpack.optimize.CommonsChunkPlugin({
		// 	name: ['02_javascript', '03_javascript_callback']
		// }),
	]
}