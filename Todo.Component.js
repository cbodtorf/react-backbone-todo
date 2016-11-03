'use strict'
/**
* TODOS COMPONENT
*/
import React, { Component, PropTypes } from 'react'
import ReactDom from 'react-dom'


export default class Todo extends Component {

  render() {
    let date = new Date(this.props.todo.get('date'))

    return (
      <li>
        <input
          className="toggle"
          type="checkbox"
          checked={this.props.todo.get('completed') === 'true'}
          onChange={this.props.onToggle}
        />
        { this.props.todo.get('text') }


        <button className="destroy" onClick={this.props.onDestroy}>Delete</button>
        <br />
        <span>Posted on: { date.toDateString() } </span>
      </li>
    )
  }
}

Todo.propTypes = {
  // This component gets the todo to display through a React prop.
  // We can use propTypes to indicate it is required
  todo: PropTypes.object.isRequired,
};
