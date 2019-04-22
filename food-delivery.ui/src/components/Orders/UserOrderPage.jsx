import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import order from '../../api/order'
import TableHead from '../Common/TableHead'
import ProductOrderCard from '../Common/ProductOrderCard'
import protectedRoute from '../../utils/protectedRoute'
import actions from '../../utils/actions'
import './UserOrderPage.css'

const tableHeadNames = ['Status', 'Products', 'Price', 'Time Stamp', 'Actions']
const hiddenClassName = 'uop-product-hidden'

class UserOrderPageBase extends Component {
  constructor (props) {
    super(props)

    this._isMounted = false
    this.state = {
      address: '',
      products: [],
      orders: []
    }

    this.removeProduct = this.removeProduct.bind(this)
    this.clearOrder = this.clearOrder.bind(this)
    this.submitOrder = this.submitOrder.bind(this)
    this.orderQueue = this.orderQueue.bind(this)
    this.pendingOrder = this.pendingOrder.bind(this)
    this.renderOrderForm = this.renderOrderForm.bind(this)
    this.renderProductCards = this.renderProductCards.bind(this)
    this.renderOrdersInProgressTable = this.renderOrdersInProgressTable.bind(this)
    this.handleToppingCheck = this.handleToppingCheck.bind(this)
    this.onChange = this.onChange.bind(this)
    this.toggleDetails = this.toggleDetails.bind(this)
  }

  onChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  componentDidMount () {
    this._isMounted = true
    this.pendingOrder()
    this.orderQueue()
  }

  componentWillUnmount () {
    this._isMounted = false
  }

  toggleDetails (id) {
    let orders = this.state.orders

    for (const order of orders) {
      if (order.Id === id) {
        for (const product of order.Products) {
          product.toggleClass = product.toggleClass ? '' : hiddenClassName
        }
      } else {
        for (const product of order.Products) {
          product.toggleClass = hiddenClassName
        }
      }
    }

    this.setState({
      orders
    })
  }

  submitOrder () {
    if (!this.state.address) {
      this.props.showError('Please fill your address!')
      return
    }

    let products = this.state
      .products
      .map(p => {
        return {
          id: p.Id,
          toppingIds: p.Toppings.filter(t => t.checked).map(t => t.Id)
        }
      })

    order.submitOrder(this.state.address, products).then(res => {
      this.props.showSuccess(res)
      this.orderQueue()
      this.pendingOrder()
    })
  }

  clearOrder () {
    order.clearProducts().then(res => {
      this.props.showSuccess(res)
      this.pendingOrder()
    })
  }

  removeProduct (id) {
    order.removeProduct(id).then(res => {
      this.props.showSuccess(res)
      this.pendingOrder()
    })
  }

  pendingOrder () {
    order.userPending().then(res => {
      if (this._isMounted) {
        this.setState({
          products: res
        })
      }
    })
  }

  orderQueue () {
    order.userQueue().then(res => {
      if (this._isMounted) {
        for (const order of res) {
          for (const product of order.Products) {
            product.toggleClass = hiddenClassName
          }
        }

        this.setState({
          orders: res
        })
      }
    })
  }

  renderOrderForm () {
    if (this.state.products.length === 0) {
      return <h4>You do not have any pending products</h4>
    }

    return (
      <div className='row align-items-center'>
        <div className='col-md-1'>
          <label className='mb-0' htmlFor='address'>Address:</label>
        </div>
        <div className='col-md-3'>
          <input
            className='form-control'
            type='text'
            id='address'
            name='address'
            value={this.state.address}
            onChange={this.onChange} />
        </div>
        <div className='col-md-8'>
          <button onClick={() => this.clearOrder(false)} className='btn btn-outline-secondary'>Clear Order</button>
          <button onClick={this.submitOrder} className='btn btn-outline-secondary ml-2'>Submit Order</button>
        </div>
      </div>
    )
  }

  renderProductCards () {
    let result = []

    for (let i = 0; i < this.state.products.length; i += 4) {
      result.push(
        <Fragment key={i}>
          <hr />
          <div className='row'>
            {
              this.state.products
                .slice(i, i + 4)
                .map((p, j) =>
                  <ProductOrderCard
                    i={i}
                    j={j}
                    key={p.Id + j}
                    product={p}
                    handleToppingCheck={this.handleToppingCheck}
                    removeProduct={this.removeProduct} />
                )
            }
          </div>
        </Fragment>
      )
    }

    return result
  }

  handleToppingCheck (e, i, j) {
    let products = this.state.products
    products[i].Toppings[j].checked = e.target.checked

    if (this._isMounted) {
      this.setState({
        products
      })
    }
  }

  renderOrdersInProgressTable () {
    if (this.state.orders.length === 0) {
      return <h4>You do not have any orders in progress</h4>
    }

    return (
      <div className='row'>
        <div className='col-md-12'>
          <table className='table table-hover'>
            {<TableHead heads={tableHeadNames} />}
            <tbody>
              {
                this.state.orders.map(o =>
                  <Fragment key={o.Id}>
                    <tr>
                      <td>{o.Status}</td>
                      <td>{o.ProductsCount}</td>
                      <td>${o.Price.toFixed(2)}</td>
                      <td>{o.TimeStamp}</td>
                      <td>
                        <button
                          onClick={() => this.toggleDetails(o.Id)}
                          className='btn btn-secondary btn-sm'>
                          Details
                        </button>
                      </td>
                    </tr>
                    {
                      o.Products.map((p, i) =>
                        <tr key={i} className={p.toggleClass}>
                          <td colSpan={2}>{p.Name}</td>
                          <td>${p.Price.toFixed(2)}</td>
                          <td>{p.Mass}g</td>
                          <td />
                        </tr>
                      )
                    }
                  </Fragment>
                )
              }
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  render () {
    return (
      <div>
        {this.renderOrderForm()}
        {this.renderProductCards()}
        <hr />
        {this.renderOrdersInProgressTable()}
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

const UserOrderPage = protectedRoute(UserOrderPageBase, 'authed')

export default connect(mapState, mapDispatch)(UserOrderPage)
