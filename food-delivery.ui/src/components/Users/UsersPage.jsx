import React, { Component } from 'react'
import protectedRoute from '../../utils/protectedRoute'
import admin from '../../api/admin'
import TableHead from '../Common/TableHead'

const Admin = 'Admin'
const Moderator = 'Moderator'
const Employee = 'Employee'

class UsersPageBase extends Component {
  constructor (props) {
    super(props)

    this._isMounted = false
    this.state = {
      username: '',
      users: []
    }

    this.onChange = this.onChange.bind(this)
    this.getUsers = this.getUsers.bind(this)
    this.lock = this.lock.bind(this)
    this.unlock = this.unlock.bind(this)
    this.addRole = this.addRole.bind(this)
    this.removeRole = this.removeRole.bind(this)
  }

  componentDidMount () {
    this._isMounted = true
    this.getUsers()
  }

  componentWillUnmount () {
    this._isMounted = false
  }

  onChange (e) {
    this.setState({ [e.target.name]: e.target.value })
    this.getUsers(e.target.value)
  }

  getUsers (username) {
    admin.all(username).then(users => {
      if (this._isMounted) {
        this.setState({
          users
        })
      }
    })
  }

  lock (username) {
    admin.lock(username).then(res => {
      this.getUsers(this.state.username)
    })
  }

  unlock (username) {
    admin.unlock(username).then(res => {
      this.getUsers(this.state.username)
    })
  }

  addRole (username, roleName) {
    admin.addRole(username, roleName).then(res => {
      this.getUsers(this.state.username)
    })
  }

  removeRole (username, roleName) {
    admin.removeRole(username, roleName).then(res => {
      this.getUsers(this.state.username)
    })
  }

  render () {
    return (
      <div>
        <div className='row'>
          <div className='col-md-6'>
            <h2>Search Users</h2>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-4'>
            <form className='form'>
              <input name='username' value={this.state.username} onChange={this.onChange} type='text' className='form-control' placeholder='Search...' />
            </form>
          </div>
        </div>
        <br />
        <div className='row'>
          <table className='table table-hover'>
            {<TableHead heads={['Username', 'Is Locked', Admin, Moderator, Employee]} />}
            <tbody>
              {this.state.users.map(u =>
                <tr key={u.Id}>
                  <td>{u.Username}</td>
                  <td>
                    {u.IsLocked
                      ? <button className='btn btn-outline-dark btn-sm' onClick={() => this.unlock(u.Username)}>Unlock</button>
                      : <button className='btn btn-secondary btn-sm' onClick={() => this.lock(u.Username)}>Lock</button>
                    }
                  </td>
                  <td>
                    {u.Roles.includes(Admin)
                      ? <button className='btn btn-outline-dark btn-sm' onClick={() => this.removeRole(u.Username, Admin)}>Remove Role</button>
                      : <button className='btn btn-secondary btn-sm' onClick={() => this.addRole(u.Username, Admin)}>Add Role</button>
                    }
                  </td>
                  <td>
                    {u.Roles.includes(Moderator)
                      ? <button className='btn btn-outline-dark btn-sm' onClick={() => this.removeRole(u.Username, Moderator)}>Remove Role</button>
                      : <button className='btn btn-secondary btn-sm' onClick={() => this.addRole(u.Username, Moderator)}>Add Role</button>
                    }
                  </td>
                  <td>
                    {u.Roles.includes(Employee)
                      ? <button className='btn btn-outline-dark btn-sm' onClick={() => this.removeRole(u.Username, Employee)}>Remove Role</button>
                      : <button className='btn btn-secondary btn-sm' onClick={() => this.addRole(u.Username, Employee)}>Add Role</button>
                    }
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

const UsersPage = protectedRoute(UsersPageBase, 'Admin')

export default UsersPage
