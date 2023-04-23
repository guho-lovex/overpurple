---
title: ReactNative的开发使用
date: "2023-04-19T08:43:48.977Z"
description: 介绍开始使用reactnative的步骤及开发配置
---
待续...
#### react native 中使用别名alias
在`tsconfig.json`文件中添加解析路径别名使用
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
    },
  }
}

```
加入babel插件`babel-plugin-module-resolver`
用于babel打包的时候解析路径别名使用，不配置的话，运行时找不到文件报错
```js
yarn add  -D babel-plugin-module-resolver
```
编辑`babel.config.js`配置插件
```jsx
module.exports = {
  ...
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '*': ['./src'],
        },
      },
    ],
  ],
};

```
配置好上面后，运行下面命令进行验证
```
yarn start --reset-cache
```
`--reset-cache`是用来标记清除缓存的，一定要加上，不然配置不生效

#### Debugger
使用`react-devtools`工具 详情见[react-devtools](https://www.npmjs.com/package/react-devtools)
安装
```shell
# Yarn
yarn global add react-devtools
or
# NPM
npm install -g react-devtools
```
如果您希望避免全局安装，则可以添加react-devtools为项目依赖项
```shell
yarn add --dev react-devtools
```
使用npm你可以使用npx
```shell
npx react-devtools
```
与react native 一起使用
```shell
react-devtools
```

