import React, { Component } from 'react'
import { connect } from 'react-redux'
import BoundForm from '../Common/BoundForm'
import auth from '../../api/auth'
import actions from '../../utils/actions'

class ChangePasswordForm extends Component {
  constructor (props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit (data) {
    auth.changePassword(data.oldPassword, data.newPassword, data.confirmPassword)
      .then(res => {
        if (res.ModelState) {
          this.props.showError([...new Set(Object.values(res.ModelState).join(',').split(','))].join('\n'))
          return
        }

        this.props.showSuccess(res)
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

export default connect(mapState, mapDispatch)(ChangePasswordForm)
