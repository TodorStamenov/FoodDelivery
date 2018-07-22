import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

export default function protectedRoute (WrappedComponent, allowedRole) {
  return class extends Component {
    render () {
      if (sessionStorage.getItem('roles') !== null && sessionStorage.getItem('roles').includes(allowedRole)) {
        return <WrappedComponent {...this.props} />
      }

      return <Redirect to='/account/login' />
    }
  }
}
