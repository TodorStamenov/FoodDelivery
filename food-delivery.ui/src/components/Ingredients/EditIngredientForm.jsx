import React, { Component } from 'react'
import protectedRoute from '../../utils/protectedRoute'

import ingredient from '../../api/ingredient'

class EditIngredientFormBase extends Component {
  constructor (props) {
    super(props)

    this.state = {
      id: 0,
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
    ingredient.edit(this.state.id, this.state.name, this.state.ingredientType)
      .then(res => {
        if (res.ModelState) {
          console.log(Object.values(res.ModelState).join('\n'))
          return
        }

        this.props.history.push('/moderator/ingredients')
      })
  }

  componentDidMount () {
    ingredient.get(this.props.match.params.id)
      .then(res => {
        this.setState({
          id: res.Id,
          name: res.Name
        })
      })

    ingredient.types().then(res => {
      this.setState({
        ingredients: res
      })
    })
  }

  render () {
    return (
      <div className='form-group col-md-3 offset-md-2'>
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
          <input className='btn btn-dark' type='submit' value='Edit Ingredient' />
        </form>
      </div>
    )
  }
}

const EditIngredientForm = protectedRoute(EditIngredientFormBase, 'Moderator')

export default EditIngredientForm
