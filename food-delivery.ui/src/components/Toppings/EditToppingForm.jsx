import React, { Component } from 'react'
import { connect } from 'react-redux'
import protectedRoute from '../../utils/protectedRoute'
import topping from '../../api/topping'
import actions from '../../utils/actions'

class EditToppingFormBase extends Component {
  constructor (props) {
    super(props)

    this._isMounted = false
    this.state = {
      name: ''
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount () {
    this._isMounted = true
    topping.get(this.props.match.params.id).then(res => {
      if (this._isMounted) {
        this.setState({
          name: res.Name
        })
      }
    })
  }

  componentWillUnmount () {
    this._isMounted = false
  }

  onChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit (e) {
    e.preventDefault()
    topping.edit(this.props.match.params.id, this.state.name)
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
        <form onSubmit={this.onSubmit}>
          <div className='form-group'>
            <label htmlFor='name'>Name</label>
            <input
              onChange={this.onChange}
              value={this.state.name}
              type='text'
              name='name'
              className='form-control'
              id='name'
              placeholder='Topping name' />
          </div>
          <input className='btn btn-dark' type='submit' value='Edit Topping' />
        </form>
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

const EditToppingForm = protectedRoute(EditToppingFormBase, 'Moderator')

export default connect(mapState, mapDispatch)(EditToppingForm)
