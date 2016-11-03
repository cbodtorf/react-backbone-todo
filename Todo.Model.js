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
    this.set({
      completed: !JSON.parse(this.get('completed'))
    })

    let self = this
    $.ajax({
      method: 'PUT',
      data: self.attributes,
      url: `http://tiny-tiny.herokuapp.com/collections/todos-cb/${self.id}`,
      success(resp){
        console.log('success', resp);
        Backbone.Events.trigger('reRender')
      },
      error(resp){
        console.log('error', resp);
      }
    })
  },

  // Delete the todo item
  delete() {
    let self = this
    $.ajax({
      method: 'DELETE',
      url: `http://tiny-tiny.herokuapp.com/collections/todos-cb/${self.id}`,
      success(resp){
        console.log('success', resp);
        Backbone.Events.trigger('reRender')
      },
      error(resp){
        console.log('error', resp);
      }
    })
  }

})
