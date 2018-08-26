import React, { Component } from 'react'
import order from '../../api/order'
import TableHead from '../common/TableHead'
import protectedRoute from '../../utils/protectedRoute'

const tableHeadNames = ['User', 'Executor', 'Price', 'Status', 'Products', 'Time Stamp', 'Actions']

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
    this.loadMoreItems = this.loadMoreItems.bind(this)
    this.renderTable = this.renderTable.bind(this)
    this.toggleDetails = this.toggleDetails.bind(this)
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

    order.history(ordersLength).then(res => {
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

    order.queue(ordersLength).then(res => {
      this.setState(prevState => ({
        orders: [...prevState.orders, ...res]
      }))
    })
  }

  renderTable () {
    let table = []

    for (const order of this.state.orders) {
      table.push(
        <tr key={order.Id}>
          <td>{order.User}</td>
          <td>{order.Executor}</td>
          <td>${order.Price.toFixed(2)}</td>
          <td>{order.Status}</td>
          <td>{order.ProductsCount}</td>
          <td>{order.TimeStamp}</td>
          <td><button onClick={() => this.toggleDetails(order.Id)} className='btn btn-secondary btn-sm'>Details</button></td>
        </tr>
      )

      table.push(
        <tr className='order-details' style={{display: 'none'}} data-id={order.Id} key={order.Id + '1'}>
          <td colSpan={tableHeadNames.length}>
            <ul className='list-group'>
              {order.Products.map(p => <li key={p.Id} className='list-group-item'>{p.Name} - ${p.Price.toFixed(2)}</li>)}
            </ul>
          </td>
        </tr>
      )
    }

    return table
  }

  toggleDetails (id) {
    let elements = document.getElementsByClassName('order-details')

    for (const element of elements) {
      if (element.getAttribute('data-id') === id) {
        if (element.style.display === '') {
          element.style.display = 'none'
        } else {
          element.style.display = ''
        }
      } else {
        element.style.display = 'none'
      }
    }
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
              {this.renderTable()}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

const ModeratorOrdersPage = protectedRoute(ModeratorOrdersPageBase, 'Moderator')

export default ModeratorOrdersPage
