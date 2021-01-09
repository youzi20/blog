const path = require('path');
const WebpackWatchedGlobEntries = require('webpack-watched-glob-entries-plugin');

console.log(__dirname)

module.exports = {
    // TS 执行入口文件
    entry: WebpackWatchedGlobEntries.getEntries(
        [
            // Your path(s)
            path.resolve(__dirname, './src/page/*/index.[j|t]sx'),
        ],
    ),
    plugins: [
        new WebpackWatchedGlobEntries(),
    ],
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './dist'),
    },
    externals: {
        // React: 'React',
        // ReactDOM: 'ReactDOM'
    },
    resolve: {
        // 先尝试 ts，tsx 后缀的 TypeScript 源码文件
        extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.scss|sass|css$/,
                use: ["style-loader", "css-loader", "sass-loader",],
            },
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader'
            },
            {
                test: /\.js|jsx$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|jpe?g|svg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 2048,
                        name: '[name].[ext]',
                        outputPath: 'images/'
                    }
                }
            }
        ]
    },
    devtool: 'source-map',// 输出 SourceMap 方便在浏览器里调试 TS 代码
};
