import React, { Component } from 'react'

export default class TableHead extends Component {
  render () {
    return (
      <thead>
        <tr>{this.props.heads.map((h, i) => <th key={i}>{h}</th>)}</tr>
      </thead>
    )
  }
}
