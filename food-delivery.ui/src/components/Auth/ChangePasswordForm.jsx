import React, { Component } from 'react'
import BoundForm from '../Common/BoundForm'
import auth from '../../api/auth'

export default class ChangePasswordForm extends Component {
  constructor (props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit (data) {
    auth.changePassword(data.oldPassword, data.newPassword, data.confirmPassword)
      .then(res => {
        if (res.ModelState) {
          console.log(Object.values(res.ModelState).join('\n'))
          return
        }

        this.props.history.push('/')
      })
  }

  render () {
    return (
      <div className='form-group col-md-4 offset-md-2'>
        <BoundForm onSubmit={this.onSubmit}>
          <label htmlFor='oldPassword'>Old Password</label>
          <input type='password' name='oldPassword' className='form-control' id='oldPassword' placeholder='Old Password' />
          <label htmlFor='newPassword'>New Password</label>
          <input type='password' name='newPassword' className='form-control' id='newPassword' placeholder='New Password' />
          <label htmlFor='confirmPassword'>Confirm Password</label>
          <input type='password' name='confirmPassword' className='form-control' id='confirmPassword' placeholder='Confirm Password' />
          <br />
          <input className='btn btn-secondary' type='submit' value='Change Password' />
        </BoundForm>
      </div>
    )
  }
}
