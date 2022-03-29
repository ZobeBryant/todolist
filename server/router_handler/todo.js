// todo路由函数处理模块

// 导入数据库操作模块
const db = require('../db/index')

// 新增任务
exports.addTodo = (req, res) => {
    // 定义新增任务的sql语句
    const sql = 'insert into todo set ?'
    // 执行sql
    db.query(sql, req.body, (err, results) => {
        if(err) return res.cc(err)
        if(results.affectedRows !== 1) return res.cc('新增任务失败！')
        res.cc('新增任务成功！', 0, {id: results.insertId})
    })
}

// 查询所有任务(完成和未完成)
exports.queryTodos = (req, res) => {
     // 定义查询任务的sql语句
     const sql = 'select id, name, done from todo where is_delete = 0'
     // 执行sql
     db.query(sql, (err, results) => {
         if(err) return res.cc(err)
         if(results.affectedRows == 0) return res.cc('查询任务失败！')
         res.cc('查询任务成功', 0, results)
     })

}

// 删除某一任务
exports.deleteTodoById = (req, res) => {
    // 定义查询任务的sql语句
    const sql = 'update todo set is_delete = 1 where id = ?'
    // 执行sql
    db.query(sql, req.body.id, (err, results) => {
        if(err) return res.cc(err)
        if(results.affectedRows == 0) return res.cc('查询任务失败！')
        res.cc('删除任务成功', 0)
    })
}

// 批量删除任务
exports.deleteTodosById = (req, res) => {
    // 定义查询任务的sql语句
    const sql = 'update todo set is_delete = 1 where id in (?)'
    // 执行sql
    db.query(sql, [req.body.id], (err, results) => {
        if(err) return res.cc(err)
        if(results.affectedRows == 0) return res.cc('查询任务失败！')
        res.cc('批量删除任务成功', 0)
    })
}

// 更新任务状态
exports.updateTodoById = (req, res) => {
    // 定义查询任务的sql语句
    const sql = 'update todo set done = ? where id = ?'
    // 执行sql
    db.query(sql, [req.body.done, req.body.id], (err, results) => {
        if(err) return res.cc(err)
        if(results.affectedRows == 0) return res.cc('查询任务失败！')
        res.cc('任务状态更新成功！', 0)
    })
}

// 更新所有任务状态
exports.updateAllTodos = (req, res) => {
    // 定义查询任务的sql语句
    const sql = 'update todo set done = ?'
    // 执行sql
    db.query(sql, req.body.done, (err, results) => {
        if(err) return res.cc(err)
        if(results.affectedRows == 0) return res.cc('查询任务失败！')
        res.cc('任务状态更新成功！', 0)
    })
}