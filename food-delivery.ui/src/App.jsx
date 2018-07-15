import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import Header from './components/common/Header'
import RegisterForm from './components/Auth/RegisterForm'
import LoginForm from './components/Auth/LoginForm'
import HomePage from './components/Home/HomePage'
import Footer from './components/common/Footer'
import auth from './api/auth'
import UsersPage from './components/Admin/UsersPage'
import CategoriesPage from './components/Moderator/CategoriesPage'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      username: sessionStorage.getItem('username'),
      authtoken: sessionStorage.getItem('authtoken'),
      isAuthed: sessionStorage.getItem('authtoken') !== null,
      roles: sessionStorage.getItem('roles') || []
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

        sessionStorage.setItem('username', res.userName)
        sessionStorage.setItem('authtoken', res['access_token'])

        auth.getRoles().then(roles => {
          sessionStorage.setItem('roles', JSON.stringify(roles))

          this.setState({
            username: sessionStorage.getItem('username'),
            authtoken: sessionStorage.getItem('authtoken'),
            isAuthed: sessionStorage.getItem('authtoken') !== null,
            roles
          })
        })

        this.props.history.push('/')
      })
  }

  onLogout () {
    auth.logout().then(() => {
      sessionStorage.clear()
      this.props.history.push('/')

      this.setState({
        username: '',
        authtoken: '',
        isAuthed: false,
        roles: []
      })
    })
  }

  render () {
    return (
      <div>
        <Header
          isAdmin={this.state.roles.includes('Admin')}
          isModerator={this.state.roles.includes('Moderator')}
          loggedIn={this.state.isAuthed}
          username={this.state.username}
          onLogout={this.onLogout}
        />
        <hr />
        <div className='container body-content'>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/users/login' component={() => <LoginForm onSubmit={this.onLogin} />} />
            <Route exact path='/users/register' component={() => <RegisterForm onSubmit={this.onRegister} />} />
            <Route exact path='/admin/users' component={UsersPage} />
            <Route exact path='/moderator/categories' component={CategoriesPage} />
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
