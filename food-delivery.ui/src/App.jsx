import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'

import Header from './components/common/Header'
import RegisterForm from './components/Auth/RegisterForm'
import LoginForm from './components/Auth/LoginForm'
import HomePage from './components/Home/HomePage'
import Footer from './components/common/Footer'
import UsersPage from './components/Users/UsersPage'
import CategoriesPage from './components/Categories/CategoriesPage'
import ChangePasswordForm from './components/Auth/ChangePasswordForm'

import auth from './api/auth'
import CreateCategoryForm from './components/Categories/CreateCategoryForm'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      username: sessionStorage.getItem('username'),
      isAuthed: sessionStorage.getItem('username') !== null
    }

    this.onRegister = this.onRegister.bind(this)
    this.onLogin = this.onLogin.bind(this)
    this.onLogout = this.onLogout.bind(this)
    this.saveUserData = this.saveUserData.bind(this)
  }

  saveUserData (res) {
    sessionStorage.setItem('username', res.username)
    sessionStorage.setItem('roles', res.roles)
    sessionStorage.setItem('authtoken', res['access_token'])

    this.setState({
      username: sessionStorage.getItem('username'),
      isAuthed: sessionStorage.getItem('username') !== null
    })
  }

  onRegister (data) {
    auth.register(data.email, data.password, data.confirmPassword)
      .then(res => {
        if (res.ModelState) {
          console.log(Object.values(res.ModelState).join('\n'))
          return
        }

        this.saveUserData(res)
        this.props.history.push('/')
      })
  }

  onLogin (data) {
    auth.login(data.email, data.password)
      .then(res => {
        if (res.error) {
          console.log(res.error_description)
          return
        }

        this.saveUserData(res)
        this.props.history.push('/')
      })
  }

  onLogout () {
    auth.logout().then(() => {
      this.props.history.push('/')
      sessionStorage.clear()

      this.setState({
        username: '',
        authtoken: '',
        isAuthed: false
      })
    })
  }

  render () {
    return (
      <div>
        <Header
          isAdmin={this.state.isAuthed && sessionStorage.getItem('roles').includes('Admin')}
          isModerator={this.state.isAuthed && sessionStorage.getItem('roles').includes('Moderator')}
          isAuthed={this.state.isAuthed}
          username={this.state.username}
          onLogout={this.onLogout}
        />
        <hr />
        <div className='container body-content'>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/account/user' component={ChangePasswordForm} />
            <Route exact path='/account/login' component={() => <LoginForm onSubmit={this.onLogin} />} />
            <Route exact path='/account/register' component={() => <RegisterForm onSubmit={this.onRegister} />} />
            <Route exact path='/users/all' component={UsersPage} />
            <Route exact path='/moderator/categories' component={CategoriesPage} />
            <Route exact path='/moderator/categories/create' component={CreateCategoryForm} />
            <Route component={HomePage} />
          </Switch>
        </div>
        <hr />
        <Footer />
      </div>
    )
  }
}

export default withRouter(App)
