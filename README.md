# 21Days
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

### 界面
1. [个人中心界面](https://github.com/KaryDean/21Days/blob/master/image/%E4%B8%AA%E4%BA%BA%E4%B8%AD%E5%BF%83.png)
2. [个人中心已完成目标界面](https://github.com/KaryDean/21Days/blob/master/image/%E4%B8%AA%E4%BA%BA%E4%B8%AD%E5%BF%83%E5%B7%B2%E5%AE%8C%E6%88%90%E7%9B%AE%E6%A0%87.png)
3. [制定目标界面](https://github.com/KaryDean/21Days/blob/master/image/%E5%88%B6%E5%AE%9A%E7%9B%AE%E6%A0%87.png)
4. [围观界面](https://github.com/KaryDean/21Days/blob/master/image/%E5%9B%B4%E8%A7%82.png)
5. [注册界面](https://github.com/KaryDean/21Days/blob/master/image/%E6%B3%A8%E5%86%8C%E7%95%8C%E9%9D%A2.png)
6. [登录界面](https://github.com/KaryDean/21Days/blob/master/image/%E7%99%BB%E5%BD%95%E7%95%8C%E9%9D%A2.png)
7. [首页界面](https://github.com/KaryDean/21Days/blob/master/image/%E9%A6%96%E9%A1%B5.png)
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
