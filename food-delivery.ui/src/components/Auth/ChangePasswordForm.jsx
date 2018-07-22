import React, { Component } from 'react'
import BoundForm from '../common/BoundForm'
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
          for (const key in res.ModelState) {
            console.log(res.ModelState[key])
          }

          return
        }

        this.props.history.push('/')
      })
  }

  render () {
    return (
      <div className='form-group col-md-3 offset-md-2'>
        <BoundForm onSubmit={this.onSubmit}>
          <label htmlFor='oldPassword'>Old Password</label>
          <input type='password' name='oldPassword' className='form-control' id='oldPassword' placeholder='Old Password' />
          <label htmlFor='newPassword'>New Password</label>
          <input type='password' name='newPassword' className='form-control' id='newPassword' placeholder='New Password' />
          <label htmlFor='confirmPassword'>Confirm Password</label>
          <input type='password' name='confirmPassword' className='form-control' id='confirmPassword' placeholder='Confirm Password' />
          <br />
          <input className='btn btn-dark' type='submit' value='Change Password' />
        </BoundForm>
      </div>
    )
  }
}