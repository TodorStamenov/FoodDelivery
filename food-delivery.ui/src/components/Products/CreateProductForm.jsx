import React, { Component } from 'react'
import protectedRoute from '../../utils/protectedRoute'
import product from '../../api/product'
import category from '../../api/category'
import topping from '../../api/topping'

class CreateProductFormBase extends Component {
  constructor (props) {
    super(props)

    this.state = {
      name: '',
      price: '',
      mass: '',
      categoryId: '',
      categories: [],
      toppingIds: [],
      toppings: []
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onSelect = this.onSelect.bind(this)
  }

  componentDidMount () {
    category.getAll().then(res => {
      this.setState({
        categories: res
      })
    })

    topping.all().then(res => {
      this.setState({
        toppings: res
      })
    })
  }

  onChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSelect (e) {
    this.setState({
      [e.target.name]: [...e.target.options].filter(o => o.selected).map(o => o.value)
    })
  }

  onSubmit (e) {
    e.preventDefault()
    product.add(
      this.state.name,
      this.state.price,
      this.state.mass,
      this.state.categoryId,
      this.state.toppingIds)
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
            <label htmlFor='categoryId'>Category</label>
            <select
              onChange={this.onChange}
              value={this.state.categoryId}
              name='categoryId'
              className='form-control'
              id='categoryId'>
              {this.state.categories.map(c => <option key={c.Id} value={c.Id}>{c.Name}</option>)}
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor='toppingIds'>Toppings</label>
            <select
              multiple
              onChange={this.onSelect}
              name='toppingIds'
              className='form-control'
              id='toppingIds'>
              {this.state.toppings.map(t => <option key={t.Id} value={t.Id}>{t.Name}</option>)}
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
