import React, { Component } from 'react'
import { connect } from 'react-redux'
import protectedRoute from '../../utils/protectedRoute'
import topping from '../../api/topping'
import BoundForm from '../Common/BoundForm'
import actions from '../../utils/actions'

class CreateToppingFormBase extends Component {
  constructor (props) {
    super(props)

    this.state = {
      name: ''
    }

    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit (data) {
    topping.add(data.name)
      .then(res => {
        if (res.ModelState) {
          this.props.showError([...new Set(Object.values(res.ModelState).join(',').split(','))].join('\n'))
          return
        }

        this.props.showSuccess(res)
        this.props.history.push('/moderator/toppings')
      })
  }

  render () {
    return (
      <div className='form-group col-md-4 offset-md-2'>
        <BoundForm onSubmit={this.onSubmit}>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            name='name'
            className='form-control'
            id='name'
            placeholder='Topping name' />
          <br />
          <input className='btn btn-dark' type='submit' value='Add Topping' />
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

const CreateToppingForm = protectedRoute(CreateToppingFormBase, 'Moderator')

export default connect(mapState, mapDispatch)(CreateToppingForm)
