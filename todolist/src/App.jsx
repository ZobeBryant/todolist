import React, { Component } from 'react'
import Header from './components/Header'
import List from './components/List'
import Footer from './components/Footer'
import './App.css'
import axios from 'axios'

export default class App extends Component {
    // 状态在哪里操作状态的方法就在哪里
    // 初始化状态
    state = {
        todos: [
            { id: '001', name: '吃饭', done: 0 },
            { id: '002', name: '睡觉', done: 0 },
            { id: '003', name: '打代码', done: 0 },
        ]
    }
    // 查询所有todo
    queryAllTodos() {
        axios.get('/api/todo/todos')
            .then(response => {
                let data = response.data.data
                data.sort((a, b) => {
                    return b.id - a.id
                })
                this.setState({ todos: data })
            }, error => {
                console.log('请求数据失败，', error)
            })
    }
    //组件挂载完毕的钩子
    componentDidMount() {
        this.queryAllTodos()
    }
    // addTodo用于添加一个todo，接收的参数是todo对象
    addTodo = (todoObj) => {
        // 获取原todos
        const { todos } = this.state
        axios.post('/api/todo/addTodo', todoObj)
            .then(response => {
                todoObj.id = response.data.data.id
                todoObj.done = 0
                // 追加一个todo
                const newTodos = [todoObj, ...todos]
                // 更新状态
                this.setState({ todos: newTodos })
            }, error => {
                console.log('添加todo失败，', error)
            })

    }
    // updateTodo用于更新一个todo对象
    updateTodo = (id, done) => {
        // 获取状态中的todos
        const { todos } = this.state
        // 匹配处理数据
        const newTodos = todos.map((todoObj) => {
            if (todoObj.id === id) return { ...todoObj, done }
            else return todoObj
        })
        axios.post('/api/todo/updateTodo', {
            id,
            done
        }).then(response => {
            this.setState({ todos: newTodos })
        }, error => {
            console.log('更新todo失败，', error)
        })
    }

    // deleteTodo用于删除一个todo对象
    deleteTodo = (id) => {
        // 获取原来的todos
        const { todos } = this.state
        // 删除指定id的todo对象
        const newTodos = todos.filter((todoObj) => {
            return todoObj.id !== id
        })
        // 更新状态
        axios.post('/api/todo/deleteTodo', {
            id
        }).then(response => {
            this.setState({ todos: newTodos })
        }, error => {
            console.log('删除todo失败，', error)
        })
    }
    // checkAllTodo用于全选
    checkAllTodo = (done) => {
        // 获取原来的todos
        const { todos } = this.state
        // 加工数据
        const newTodos = todos.map((todo) => {
            return { ...todo, done }
        })
        axios.post('/api/todo/updateAllTodos', {
            done
        }).then(response => {
            this.setState({ todos: newTodos })
        }, error => {
            console.log('批量更新任务状态失败，', error)
        })

    }
    // clearAllDone用于清除所有已完成的
    clearAllDone = () => {
        // 获取原来的todos
        const { todos } = this.state
        // 记录要删除的id
        const ids = []
        // 过滤数据
        const newTodos = todos.filter((todoObj) => {
            if (todoObj.done)
                ids.push(todoObj.id)
            return !todoObj.done
        })
        axios.post('/api/todo/deleteTodosById', {
            id: ids
        }).then(response => {
            // 更新状态
            this.setState({ todos: newTodos })
        }, error => {
            console.log('批量删除任务失败，', error)
        })

    }
    render() {
        const { todos } = this.state
        return (
            <div className="todo-container">
                <div className="todo-wrap">
                    <Header addTodo={this.addTodo} />
                    <List todos={todos} updateTodo={this.updateTodo} deleteTodo={this.deleteTodo} />
                    <Footer todos={todos} checkAllTodo={this.checkAllTodo} clearAllDone={this.clearAllDone} />
                </div>
            </div>
        )
    }
}
