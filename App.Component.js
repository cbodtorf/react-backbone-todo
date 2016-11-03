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
    this.props.todos.on('sync', this._handleSync())

    this.props.todos.on('change', () => {
      self._handleSync()
    })
  }

  _handleSync(){
    this.setState({
      todos: this.props.todos.models
    })
  }


  _handleSubmit(event) {
    event.preventDefault()

    if( this.refs.todoInput.value === '' ) {
      console.log('please write something');
      return
    } else {

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

  _renderTodos() {
    return this.props.todos.map((model) => {

      return (
        <Todo
          todo={ model }
          key={ model.cid }
          onToggle={ model.toggle.bind(model) }
          onDestroy={ model.delete.bind(model) }
          />)
    })
  }


  render() {

    return (
      <div>
        <h6>Todo App</h6>
        <input type="text" className="form-control" placeholder="new todo!" ref="todoInput"/>
        <button className="btn btn-block btn-success btn-lg" onClick={ this._handleSubmit.bind(this) }>+</button>
        { this._renderTodos() }
      </div>
    )
  }
}
