# 21Days

## 实现功能
1. 注册界面/登录界面---实现用户登录注册
2. 首页界面---查看当前所有目标详情，点赞/监督他人
3. 制定目标界面---制定自己的目标（包含目标名称、时长、指定承诺金等等）并上链
4. 个人中心界面---查看自己所有的目标，并打卡自己的目标（上链）

## 演示视频
[演示视频，上传后清晰度有点低](https://v.youku.com/v_show/id_XMzgwNzA5MzAwOA==.html?spm=a2h3j.8428770.3416059.1)
### 使用工具
前端：react、redux、react-router

后端：express、mongodb

区块链：truffle、solidity

本地区块链网络：ganache

### 使用方法
1. 安装包依赖文件
```
npm install
```
生成node_modules

2. 合约部署
```
truffle compile//合约编译
truffle migrate//合约部署
```
3. 运行
打开ganache，端口为7545
运行后端，进入server文件夹
```
nodemon server.js
```
运行前端
```
npm start
```

## 界面
[页面浏览](https://github.com/KaryDean/21Days/blob/master/image/README.md)

### 目录结构
```
21Days
	config
		自动生成
	contract
		智能合约
	migrations
		部署合约代码
	public
		truffle自带
	scripts
		truffle自带
	server
		model.js
			定义数据库规范
		server.js
			连接数据库
		user.js
			数据库操作
	authroute
		authroute.js
	Component
		Aiminfo
			Aiminfo.js
				详细信息面板
		Avatar-selector
			未使用
		Center
			center.js
				个人中心
			centerCard.js
				个人中心中目标显示模块
			Recordinfo.js
				记录打卡交易地址模块
		circusee
			Circusee.js
				围观主页
			circuseeCard.js
				围观主页中目标显示模块
		dashboard
			Dashboard.js
				最上方显示栏
		Homepage
			Homepage.js
				首页
		informationCard
			informationCard.js
				首页的目标显示模块
		logo
			未使用
		makeaim
			makeaim.js
				创建目标页
		navlink
			navlink.js
				忘了
		punch
			Punch.js
				打卡
	login
		login.js
			打卡页面
	redux
		aim.redux.js
			目标状态管理
		center.redux.js
			个人中心状态管理
		circusee.redux.js
			围观状态管理
		Empty.redux.js
			空目标状态管理
		user.redux.js
			用户状态状态管理
	register
		register.js
			注册页面
	utils
		getWeb3.js
			truffle自带用于连接区块链端口
	App.js
		本文件用于测试
			可单独使用测试
	config.js
		拦截器
	index.js
		主页
	reducers.js
		状态合成
	test
		Truffle 自带
			用于测试
	Package-lock.json
		自动生成
	package.json
		包依赖文件
	Truffle-config.js
		不知道
	truffle.js
		区块链网络端口
```
