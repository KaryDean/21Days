//server.js这里起到的作用相当于服务器总管理
//这里负责了，链接什么端口，处理什么数据

const express =require('express')
const bodyParser =require('body-parser')
const cookieParser =require('cookie-parser')

const userRouter =require('./user')//来自user.js文件的路径

const app =express()


app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user',userRouter)
app.listen(9093,function(){
  console.log("连接9093")
})
