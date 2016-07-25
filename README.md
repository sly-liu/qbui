# qbui
QBUI旨在为QB Web开发提供统一的UI框架。浏览器只支持较新版本的**Chrome**，其他浏览器在样式上会有不同程度的不兼容。

## 如何使用
1. 请先确保安装了nodejs
2. 将本项目clone到本地，例如`git clone git@github.com:majiangl/qbui.git`
3. 进入本地qbui目录，运行`npm install`
4. 待第三步安装完所需插件后，运行`gulp`进行构建

## 如何只选择需要的CSS和JS文件
- 找到less/qb.less文件，将不需要的less文件注释掉
- 找到gulpfile.js文件，找到jsPlugins变量，注释掉不需要的js文件路径