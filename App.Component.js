'use strict'
/**
* APP COMPONENT
*/
import React, { Component, PropTypes } from 'react'
import ReactDom from 'react-dom'
import $ from 'jquery'
import Backbone from 'backbone'

import Todo from './Todo.Component'
import TodoModel from './Todo.Model'


export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: props.todos.models
    }
  }

  componentDidMount() {
    let self = this
    this.props.todos.on('sync', this.handleSync())

      this.props.todos.on('change', () => {
        self.handleSync()
      })
  }

  handleSync(){
    this.setState({
      todos: this.props.todos.models
    })
  }


  handleSubmit(event) {
    event.preventDefault()
    if(this.refs.todoInput.value === '') {
      console.log('please write something');
      return
    } else {
      let component = this

      let todoObject = new TodoModel({
        text: this.refs.todoInput.value,
        date: new Date(),
        completed: false
      })

      this.refs.todoInput.value = ''
      this.props.todos.unshift(todoObject)
      todoObject.save();
    }
  }

  renderTodos() {
    return this.props.todos.map((el) => {

      return (
        <Todo
          todo={ el }
          key={ el.cid }
          onToggle={el.toggle.bind(el)}
          onDestroy={el.delete.bind(el)}
          />)
    })
  }


  render() {

    return (
      <div>
        <h6>Todo App</h6>
        <input type="text" className="form-control" placeholder="new todo!" ref="todoInput"/>
        <button className="btn btn-block btn-success btn-lg" onClick={ this.handleSubmit.bind(this) }>+</button>
        { this.renderTodos() }
      </div>
    )
  }
}
