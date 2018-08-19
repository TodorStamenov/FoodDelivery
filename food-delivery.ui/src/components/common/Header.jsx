import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

export default class Header extends Component {
  constructor (props) {
    super(props)

    this.state = {
      adminDropdownOpen: false,
      moderatorDropdownOpen: false
    }

    this.toggleAdmin = this.toggleAdmin.bind(this)
    this.toggleModerator = this.toggleModerator.bind(this)
  }

  componentDidMount () {
    this.setState({
      isAuthed: sessionStorage.getItem('username') !== null,
      username: sessionStorage.getItem('username'),
      isAdmin: sessionStorage.getItem('roles') !== null && sessionStorage.getItem('roles').includes('Admin'),
      isModerator: sessionStorage.getItem('roles') !== null && sessionStorage.getItem('roles').includes('Moderator'),
      adminDropdownOpen: false,
      moderatorDropdownOpen: false
    })
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

  render () {
    return (
      <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
        <Link className='navbar-brand' to='/'>Food Delivery</Link>
        <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon' />
        </button>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav mr-auto'>
            {this.props.isAuthed && <li><Link className='nav-link' to='/orders/my'>My Orders</Link></li>}
            {this.props.isAuthed && <li><Link className='nav-link' to='/feedbacks/create'>Add Feedback</Link></li>}
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
                  <DropdownItem><Link className='dropdown-item' to='/moderator/ingredients'>Ingredients</Link></DropdownItem>
                  <DropdownItem><Link className='dropdown-item' to='/moderator/feedbacks'>Feedbacks</Link></DropdownItem>
                </DropdownMenu>
              </Dropdown>
            }
            {!this.props.isAuthed && <li><Link className='nav-link' to='/account/register'>Register</Link></li>}
            {!this.props.isAuthed && <li><Link className='nav-link' to='/account/login'>Login</Link></li>}
            {this.props.isAuthed && <li><Link className='nav-link' to='/account/user'>Hello {this.props.username}!</Link></li>}
            {this.props.isAuthed && <li><a className='nav-link' href='javascript:void(0)' onClick={this.props.onLogout}>Logout</a></li>}
          </ul>
        </div>
      </nav>
    )
  }
}
