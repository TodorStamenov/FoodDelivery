import React, { Component } from 'react'
import { connect } from 'react-redux'
import protectedRoute from '../../utils/protectedRoute'
import product from '../../api/product'
import category from '../../api/category'
import topping from '../../api/topping'
import actions from '../../utils/actions'

class EditProductFormBase extends Component {
  constructor (props) {
    super(props)

    this._isMounted = false
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
    this.onSelect = this.onSelect.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount () {
    this._isMounted = true

    product.get(this.props.match.params.id).then(res => {
      if (this._isMounted) {
        this.setState({
          name: res.Name,
          price: res.Price,
          mass: res.Mass,
          categoryId: res.CategoryId,
          toppingIds: res.ToppingIds
        })
      }
    })

    category.getAll().then(res => {
      if (this._isMounted) {
        this.setState({
          categories: res
        })
      }
    })

    topping.all().then(res => {
      if (this._isMounted) {
        this.setState({
          toppings: res
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
    product.edit(
      this.props.match.params.id,
      this.state.name,
      this.state.price,
      this.state.mass,
      this.state.categoryId,
      this.state.toppingIds)
        .then(res => {
          if (res.ModelState) {
            this.props.showError([...new Set(Object.values(res.ModelState).join(',').split(','))].join('\n'))
            return
          }

          this.props.showSuccess(res)
          this.props.history.push('/moderator/products')
        })
  }

  onSelect (e) {
    this.setState({
      [e.target.name]: [...e.target.options].filter(o => o.selected).map(o => o.value)
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
              {this.state.categories.map(c =>
                <option key={c.Id} selected={c.Id === this.state.categoryId ? 'selected' : ''} value={c.Id}>
                  {c.Name}
                </option>)
              }
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
              {this.state.toppings.map(t =>
                <option
                  key={t.Id}
                  selected={this.state.toppingIds.includes(t.Id) ? 'selected' : ''}
                  value={t.Id}>
                  {t.Name}
                </option>)
              }
            </select>
          </div>
          <input className='btn btn-dark' type='submit' value='Edit Product' />
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

const EditProductForm = protectedRoute(EditProductFormBase, 'Moderator')

export default connect(mapState, mapDispatch)(EditProductForm)
