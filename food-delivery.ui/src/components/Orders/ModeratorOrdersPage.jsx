import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import order from '../../api/order'
import TableHead from '../Common/TableHead'
import protectedRoute from '../../utils/protectedRoute'

const tableHeadNames = ['User', 'Total Price', 'Status', 'Products', 'Time Stamp', 'Actions']

class ModeratorOrdersPageBase extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isQueue: true,
      isHistory: false,
      queueButtonClass: 'btn-secondary',
      historyButtonClass: 'btn-outline-dark',
      orders: []
    }

    this.queue = this.queue.bind(this)
    this.history = this.history.bind(this)
    this.loadMoreItems = this.loadItems.bind(this)
  }

  componentDidMount () {
    this.loadItems()

    window.addEventListener('scroll', () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        this.loadItems()
      }
    })
  }

  loadItems () {
    if (this.state.isQueue) {
      this.queue()
    } else if (this.state.isHistory) {
      this.history()
    }
  }

  history (isClick) {
    this.setState({
      queueButtonClass: 'btn-outline-dark',
      historyButtonClass: 'btn-secondary'
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

    order.moderatorHistory(ordersLength).then(res => {
      this.setState(prevState => ({
        orders: [...prevState.orders, ...res]
      }))
    })
  }

  queue (isClick) {
    this.setState({
      queueButtonClass: 'btn-secondary',
      historyButtonClass: 'btn-outline-dark'
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

    order.moderatorQueue(ordersLength).then(res => {
      this.setState(prevState => ({
        orders: [...prevState.orders, ...res]
      }))
    })
  }

  render () {
    return (
      <div>
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
          <table className='table table-hover'>
            {<TableHead heads={tableHeadNames} />}
            <tbody>
              {this.state.orders.map(o =>
                <tr key={o.Id}>
                  <td>{o.User}</td>
                  <td>${o.Price.toFixed(2)}</td>
                  <td>{o.Status}</td>
                  <td>{o.ProductsCount}</td>
                  <td>{o.TimeStamp}</td>
                  <td><Link to={'/moderator/orders/details/' + o.Id} className='btn btn-secondary btn-sm'>Details</Link></td>
                </tr>)
              }
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

const ModeratorOrdersPage = protectedRoute(ModeratorOrdersPageBase, 'Moderator')

export default ModeratorOrdersPage
