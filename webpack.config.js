var htmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = {
	entry: './src/app.js',
	output: {
		path: __dirname+'/dist',
		filename: 'js/[name].bundle.js'
	},
	module: {
        loaders: [
           {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: path.resolve(__dirname,'node_modules'), //已经打包过后的文件，
                            // 不希望去处理，因为这样非常耗时
            include: __dirname+'/src/',
            query: {
                presets: ['latest']
            }
           },
           {
             test: /\.html$/,
             loader: 'html-loader'
           },
           {
            test: /\.tpl$/,
            loader: 'ejs-loader'
           },
           {
            test:/\.css$/, //匹配的条件
            loader: 'style-loader!css-loader!postcss-loader'//通过！使两个loader串联起来
           },
           {
            test: /\.less$/,
            loader:'style-loader!css-loader!postcss-loader!less-loader'
           },
           {
            test: /\.(png|jpg|gig|svg)$/i,
            loaders: [
              'url-loader?limit=3000&name=assets/[name]-[hash:5]-[ext]',
              'image-webpack-loader'
            ]
           }    
        ]
	},
	plugins: [
        new htmlWebpackPlugin({
        	filemane: 'index.html',
        	template: 'index.html',
        	inject: 'body'
        })
	]
}
