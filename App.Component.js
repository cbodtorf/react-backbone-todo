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
import TodoCollection from './Todo.Collection'


export default class App extends Component {
  constructor(props) {
    super(props)
    console.log('const', props )

    this.state = {
      todos: props.todos
    }

  }

  componentWillMount() {

    Backbone.Events.on('reRender', (todo, method) => {
      let newColl = new TodoCollection(this.state.todos.models)
      let newMod = newColl.get(todo)

      if(method === 'DELETE') {

        newColl.remove(todo.id)

      } else if(method === 'PUT') {
        newMod.set({
          completed: !newMod.get('completed')
        })
        Backbone.Events.trigger('updateChecks', newMod)
      }

      this._handleSync(newColl)
    }).bind(this)
  }

  _handleSync(collection){
    console.log('handle sync');
    this.setState({
      todos: collection
    })
  }


  _handleSubmit(event) {
    event.preventDefault()
    let newColl = new TodoCollection(this.state.todos.models)

    if( this.refs.todoInput.value === '' ) {
      console.error('please write something!!!! c@__@c)');
      return
    } else {

      let todoObject = new TodoModel({
        text: this.refs.todoInput.value,
        date: new Date(),
        completed: false
      })

      this.refs.todoInput.value = ''

      newColl.unshift(todoObject)

      todoObject.save();
      this._handleSync(newColl)
    }
  }

  _renderTodos() {
    return this.state.todos.map((model) => {

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
