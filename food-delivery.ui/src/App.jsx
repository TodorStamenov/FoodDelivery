import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'

import Header from './components/Common/Header'
import Footer from './components/Common/Footer'

import HomePage from './components/Home/HomePage'

import RegisterForm from './components/Auth/RegisterForm'
import LoginForm from './components/Auth/LoginForm'
import ChangePasswordForm from './components/Auth/ChangePasswordForm'

import UsersPage from './components/Users/UsersPage'

import CategoriesPage from './components/Categories/CategoriesPage'
import CreateCategoryForm from './components/Categories/CreateCategoryForm'
import EditCategoryForm from './components/Categories/EditCategoryForm'

import FeedbacksPage from './components/Feedbacks/FeedbacksPage'
import CreateFeedbackForm from './components/Feedbacks/CreateFeedbackForm'

import ToppingsPage from './components/Toppings/ToppingsPage'
import CreateToppingForm from './components/Toppings/CreateToppingForm'
import EditToppingForm from './components/Toppings/EditToppingForm'

import ModeratorOrdersPage from './components/Orders/ModeratorOrdersPage'
import EmployeeOrdersPage from './components/Orders/EmployeeOrdersPage'
import UserOrderPage from './components/Orders/UserOrderPage'
import UserOrdersPage from './components/Orders/UserOrdersPage'
import OrderDetailsPage from './components/Orders/OrderDetailsPage'

import ProductsPage from './components/Products/ProductsPage'
import CreateProductForm from './components/Products/CreateProductForm'
import EditProductForm from './components/Products/EditProductForm'

import auth from './api/auth'

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
    this.toggleDetails = this.toggleDetails.bind(this)
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
          console.log([...new Set(Object.values(res.ModelState).join(',').split(','))].join('\n'))
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

        if (res.ModelState) {
          console.log([...new Set(Object.values(res.ModelState).join(',').split(','))].join('\n'))
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

  toggleDetails (id, className) {
    let elements = document.getElementsByClassName(className)

    for (const element of elements) {
      if (element.getAttribute('data-id') === id) {
        if (element.style.display === '') {
          element.style.display = 'none'
        } else {
          element.style.display = ''
        }
      } else {
        element.style.display = 'none'
      }
    }
  }

  render () {
    return (
      <div style={{'overflowX': 'hidden'}}>
        <Header
          isAdmin={this.state.isAuthed && sessionStorage.getItem('roles').includes('Admin')}
          isModerator={this.state.isAuthed && sessionStorage.getItem('roles').includes('Moderator')}
          isEmployee={this.state.isAuthed && sessionStorage.getItem('roles').includes('Employee')}
          isAuthed={this.state.isAuthed}
          username={this.state.username}
          onLogout={this.onLogout}
        />
        <hr />
        <div className='container body-content'>
          <Switch>
            <Route exact path='/' component={() => <HomePage isAuthed={this.state.isAuthed} toggleProducts={this.toggleDetails} />} />
            <Route exact path='/account/user' component={ChangePasswordForm} />
            <Route exact path='/account/login' component={() => <LoginForm onSubmit={this.onLogin} />} />
            <Route exact path='/account/register' component={() => <RegisterForm onSubmit={this.onRegister} />} />

            <Route exact path='/admin/users/all' component={UsersPage} />

            <Route exact path='/moderator/categories' component={CategoriesPage} />
            <Route exact path='/moderator/categories/:id/products' component={() => <ProductsPage key={1} {...this.props} />} />
            <Route exact path='/moderator/categories/create' component={CreateCategoryForm} />
            <Route exact path='/moderator/categories/edit/:id' component={EditCategoryForm} />

            <Route exact path='/moderator/feedbacks' component={() => <FeedbacksPage toggleDetails={this.toggleDetails} />} />
            <Route exact path='/user/feedbacks/create/:id' component={CreateFeedbackForm} />

            <Route exact path='/moderator/toppings' component={ToppingsPage} />
            <Route exact path='/moderator/toppings/create' component={CreateToppingForm} />
            <Route exact path='/moderator/toppings/edit/:id' component={EditToppingForm} />

            <Route exact path='/moderator/products' component={() => <ProductsPage key={2} {...this.props} />} />
            <Route exact path='/moderator/products/create' component={CreateProductForm} />
            <Route exact path='/moderator/products/edit/:id' component={EditProductForm} />

            <Route exact path='/moderator/orders' component={ModeratorOrdersPage} />
            <Route exact path='/moderator/orders/details/:id' component={OrderDetailsPage} />

            <Route exact path='/employee/orders' component={() => <EmployeeOrdersPage toggleDetails={this.toggleDetails} />} />

            <Route exact path='/user/order' component={() => <UserOrderPage toggleDetails={this.toggleDetails} />} />
            <Route exact path='/user/orders' component={() => <UserOrdersPage toggleDetails={this.toggleDetails} />} />

            <Route component={() => <HomePage isAuthed={this.state.isAuthed} toggleProducts={this.toggleDetails} />} />
          </Switch>
        </div>
        <hr />
        <Footer />
      </div>
    )
  }
}

export default withRouter(App)
