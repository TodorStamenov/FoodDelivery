import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import order from '../../api/order'
import TableHead from '../common/TableHead'
import protectedRoute from '../../utils/protectedRoute'

class OrdersPageBase extends Component {
  constructor (props) {
    super(props)

    this.state = {
      orders: []
    }

    this.queue = this.queue.bind(this)
    this.history = this.history.bind(this)
  }

  componentDidMount () {
    this.queue()
  }

  history () {
    order.history().then(res => {
      this.setState({
        orders: res
      })
    })
  }

  queue () {
    order.queue().then(res => {
      this.setState({
        orders: res
      })
    })
  }

  render () {
    return (
      <div>
        <div className='row'>
          <div className='col-md-6'>
            <h2>
              Orders -
              <button onClick={this.history} className='btn btn-secondary btn-md ml-3'>Orders History</button>
              <button onClick={this.queue} className='btn btn-secondary btn-md ml-3'>Orders Queue</button>
            </h2>
          </div>
        </div>
        <br />
        <div className='row'>
          <table className='table table-hover table-striped'>
            {<TableHead heads={['User', 'Executor', 'Price', 'Status', 'Products', 'Time Stamp', 'Actions']} />}
            <tbody>
              {this.state.orders.map(o =>
                <tr key={o.Id}>
                  <td>{o.User}</td>
                  <td>{o.Executor}</td>
                  <td>${o.Price.toFixed(2)}</td>
                  <td>{o.Status}</td>
                  <td>{o.ProductsCount}</td>
                  <td>{o.TimeStamp}</td>
                  <td><Link className='btn btn-secondary btn-sm' to={'/moderator/orders/' + o.Id}>Details</Link></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

const OrdersPage = protectedRoute(OrdersPageBase, 'Moderator')

export default OrdersPage
