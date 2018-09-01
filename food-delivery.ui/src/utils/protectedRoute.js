import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

export default function protectedRoute (WrappedComponent, allowedRole) {
  return class extends Component {
    render () {
      if (sessionStorage.getItem('roles') && sessionStorage.getItem('roles').includes(allowedRole)) {
        return <WrappedComponent {...this.props} />
      }

      if (sessionStorage.getItem('username') && allowedRole === 'authed') {
        return <WrappedComponent {...this.props} />
      }

      return <Redirect to='/account/login' />
    }
  }
}
