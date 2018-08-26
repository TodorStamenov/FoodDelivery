import React, { Component } from 'react'

export default class TableHead extends Component {
  render () {
    return (
      <thead className='text-light bg-secondary'>
        <tr>{this.props.heads.map((h, i) => <th key={i}>{h}</th>)}</tr>
      </thead>
    )
  }
}
