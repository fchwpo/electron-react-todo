const webpack = require('webpack')
const path = require('path')
require('dotenv').config({path: __dirname + '/.env'})
const development = process.env.NODE_ENV == 'development'
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

const plugins = [
	new MiniCssExtractPlugin({
		filename: '[name].css',
		ignoreOrder: true
	}),
	new HtmlWebpackPlugin({
		template: './src/client/index.html',
		filename: './index.html'
	}),
	new CleanWebpackPlugin()
]

module.exports = {
	entry: {
		todoList: './src/entryscripts/todo-list.js',
	},
	mode: development ? 'development' : 'production',
	...(development && { devtool: 'source-map' }),
	output: {
		path: path.resolve(__dirname, 'build', `${development ? 'dev' : 'prod'}`),
		publicPath: './',
		filename: `[name]${development ? '' : '.[contentHash:4]'}.js`,
	},
	optimization: {
		minimizer: [
			new TerserPlugin({
				cache: true,
				parallel: true,
				terserOptions: {
					output: {
						comments: false,
					},
				},
			}),
		],
		splitChunks: {
			chunks: 'all',
		},
	},
	plugins: plugins,
	module: {
		rules: [
			{
				test: /\.s?css$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
						},
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
						},
					},
				],
			},
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					query: {
						presets: [
							'@babel/preset-react',
							[
								'@babel/preset-env',
								{
									modules: false
								}
							]
						],
						plugins: [
							[
								'@babel/plugin-transform-runtime',
								{
									regenerator: true
								}
							],
							'@babel/plugin-proposal-class-properties',
						]
					}
				}
			},
			{
				test: /\.(ttf|eot|woff|woff2|svg|gif|otf)/,
				use: {
					loader: 'file-loader',
					options: {
						name: function (fileName) {
							fileName = fileName.replace(
								/.*(src\/assets)\//i,
								''
							);
							fileName = fileName.replace(
								/\.(.+)/,
								'.[contenthash:4].$1'
							);
							return fileName;
						},
						publicPath: 'assets/',
						outputPath: 'assets/'
					},
				},
			},
		],
	},
}
