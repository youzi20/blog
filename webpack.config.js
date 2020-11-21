const path = require('path');
const WebpackWatchedGlobEntries = require('webpack-watched-glob-entries-plugin');

console.log(__dirname)

module.exports = {
    // TS 执行入口文件
    entry: WebpackWatchedGlobEntries.getEntries(
        [
            // Your path(s)
            path.resolve(__dirname, './src/**/index.[j|t]sx'),
        ],
        {
            // Optional glob options that are passed to glob.sync()
            ignore: [
                path.resolve(__dirname, './src/components/**'),
                path.resolve(__dirname, './src/hooks/**')
            ]
        }
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
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
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
            }
        ]
    },
    devtool: 'source-map',// 输出 SourceMap 方便在浏览器里调试 TS 代码
};
