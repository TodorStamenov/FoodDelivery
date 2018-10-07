import React, { Component } from 'react'
import { connect } from 'react-redux'
import BoundForm from '../Common/BoundForm'
import auth from '../../api/auth'
import actions from '../../utils/actions'

class RegisterForm extends Component {
  constructor (props) {
    super(props)

    this.onRegister = this.onRegister.bind(this)
  }

  onRegister (data) {
    auth.register(data.email, data.password, data.confirmPassword)
      .then(res => {
        if (res.ModelState) {
          this.props.showError([...new Set(Object.values(res.ModelState).join(',').split(','))].join('\n'))
          return
        }

        this.props.saveUserData(res)
        this.props.showSuccess('User registered successfully!')
        this.props.history.push('/')
      })
  }

  render () {
    return (
      <div className='form-group col-md-4 offset-md-2'>
        <BoundForm onSubmit={this.onRegister}>
          <label htmlFor='email'>Email Address</label>
          <input type='text' name='email' className='form-control' id='email' placeholder='example@email.com' />
          <label htmlFor='password'>Password</label>
          <input type='password' name='password' className='form-control' id='password' placeholder='Password' />
          <label htmlFor='confirmPassword'>Repeat Password</label>
          <input type='password' className='form-control' name='confirmPassword' id='confirmPassword' placeholder='Confirm Password' />
          <br />
          <input className='btn btn-secondary' type='submit' value='Register' />
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

export default connect(mapState, mapDispatch)(RegisterForm)
