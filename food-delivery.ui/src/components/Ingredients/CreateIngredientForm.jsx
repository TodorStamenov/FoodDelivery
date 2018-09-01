import React, { Component } from 'react'
import protectedRoute from '../../utils/protectedRoute'

import ingredient from '../../api/ingredient'

class CreateIngredientFormBase extends Component {
  constructor (props) {
    super(props)

    this.state = {
      name: '',
      ingredientType: '',
      ingredients: []
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange (e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit (e) {
    e.preventDefault()
    ingredient.add(this.state.name, this.state.ingredientType)
      .then(res => {
        if (res.ModelState) {
          console.log([...new Set(Object.values(res.ModelState).join(',').split(','))].join('\n'))
          return
        }

        this.props.history.push('/moderator/ingredients')
      })
  }

  componentDidMount () {
    ingredient.types().then(res => {
      this.setState({
        ingredients: res
      })
    })
  }

  render () {
    return (
      <div className='form-group col-md-4 offset-md-2'>
        <form onSubmit={this.onSubmit}>
          <div className='form-group'>
            <label htmlFor='name'>Name</label>
            <input onChange={this.onChange} value={this.state.name} type='text' name='name' className='form-control' id='name' placeholder='Ingredient name' />
          </div>
          <div className='form-group'>
            <label htmlFor='type'>Ingredient Type</label>
            <select onChange={this.onChange} value={this.state.ingredientType} name='ingredientType' className='form-control' id='type'>
              <option value='none'>--Select Ingredient--</option>
              {this.state.ingredients.map((i, index) => <option key={index} value={i}>{i}</option>)}
            </select>
          </div>
          <input className='btn btn-dark' type='submit' value='Add Ingredient' />
        </form>
      </div>
    )
  }
}

const CreateIngredientForm = protectedRoute(CreateIngredientFormBase, 'Moderator')

export default CreateIngredientForm
