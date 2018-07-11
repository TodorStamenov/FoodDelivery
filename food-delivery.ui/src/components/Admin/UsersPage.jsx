import React, { Component } from 'react'
import protectedRoute from '../../utils/protectedRoute'
import { Link } from 'react-router-dom'
import admin from '../../api/admin'

class UsersPageBase extends Component {
  constructor (props) {
    super(props)

    this.state = {
      users: []
    }
  }

  componentDidMount () {
    admin.users().then(users => {
      this.setState({
        users
      })
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
              <input type='text' className='form-control' placeholder='Search...' />
            </form>
          </div>
          <div className='col-md-8'>
            <Link to='/admin/create' className='btn btn-secondary float-right'>Create User</Link>
          </div>
        </div>
        <br />
        <div className='row'>
          <table className='table table-hover table-striped'>
            <thead>
              <tr>
                <th>Username</th>
                <th>Lock</th>
                <th>Admin</th>
                <th>Moderator</th>
                <th>Employee</th>
              </tr>
            </thead>
            <tbody>
              {this.state.users.map(u =>
                <tr key={u.Id}>
                  <td>{u.Username}</td>
                  <td>
                    {u.IsLocked
                      ? <button className='btn btn-dark btn-sm' onClick={() => console.log('unlock ' + u.Id)}>Unlock</button>
                      : <button className='btn btn-dark btn-sm' onClick={() => console.log('lock ' + u.Id)}>Lock</button>
                    }
                  </td>
                  <td>
                    {u.Roles.includes('Admin')
                      ? <button className='btn btn-outline-dark btn-sm' onClick={() => console.log('remove role')}>Remove Role</button>
                      : <button className='btn btn-secondary btn-sm' onClick={() => console.log('add role')}>Add Role</button>
                    }
                  </td>
                  <td>
                    {u.Roles.includes('Moderator')
                      ? <button className='btn btn-outline-dark btn-sm' onClick={() => console.log('remove role')}>Remove Role</button>
                      : <button className='btn btn-secondary btn-sm' onClick={() => console.log('add role')}>Add Role</button>
                    }
                  </td>
                  <td>
                    {u.Roles.includes('Employee')
                      ? <button className='btn btn-outline-dark btn-sm' onClick={() => console.log('remove role')}>Remove Role</button>
                      : <button className='btn btn-secondary btn-sm' onClick={() => console.log('add role')}>Add Role</button>
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
