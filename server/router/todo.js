// todo的路由模块
const express = require('express')
const router = express.Router()
// 导入todo处理函数
const todo_handler = require('../router_handler/todo')

// 获取todo数据的路由
router.get('/todos', todo_handler.queryTodos)
// 新增todo的路由
router.post('/addTodo', todo_handler.addTodo)
// 删除某一todo的路由
router.post('/deleteTodo', todo_handler.deleteTodoById)
// 删除所有todo的路由
router.post('/deleteTodosById', todo_handler.deleteTodosById)
// 更新todo的路由
router.post('/updateTodo', todo_handler.updateTodoById)
// 更新所有todo的路由
router.post('/updateAllTodos', todo_handler.updateAllTodos)

module.exports = router