import React, { Component } from 'react'
import { connect } from 'react-redux'
import BoundForm from '../Common/BoundForm'
import auth from '../../api/auth'
import actions from '../../utils/actions'

class LoginForm extends Component {
  constructor (props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit (data) {
    auth.login(data.email, data.password)
      .then(res => {
        if (res.error) {
          this.props.showError(res.error_description)
          return
        }

        if (res.ModelState) {
          this.props.showError([...new Set(Object.values(res.ModelState).join(',').split(','))].join('\n'))
          return
        }

        this.props.saveUserData(res)
        this.props.showSuccess('User logged in successfully!')
        this.props.history.push('/')
      })
  }

  render () {
    return (
      <div className='form-group col-md-4 offset-md-2'>
        <BoundForm onSubmit={this.onSubmit}>
          <label htmlFor='email'>Email Address</label>
          <input type='text' name='email' className='form-control' id='email' placeholder='example@email.com' />
          <label htmlFor='password'>Password</label>
          <input type='password' name='password' className='form-control' id='password' placeholder='Password' />
          <br />
          <input className='btn btn-secondary' type='submit' value='Login' />
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

export default connect(mapState, mapDispatch)(LoginForm)
