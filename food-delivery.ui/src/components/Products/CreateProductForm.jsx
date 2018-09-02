import React, { Component } from 'react'
import protectedRoute from '../../utils/protectedRoute'
import product from '../../api/product'
import category from '../../api/category'

class CreateProductFormBase extends Component {
  constructor (props) {
    super(props)

    this.state = {
      name: '',
      price: '',
      mass: '',
      categoryId: '',
      categories: []
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount () {
    category.getAll().then(res => {
      this.setState({
        categories: res
      })
    })
  }

  onChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit (e) {
    e.preventDefault()
    product.add(this.state.name, this.state.price, this.state.mass, this.state.categoryId)
      .then(res => {
        if (res.ModelState) {
          console.log([...new Set(Object.values(res.ModelState).join(',').split(','))].join('\n'))
          return
        }

        console.log(res)
        this.props.history.push('/moderator/products')
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
              placeholder='Product name' />
          </div>
          <div className='form-group'>
            <label htmlFor='price'>Price</label>
            <input
              onChange={this.onChange}
              value={this.state.price}
              type='number'
              name='price'
              className='form-control'
              id='price'
              placeholder='Product price' />
          </div>
          <div className='form-group'>
            <label htmlFor='mass'>Mass</label>
            <input
              onChange={this.onChange}
              value={this.state.mass}
              type='number'
              name='mass'
              className='form-control'
              id='mass'
              placeholder='Product mass' />
          </div>
          <div className='form-group'>
            <label htmlFor='mass'>Category</label>
            <select
              onChange={(e) => this.onChange(e)}
              value={this.state.categoryId}
              type='text'
              name='categoryId'
              className='form-control'
              id='categoryId'
              placeholder='Product mass'>
              {this.state.categories.map(c => <option key={c.Id} value={c.Id}>{c.Name}</option>)}
            </select>
          </div>
          <input className='btn btn-dark' type='submit' value='Add Product' />
        </form>
      </div>
    )
  }
}

const CreateProductForm = protectedRoute(CreateProductFormBase, 'Moderator')

export default CreateProductForm
