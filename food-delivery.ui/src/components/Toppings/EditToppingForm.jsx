import React, { Component } from 'react'
import protectedRoute from '../../utils/protectedRoute'
import topping from '../../api/topping'

class EditToppingFormBase extends Component {
  constructor (props) {
    super(props)

    this.state = {
      id: 0,
      name: ''
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit (e) {
    e.preventDefault()
    topping.edit(this.state.id, this.state.name)
      .then(res => {
        if (res.ModelState) {
          console.log([...new Set(Object.values(res.ModelState).join(',').split(','))].join('\n'))
          return
        }

        this.props.history.push('/moderator/toppings')
      })
  }

  componentDidMount () {
    topping.get(this.props.match.params.id)
      .then(res => {
        this.setState({
          id: res.Id,
          name: res.Name
        })
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

const EditToppingForm = protectedRoute(EditToppingFormBase, 'Moderator')

export default EditToppingForm
