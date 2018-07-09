import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import Header from './components/common/Header'
import RegisterForm from './components/Auth/RegisterForm'
import LoginForm from './components/Auth/LoginForm'
import HomePage from './components/Home/HomePage'
import Footer from './components/common/Footer'
import auth from './api/auth'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      username: '',
      authtoken: '',
      isAuthed: '',
      roles: []
    }

    this.onRegister = this.onRegister.bind(this)
    this.onLogin = this.onLogin.bind(this)
    this.onLogout = this.onLogout.bind(this)
  }

  onRegister (data) {
    auth.register(data.username, data.password, data.confirmPassword)
      .then(res => {
        if (res.ModelState) {
          for (const key in res.ModelState) {
            console.log(res.ModelState[key])
          }
          return
        }

        this.onLogin(data)
      })
  }

  onLogin (data) {
    auth.login(data.username, data.password)
      .then(res => {
        if (res.error) {
          console.log(res.error_description)
          return
        }

        this.props.history.push('/')

        sessionStorage.setItem('username', res.userName)
        sessionStorage.setItem('authtoken', res['access_token'])
        sessionStorage.setItem('roles', [])

        this.setState({
          username: sessionStorage.getItem('username'),
          authtoken: sessionStorage.getItem('authtoken'),
          isAuthed: sessionStorage.getItem('authtoken') !== null,
          roles: []
        })
      })
  }

  onLogout () {
    auth.logout().then(() => {
      sessionStorage.clear()

      this.setState({
        username: '',
        authtoken: '',
        isAuthed: false,
        roles: []
      })

      this.props.history.push('/')
    })
  }

  render () {
    return (
      <div>
        <Header loggedIn={this.state.isAuthed} username={this.state.username} onLogout={this.onLogout} />
        <hr />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/users/login' component={() =>
            this.state.isAuthed ? this.props.history.push('/') : <LoginForm onSubmit={this.onLogin} />} />
          <Route exact path='/users/register' component={() =>
            this.state.isAuthed ? this.props.history.push('/') : <RegisterForm onSubmit={this.onRegister} />} />
        </Switch>
        <hr />
        <Footer />
      </div>
    )
  }
}

export default withRouter(App)
