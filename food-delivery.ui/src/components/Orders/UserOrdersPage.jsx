import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import order from '../../api/order'
import TableHead from '../Common/TableHead'
import protectedRoute from '../../utils/protectedRoute'

const tableHeadNames = ['Status', 'Price', 'Products', 'Time Stamp', 'Actions']

class UserOrdersPageBase extends Component {
  constructor (props) {
    super(props)

    this._isMounted = false
    this.state = {
      isQueue: false,
      isHistory: true,
      queueButtonClass: 'btn-outline-dark',
      historyButtonClass: 'btn-secondary',
      orders: []
    }

    this.loadMoreItems = this.loadMoreItems.bind(this)
  }

  componentDidMount () {
    this._isMounted = true
    this.loadMoreItems()

    window.addEventListener('scroll', () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        this.loadMoreItems()
      }
    })
  }

  componentWillUnmount () {
    this._isMounted = false
  }

  loadMoreItems () {
    order.userOrders(this.state.orders.length).then(res => {
      if (this._isMounted) {
        this.setState(prevState => ({
          orders: [...prevState.orders, ...res]
        }))
      }
    })
  }

  render () {
    return (
      <div>
        <div className='row'>
          <div className='col-md-6'>
            <h2>Your previous orders</h2>
          </div>
        </div>
        <br />
        <div className='row'>
          <table className='table table-hover'>
            {<TableHead heads={tableHeadNames} />}
            <tbody>
              {this.state.orders.map(o =>
                <React.Fragment key={o.Id}>
                  <tr>
                    <td>{o.Status}</td>
                    <td>${o.Price.toFixed(2)}</td>
                    <td>{o.ProductsCount}</td>
                    <td>{o.TimeStamp}</td>
                    <td>
                      <button onClick={() => this.props.toggleDetails(o.Id, 'order-details')} className='btn btn-secondary btn-sm'>Details</button>
                    </td>
                  </tr>
                  {o.Products.map((p, i) =>
                    <tr key={i} className='order-details' style={{display: 'none'}} data-id={o.Id}>
                      <td colSpan={2}>{p.Name}</td>
                      <td>${p.Price.toFixed(2)}</td>
                      <td>{p.Mass}g</td>
                      <td>
                        <Link to={'/user/feedbacks/create/' + p.Id} className='btn btn-sm btn-outline-dark'>Feedback</Link>
                      </td>
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
}

const UserOrdersPage = protectedRoute(UserOrdersPageBase, 'authed')

export default UserOrdersPage
