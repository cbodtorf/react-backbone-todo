'use strict'
/**
* TODOS MODEL
*/
import $ from 'jquery'
import Backbone from 'backbone'


module.exports = Backbone.Model.extend({
  url: 'http://tiny-tiny.herokuapp.com/collections/todos-cb',

  idAttribute: '_id',

  defaults: {
    _id: null,
    text: null,
    date: null,
    completed: false,
  },

  // Toggle the `completed` state of this todo item.
  toggle() {

    Backbone.Events.on('updateChecks', function(todo){
      console.log('checks');
      $.ajax({
        method: 'PUT',
        data: todo.attributes,
        url: `http://tiny-tiny.herokuapp.com/collections/todos-cb/${todo.id}`,
        success(resp){
          console.log('success', resp);
        },
        error(resp){
          console.log('error', resp);
        }
      })
    })

    Backbone.Events.trigger('reRender', this, 'PUT')

  },

  // Delete the todo item
  delete() {
    let self = this
    $.ajax({
      method: 'DELETE',
      url: `http://tiny-tiny.herokuapp.com/collections/todos-cb/${self.id}`,
      success(resp){
        console.log('success', resp);
      },
      error(resp){
        console.log('error', resp);
      }
    }).then((resp)=> {
      console.log('del', self);
      Backbone.Events.trigger('reRender', self, 'DELETE')
    })
  }

})
