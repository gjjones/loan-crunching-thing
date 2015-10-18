module.exports = {
	entry: './public/scripts/main.js',
	output: {
		filename: 'build/bundle.js'
	},
	module: {
		loaders: [
			{ test: /\.js$/, loader: 'babel-loader' },
			{ test: /\.json$/, loader: 'json-loader' }
		]
	}
}