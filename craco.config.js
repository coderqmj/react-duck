const { when, whenDev } = require('@craco/craco');
const path = require('path');
const WebpackBar = require('webpackbar');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const resolve = (dir) => path.resolve(__dirname, dir);

const isBuildAnalyzer = process.env.BUILD_ANALYZER === 'true';

module.exports = {
  webpack: {
    alias: {
      '@': resolve('src'),
      components: resolve('src/components'),
      utils: resolve('src/utils'),
    },
    plugins: [
      // 进度条
      new WebpackBar({
        profile: true,
      }),
      new SimpleProgressWebpackPlugin(),
      ...whenDev(
        () => [
          new CircularDependencyPlugin({
            exclude: /node_modules/,
            include: /src/,
            failOnError: true,
            allowAsyncCycles: false,
            cwd: process.cwd(),
          }),
          // webpack-dev-server 强化插件
          // new DashboardPlugin(),
          // new webpack.HotModuleReplacementPlugin()
        ],
        []
      ),
      /**
       * 编译产物分析
       *  - https://www.npmjs.com/package/webpack-bundle-analyzer
       * 新增打包产物分析插件
       */
      ...when(
        isBuildAnalyzer,
        () => [
          new BundleAnalyzerPlugin({
            analyzerMode: 'static', // html 文件方式输出编译分析
            openAnalyzer: false,
            reportFilename: path.resolve(__dirname, `analyzer/index.html`),
          }),
        ],
        []
      ),
    ],
    module: {
      rules: [
        {
          test: /\.less$/i,
          use: [
            'css-loader',
            'postcss-loader',
            {
              loader: 'less-loader',
              options: {
                lessOption: {
                  modifyVars: { '@primary-color': '#1DA57A' },
                  javascriptEnabled: true,
                },
              },
            },
          ],
        },
      ],
    },
  },
};
