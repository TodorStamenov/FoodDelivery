import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import auth from '../../api/auth'
import actions from '../../utils/actions'

class Header extends Component {
  constructor (props) {
    super(props)

    this.state = {
      adminDropdownOpen: false,
      moderatorDropdownOpen: false,
      employeeDropdownOpen: false
    }

    this.toggleAdmin = this.toggleAdmin.bind(this)
    this.toggleModerator = this.toggleModerator.bind(this)
    this.toggleEmployee = this.toggleEmployee.bind(this)
    this.onLogout = this.onLogout.bind(this)
  }

  toggleAdmin () {
    this.setState(prevState => ({
      adminDropdownOpen: !prevState.adminDropdownOpen
    }))
  }

  toggleModerator () {
    this.setState(prevState => ({
      moderatorDropdownOpen: !prevState.moderatorDropdownOpen
    }))
  }

  toggleEmployee () {
    this.setState(prevState => ({
      employeeDropdownOpen: !prevState.employeeDropdownOpen
    }))
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
      <nav className='navbar navbar-expand-lg navbar-dark text-white bg-secondary'>
        <Link className='navbar-brand' to='/'>Food Delivery</Link>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon' />
        </button>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav mr-auto'>
            {this.props.isAuthed && <li><Link className='nav-link' to='/user/order'>Order</Link></li>}
            {this.props.isAuthed && <li><Link className='nav-link' to='/user/orders'>My Orders</Link></li>}
          </ul>
          <ul className='nav navbar-nav navbar-right'>
            {
              this.props.isAdmin &&
              <Dropdown isOpen={this.state.adminDropdownOpen} toggle={this.toggleAdmin}>
                <DropdownToggle nav caret>Admin</DropdownToggle>
                <DropdownMenu>
                  <DropdownItem><Link className='dropdown-item' to='/admin/users/all'>Users</Link></DropdownItem>
                </DropdownMenu>
              </Dropdown>
            }
            {
              this.props.isModerator &&
              <Dropdown isOpen={this.state.moderatorDropdownOpen} toggle={this.toggleModerator}>
                <DropdownToggle nav caret>Moderator</DropdownToggle>
                <DropdownMenu>
                  <DropdownItem><Link className='dropdown-item' to='/moderator/orders'>Orders</Link></DropdownItem>
                  <DropdownItem><Link className='dropdown-item' to='/moderator/categories'>Categories</Link></DropdownItem>
                  <DropdownItem><Link className='dropdown-item' to='/moderator/products'>Products</Link></DropdownItem>
                  <DropdownItem><Link className='dropdown-item' to='/moderator/toppings'>Toppings</Link></DropdownItem>
                  <DropdownItem><Link className='dropdown-item' to='/moderator/feedbacks'>Feedbacks</Link></DropdownItem>
                </DropdownMenu>
              </Dropdown>
            }
            {
              this.props.isEmployee &&
              <Dropdown isOpen={this.state.employeeDropdownOpen} toggle={this.toggleEmployee}>
                <DropdownToggle nav caret>Employee</DropdownToggle>
                <DropdownMenu>
                  <DropdownItem><Link className='dropdown-item' to='/employee/orders'>Orders</Link></DropdownItem>
                </DropdownMenu>
              </Dropdown>
            }
            {!this.props.isAuthed && <li><Link className='nav-link' to='/account/register'>Register</Link></li>}
            {!this.props.isAuthed && <li><Link className='nav-link' to='/account/login'>Login</Link></li>}
            {this.props.isAuthed && <li><Link className='nav-link' to='/account/user'>Hello {this.props.username}!</Link></li>}
            {this.props.isAuthed && <li><a className='nav-link' href='javascript:void(0)' onClick={this.onLogout}>Logout</a></li>}
          </ul>
        </div>
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
