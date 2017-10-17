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
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'script-loader',
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader'
			},
			{ test: /\.(woff|woff2)$/,  loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
			{ test: /\.ttf$/,    loader: 'file-loader' },
			{ test: /\.eot$/,    loader: 'file-loader' },
			{ test: /\.svg$/,    loader: 'file-loader' }
		]
	},

	devtool: 'source-map'
}