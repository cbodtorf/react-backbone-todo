'use strict'
/**
* TODOS COLLECTION
*/
import $ from 'jquery'
import Backbone from 'backbone'

import TodoModel from './Todo.Model'


module.exports = Backbone.Collection.extend({

  model: TodoModel,

  url: 'http://tiny-tiny.herokuapp.com/collections/todos-cb',

})
