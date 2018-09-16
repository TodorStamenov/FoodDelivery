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
    console.log('test')
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
        <button onClick={this.clearOrder} className='btn btn-outline-secondary'>Clear Order</button>
        <button onClick={this.submitOrder} className='btn btn-outline-secondary ml-2'>Submit Order</button>
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
                    {p.Toppings.map(t =>
                      <div key={t.Id} className='form-check'>
                        <label className='form-check-label'>
                          <input className='form-check-input' type='checkbox' value={t.Id} />{t.Name}
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

  renderTable () {
    if (this.state.orders.length === 0) {
      return <h4>You do not have any orders in progress</h4>
    }

    return (
      <div className='row'>
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
