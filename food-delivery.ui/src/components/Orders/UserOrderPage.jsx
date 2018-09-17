import React, { Component } from 'react'
import order from '../../api/order'
import TableHead from '../Common/TableHead'
import protectedRoute from '../../utils/protectedRoute'

const tableHeadNames = ['Status', 'Products', 'Price', 'Time Stamp', 'Actions']

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
    this.renderCards = this.renderCards.bind(this)
    this.renderTable = this.renderTable.bind(this)
    this.handleToppingCheck = this.handleToppingCheck.bind(this)
    this.onChange = this.onChange.bind(this)
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

  submitOrder () {
    let products = this.state
      .products
      .map(p => {
        return {
          id: p.Id,
          toppingIds: p.Toppings.filter(t => t.checked).map(t => t.Id)
        }
      })

    order.submitOrder(this.state.address, products).then(res => {
      console.log(res)
      this.orderQueue()
      this.pendingOrder()
    })
  }

  clearOrder () {
    order.clearProducts().then(res => {
      console.log(res)
      this.pendingOrder()
    })
  }

  removeProduct (id) {
    order.removeProduct(id).then(res => {
      console.log(res)
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
        this.setState({
          orders: res
        })
      }
    })
  }

  renderCards () {
    if (this.state.products.length === 0) {
      return <h4>You do not have any pending products</h4>
    }

    let result = []

    result.push(
      <div key={-1} className='row'>
        <div className='col-md-1' style={{ 'paddingTop': '5px' }}>
          <label htmlFor='address'>Address:</label>
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

    for (let i = 0; i < this.state.products.length; i += 4) {
      result.push(
        <React.Fragment key={i}>
          <hr />
          <div className='row'>
            {this.state.products.slice(i, i + 4).map((p, j) =>
              <div key={p.Id + j} className='col-md-3'>
                <div className='card' style={{ height: '100%' }} >
                  <div className='card-header text-center text-light bg-secondary'>
                    {p.Name} | ${p.Price.toFixed(2)} | {p.Mass}g
                  </div>
                  <div className='card-body' style={{ 'paddingTop': '15px' }}>
                    {p.Toppings.map((t, k) =>
                      <div key={t.Id} className='form-check'>
                        <label className='form-check-label'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            value={t.Id}
                            onChange={e => this.handleToppingCheck(e, i + j, k)} />
                          {t.Name}
                        </label>
                      </div>)
                    }
                  </div>
                  <div className='card-footer text-center bg-white'>
                    <button onClick={() => this.removeProduct(p.Id)} className='btn btn-outline-secondary btn-sm'>Remove</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </React.Fragment>
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

  renderTable () {
    if (this.state.orders.length === 0) {
      return <h4>You do not have any orders in progress</h4>
    }

    return (
      <div className='row'>
        <div className='col-md-12'>
          <table className='table table-hover'>
            {<TableHead heads={tableHeadNames} />}
            <tbody>
              {this.state.orders.map(o =>
                <React.Fragment key={o.Id}>
                  <tr>
                    <td>{o.Status}</td>
                    <td>{o.ProductsCount}</td>
                    <td>${o.Price.toFixed(2)}</td>
                    <td>{o.TimeStamp}</td>
                    <td>
                      <button onClick={() => this.props.toggleDetails(o.Id, 'order-details')} className='btn btn-secondary btn-sm'>Details</button>
                    </td>
                  </tr>
                  {o.Products.map((p, i) =>
                    <tr key={i} className='order-details' style={{ display: 'none' }} data-id={o.Id}>
                      <td colSpan={2}>{p.Name}</td>
                      <td>${p.Price.toFixed(2)}</td>
                      <td>{p.Mass}g</td>
                      <td />
                    </tr>)
                  }
                </React.Fragment>)
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
        {this.renderCards()}
        <hr />
        {this.renderTable()}
      </div>
    )
  }
}

const UserOrderPage = protectedRoute(UserOrderPageBase, 'authed')

export default UserOrderPage
