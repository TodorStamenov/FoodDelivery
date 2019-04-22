import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import order from '../../api/order'
import TableHead from '../Common/TableHead'
import protectedRoute from '../../utils/protectedRoute'

const tableHeadNames = ['User', 'Total Price', 'Status', 'Products', 'Time Stamp', 'Actions']

class ModeratorOrdersPageBase extends Component {
  constructor (props) {
    super(props)

    this._isMounted = false
    this.state = {
      isQueue: true,
      isHistory: false,
      queueButtonClass: 'btn-secondary',
      historyButtonClass: 'btn-outline-secondary',
      orders: []
    }

    this.queue = this.queue.bind(this)
    this.history = this.history.bind(this)
    this.loadMoreItems = this.loadItems.bind(this)
  }

  componentDidMount () {
    this._isMounted = true
    this.loadItems()

    window.addEventListener('scroll', () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        this.loadItems()
      }
    })
  }

  componentWillUnmount () {
    this._isMounted = false
  }

  loadItems () {
    if (this._isMounted) {
      if (this.state.isQueue) {
        this.queue()
      } else if (this.state.isHistory) {
        this.history()
      }
    }
  }

  history (isClick) {
    let ordersLength = this.state.orders.length

    if ((isClick &&
      ordersLength >= 10 &&
      this.state.isHistory) ||
      !this._isMounted) {
      return
    }

    this.setState({
      queueButtonClass: 'btn-outline-secondary',
      historyButtonClass: 'btn-secondary'
    })

    if (this.state.isQueue) {
      this.setState({
        isQueue: false,
        isHistory: true,
        orders: []
      })

      ordersLength = 0
    }

    this._isMounted = false
    order.moderatorHistory(ordersLength).then(res => {
      this.setState(prevState => ({
        orders: [...prevState.orders, ...res]
      }))

      this._isMounted = true
    })
  }

  queue (isClick) {
    let ordersLength = this.state.orders.length

    if ((isClick &&
      ordersLength >= 10 &&
      this.state.isQueue) ||
      !this._isMounted) {
      return
    }

    this.setState({
      queueButtonClass: 'btn-secondary',
      historyButtonClass: 'btn-outline-secondary'
    })

    if (this.state.isHistory) {
      this.setState({
        isQueue: true,
        isHistory: false,
        orders: []
      })

      ordersLength = 0
    }

    this._isMounted = false
    order.moderatorQueue(ordersLength).then(res => {
      this.setState(prevState => ({
        orders: [...prevState.orders, ...res]
      }))

      this._isMounted = true
    })
  }

  render () {
    return (
      <div>
        <div className='row mb-2'>
          <div className='col-md-12'>
            <h2>
              Orders -
              <button
                onClick={() => this.queue(true)}
                className={'btn btn-md ml-2 ' + this.state.queueButtonClass}>
                Orders Queue
              </button>
              <button
                onClick={() => this.history(true)}
                className={'btn btn-md ml-2 ' + this.state.historyButtonClass}>
                Orders History
              </button>
            </h2>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-12'>
            <table className='table table-hover'>
              {<TableHead heads={tableHeadNames} />}
              <tbody>
                {
                  this.state.orders.map(o =>
                    <tr key={o.Id}>
                      <td>{o.User}</td>
                      <td>${o.Price.toFixed(2)}</td>
                      <td>{o.Status}</td>
                      <td>{o.ProductsCount}</td>
                      <td>{o.TimeStamp}</td>
                      <td>
                        <Link to={'/moderator/orders/details/' + o.Id} className='btn btn-secondary btn-sm'>
                          Details
                        </Link>
                      </td>
                    </tr>
                  )
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

const ModeratorOrdersPage = protectedRoute(ModeratorOrdersPageBase, 'Moderator')

export default ModeratorOrdersPage
