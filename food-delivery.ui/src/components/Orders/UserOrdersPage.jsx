import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import order from '../../api/order'
import TableHead from '../Common/TableHead'
import protectedRoute from '../../utils/protectedRoute'
import './UserOrdersPage.css'

const tableHeadNames = ['Status', 'Products', 'Price', 'Time Stamp', 'Actions']
const hiddenClassName = 'uosp-product-hidden'

class UserOrdersPageBase extends Component {
  constructor (props) {
    super(props)

    this._isMounted = false
    this.state = {
      orders: []
    }

    this.loadMoreItems = this.loadMoreItems.bind(this)
    this.onScrollEvent = this.onScrollEvent.bind(this)
    this.toggleDetails = this.toggleDetails.bind(this)
  }

  componentDidMount () {
    this._isMounted = true
    this.loadMoreItems()

    window.addEventListener('scroll', this.onScrollEvent)
  }

  onScrollEvent () {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      this.loadMoreItems()
    }
  }

  componentWillUnmount () {
    this._isMounted = false
    window.removeEventListener('scroll', this.onScrollEvent, true)
  }

  loadMoreItems () {
    order.userHistory(this.state.orders.length).then(res => {
      if (this._isMounted) {
        for (const order of res) {
          for (const product of order.Products) {
            product.toggleClass = hiddenClassName
          }
        }

        this.setState(prevState => ({
          orders: [...prevState.orders, ...res]
        }))
      }
    })
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

  render () {
    if (this.state.orders.length === 0) {
      return <h4>You do not have any orders in your order history</h4>
    }

    return (
      <div>
        <div className='row'>
          <table className='table table-hover'>
            {<TableHead heads={tableHeadNames} />}
            <tbody>
              {this.state.orders.map(o =>
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
                  {o.Products.map((p, i) =>
                    <tr key={i} className={p.toggleClass}>
                      <td colSpan={2}>{p.Name}</td>
                      <td>${p.Price.toFixed(2)}</td>
                      <td>{p.Mass}g</td>
                      <td>
                        <Link to={'/user/feedbacks/create/' + p.Id} className='btn btn-sm btn-outline-dark'>
                          Feedback
                        </Link>
                      </td>
                    </tr>)
                  }
                </Fragment>)
              }
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

const UserOrdersPage = protectedRoute(UserOrdersPageBase, 'authed')

export default UserOrdersPage
