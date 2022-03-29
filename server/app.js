// 导入express模块
const express = require('express')
// 创建express的服务器实例
const app = express()

// 配置解析表单数据的中间件
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// 封装函数res.cc，响应客户端请求
app.use((req, res, next) => {
    // status默认值为1，表示失败的情况
    // msg的值可能是一个错误对象，或者是错误字符串，或者是请求成功信息
    let resMsg = {}
    res.cc = (msg, status = 1, data = {}) => {
        resMsg.status = status
        resMsg.message = msg instanceof Error ? msg.message : msg
        if (JSON.stringify(data) !== '{}') {
            resMsg.data = data
        }
        res.send(resMsg)
    }
    next()
})

// 导入并注册todo模块
const todoRouter = require('./router/todo')
app.use('/todo', todoRouter)

// 定义错误级别的中间件
app.use((err, req, res, next) => {
    res.cc(err)
})

app.listen('8080', () => {
    console.log('api server running at http://127.0.0.1:8080')
})