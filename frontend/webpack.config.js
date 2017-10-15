module.exports = {
	entry: {
		index: __dirname + '/src/index.es6'
	},

	output: {
		publicPath: '/dist/',
		path: __dirname + '/webroot/dist',
		filename: "./[name]-bundle.js"
	},

	devServer: {
		contentBase: 'webroot',
		port: 3000
	},

	module: {
		loaders: [
			{
				test: /\.es6$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015']
				}
			}
		]
	},

	devtool: 'source-map'
}