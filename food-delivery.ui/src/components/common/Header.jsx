import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

export default class Header extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isAuthed: this.props.loggedIn,
      dropdownOpen: false
    }

    this.toggle = this.toggle.bind(this)
  }

  toggle () {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }))
  }

  render () {
    return (
      <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
        <Link className='navbar-brand' to='/'>Food Delivery</Link>
        <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon' />
        </button>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav mr-auto'>
            {this.state.loggedIn && <li><Link className='nav-link' to='/orders/my'>My Orders</Link></li>}
          </ul>
          <ul className='nav navbar-nav navbar-right'>
            {
              this.props.isAdmin &&
              <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle nav caret>Admin</DropdownToggle>
                <DropdownMenu>
                  <DropdownItem><Link className='dropdown-item' to='/admin/users'>Users</Link></DropdownItem>
                </DropdownMenu>
              </Dropdown>
            }
            {!this.props.loggedIn && <li><Link className='nav-link' to='/users/register'>Register</Link></li>}
            {!this.props.loggedIn && <li><Link className='nav-link' to='/users/login'>Login</Link></li>}
            {this.props.loggedIn && <li className='nav-link'>Hello {this.props.username}!</li>}
            {this.props.loggedIn && <li><a className='nav-link' href='javascript:void(0)' onClick={this.props.onLogout}>Logout</a></li>}
          </ul>
        </div>
      </nav>
    )
  }
}
