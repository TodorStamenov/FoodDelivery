import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import order from '../../api/order'
import TableHead from '../common/TableHead'
import protectedRoute from '../../utils/protectedRoute'

class OrdersPageBase extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isQueue: true,
      isHistory: false,
      queueButtonClass: 'btn-outline-dark',
      historyButtonClass: 'btn-secondary',
      orders: []
    }

    this.queue = this.queue.bind(this)
    this.history = this.history.bind(this)
    this.loadMoreItems = this.loadMoreItems.bind(this)
  }

  componentDidMount () {
    this.loadMoreItems()

    window.addEventListener('scroll', () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        this.loadMoreItems()
      }
    })
  }

  loadMoreItems () {
    if (this.state.isQueue) {
      this.queue()
    } else if (this.state.isHistory) {
      this.history()
    }
  }

  history (isClick) {
    this.setState({
      queueButtonClass: 'btn-secondary',
      historyButtonClass: 'btn-outline-dark'
    })

    let ordersLength = this.state.orders.length

    if (isClick &&
      ordersLength >= 10 &&
      this.state.isHistory) {
      return
    }

    if (this.state.isQueue) {
      this.setState({
        isQueue: false,
        isHistory: true,
        orders: []
      })

      ordersLength = 0
    }

    order.history(ordersLength).then(res => {
      this.setState(prevState => ({
        orders: [...prevState.orders, ...res]
      }))
    })
  }

  queue (isClick) {
    this.setState({
      queueButtonClass: 'btn-outline-dark',
      historyButtonClass: 'btn-secondary'
    })

    let ordersLength = this.state.orders.length

    if (isClick &&
      ordersLength >= 10 &&
      this.state.isQueue) {
      return
    }

    if (this.state.isHistory) {
      this.setState({
        isQueue: true,
        isHistory: false,
        orders: []
      })

      ordersLength = 0
    }

    order.queue(ordersLength).then(res => {
      this.setState(prevState => ({
        orders: [...prevState.orders, ...res]
      }))
    })
  }

  render () {
    return (
      <div ref='iScroll'>
        <div className='row'>
          <div className='col-md-6'>
            <h2>
              Orders -
              <button onClick={() => this.queue(true)} className={'btn btn-md ml-2 ' + this.state.queueButtonClass}>Orders Queue</button>
              <button onClick={() => this.history(true)} className={'btn btn-md ml-2 ' + this.state.historyButtonClass}>Orders History</button>
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
