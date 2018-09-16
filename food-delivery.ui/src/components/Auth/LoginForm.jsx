import React, { Component } from 'react'
import BoundForm from '../Common/BoundForm'

export default class LoginForm extends Component {
  render () {
    return (
      <div className='form-group col-md-4 offset-md-2'>
        <BoundForm onSubmit={this.props.onSubmit}>
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
