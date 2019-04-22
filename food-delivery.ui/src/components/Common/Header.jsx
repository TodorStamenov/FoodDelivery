import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  Nav,
  Collapse,
  NavbarToggler,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'
import auth from '../../api/auth'
import actions from '../../utils/actions'
import './Header.css'

class Header extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isOpen: false
    }

    this.onLogout = this.onLogout.bind(this)
    this.toggle = this.toggle.bind(this)
  }

  toggle () {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  onLogout () {
    auth.logout().then(res => {
      this.props.clearUserData()
      this.props.showSuccess(res.Message || res)
      this.props.history.push('/')
    })
  }

  render () {
    return (
      <nav className='mb-3 navbar navbar-expand-lg navbar-dark text-white bg-secondary'>
        <Link className='navbar-brand' to='/'>Food Delivery</Link>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className='main-nav' navbar>
            <ul className='navbar-nav mr-auto'>
              {
                this.props.isAuthed &&
                <li><Link className='nav-link' to='/user/order'>Order</Link></li>
              }
              {
                this.props.isAuthed &&
                <li><Link className='nav-link' to='/user/orders'>My Orders</Link></li>
              }
            </ul>
            <ul className='nav navbar-nav navbar-right float-right'>
              {
                this.props.isAdmin &&
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>Admin</DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem><Link className='dropdown-item' to='/admin/users/all'>Users</Link></DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              }
              {
                this.props.isModerator &&
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>Moderator</DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem><Link className='dropdown-item' to='/moderator/orders'>Orders</Link></DropdownItem>
                    <DropdownItem><Link className='dropdown-item' to='/moderator/categories'>Categories</Link></DropdownItem>
                    <DropdownItem><Link className='dropdown-item' to='/moderator/products'>Products</Link></DropdownItem>
                    <DropdownItem><Link className='dropdown-item' to='/moderator/toppings'>Toppings</Link></DropdownItem>
                    <DropdownItem><Link className='dropdown-item' to='/moderator/feedbacks'>Feedbacks</Link></DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              }
              {
              this.props.isEmployee &&
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>Employee</DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem><Link className='dropdown-item' to='/employee/orders'>Orders</Link></DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              }
              {
                !this.props.isAuthed &&
                <li><Link className='nav-link' to='/account/register'>Register</Link></li>
              }
              {
                !this.props.isAuthed &&
                <li><Link className='nav-link' to='/account/login'>Login</Link></li>
              }
              {
                this.props.isAuthed &&
                <li><Link className='nav-link' to='/account/user'>Hello {this.props.username}!</Link></li>
              }
              {
                this.props.isAuthed &&
                <li><a className='nav-link' href='javascript:void(0)' onClick={this.onLogout}>Logout</a></li>
              }
            </ul>
          </Nav>
        </Collapse>
      </nav>
    )
  }
}

function mapState (state) {
  return {
    appState: state
  }
}

function mapDispatch (dispatch) {
  return {
    showError: message => dispatch(actions.showErrorNotification(message)),
    showSuccess: message => dispatch(actions.showSuccessNotification(message))
  }
}

export default connect(mapState, mapDispatch)(Header)
