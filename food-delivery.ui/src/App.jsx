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

import Notification from './components/Common/Notification'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      username: sessionStorage.getItem('username'),
      isAuthed: sessionStorage.getItem('authtoken') !== null
    }

    this.clearUserData = this.clearUserData.bind(this)
    this.saveUserData = this.saveUserData.bind(this)
  }

  saveUserData (res) {
    sessionStorage.setItem('username', res.username)
    sessionStorage.setItem('roles', res.roles)
    sessionStorage.setItem('authtoken', res['access_token'])

    this.setState({
      username: sessionStorage.getItem('username'),
      isAuthed: sessionStorage.getItem('authtoken') !== null
    })
  }

  clearUserData () {
    sessionStorage.clear()

    this.setState({
      username: '',
      authtoken: '',
      isAuthed: false
    })
  }

  render () {
    return (
      <div style={{'overflowX': 'hidden'}}>
        <Header
          {...this.props}
          isAdmin={this.state.isAuthed && sessionStorage.getItem('roles') && sessionStorage.getItem('roles').includes('Admin')}
          isModerator={this.state.isAuthed && sessionStorage.getItem('roles') && sessionStorage.getItem('roles').includes('Moderator')}
          isEmployee={this.state.isAuthed && sessionStorage.getItem('roles') && sessionStorage.getItem('roles').includes('Employee')}
          isAuthed={this.state.isAuthed && sessionStorage.getItem('authtoken') !== null}
          username={this.state.username}
          clearUserData={this.clearUserData}
        />
        <Notification />
        <div className='container body-content'>
          <Switch>
            <Route exact path='/' component={() => <HomePage isAuthed={this.state.isAuthed} toggleProducts={this.toggleDetails} />} />
            <Route exact path='/account/user' component={ChangePasswordForm} />
            <Route exact path='/account/login' component={() => <LoginForm {...this.props} saveUserData={this.saveUserData} />} />
            <Route exact path='/account/register' component={() => <RegisterForm {...this.props} saveUserData={this.saveUserData} />} />

            <Route exact path='/admin/users/all' component={UsersPage} />

            <Route exact path='/moderator/categories' component={CategoriesPage} />
            <Route exact path='/moderator/categories/:id/products' component={() => <ProductsPage key={1} {...this.props} />} />
            <Route exact path='/moderator/categories/create' component={CreateCategoryForm} />
            <Route exact path='/moderator/categories/edit/:id' component={EditCategoryForm} />

            <Route exact path='/moderator/feedbacks' component={FeedbacksPage} />
            <Route exact path='/user/feedbacks/create/:id' component={CreateFeedbackForm} />

            <Route exact path='/moderator/toppings' component={ToppingsPage} />
            <Route exact path='/moderator/toppings/create' component={CreateToppingForm} />
            <Route exact path='/moderator/toppings/edit/:id' component={EditToppingForm} />

            <Route exact path='/moderator/products' component={() => <ProductsPage key={2} {...this.props} />} />
            <Route exact path='/moderator/products/create' component={CreateProductForm} />
            <Route exact path='/moderator/products/edit/:id' component={EditProductForm} />

            <Route exact path='/moderator/orders' component={ModeratorOrdersPage} />
            <Route exact path='/moderator/orders/details/:id' component={OrderDetailsPage} />

            <Route exact path='/employee/orders' component={EmployeeOrdersPage} />

            <Route exact path='/user/order' component={UserOrderPage} />
            <Route exact path='/user/orders' component={UserOrdersPage} />

            <Route component={() => <HomePage isAuthed={this.state.isAuthed} toggleProducts={this.toggleDetails} />} />
          </Switch>
        </div>
        <Footer />
      </div>
    )
  }
}

export default withRouter(App)
