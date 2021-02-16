const path = require('path');
const WebpackWatchedGlobEntries = require('webpack-watched-glob-entries-plugin');

module.exports = {
    // TS 执行入口文件
    entry: WebpackWatchedGlobEntries.getEntries(
        [
            // Your path(s)
            path.resolve(__dirname, './src/page/*/index.[j|t]sx')
        ],
    ),
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './dist'),
    },
    plugins: [
        new WebpackWatchedGlobEntries()
    ],
    externals: {
        react: 'React',
        ['react-dom']: 'ReactDOM',
        ['react-content-loader']: 'ReactContentLoader',
        ['styled-components']: 'styled',
        ['highlight.js']: 'highlight'
    },
    resolve: {
        alias: {
            ['@components']: path.resolve(__dirname, './src/@components/'),
        },
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.scss|sass|css$/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader'
            }
        ]
    },
    devtool: 'source-map',// 输出 SourceMap 方便在浏览器里调试 TS 代码
};
