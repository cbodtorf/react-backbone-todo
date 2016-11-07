'use strict'
/**
* ROUTER
*/
import React from 'react'
import ReactDom from 'react-dom'
import $ from 'jquery'
import Backbone from 'backbone'

import App from './App.Component'
import TodoCollection from './Todo.Collection'


module.exports = Backbone.Router.extend({
  initialize() {
    this.todoCollection = new TodoCollection()

  },

  routes: {
    '': 'renderApp',
  },

  renderApp() {
    let self = this

    this.todoCollection.fetch().then(() => {
      self.todoCollection.forEach((model) => {
        model.set({
          completed: (model.get('completed') == "true")
        })
      })

      ReactDom.render(<App todos={self.todoCollection} />, document.getElementById('app'))
    })
  },

})
