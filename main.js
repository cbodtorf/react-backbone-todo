'use strict'
/**
* APPLICATION INIT
*/
import $ from 'jquery'
import Backbone from 'backbone'

import Router from './App.Router'


/**
* external server
* http://tiny-tiny.herokuapp.com/collections/todo-cb
*/

window.addEventListener('load', () => {
  const router = new Router()

  Backbone.history.start()
})
