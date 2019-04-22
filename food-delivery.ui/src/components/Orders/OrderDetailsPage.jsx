import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import protectedRoute from '../../utils/protectedRoute'
import order from '../../api/order'
import TableHead from '../Common/TableHead'

class OrderDetailsPageBase extends Component {
  constructor (props) {
    super(props)

    this._isMounted = false
    this.state = {
      id: '',
      timeStamp: '',
      address: '',
      user: '',
      executor: '',
      price: '',
      productsCount: '',
      status: '',
      products: []
    }
  }

  componentDidMount () {
    this._isMounted = true

    order.details(this.props.match.params.id).then(res => {
      if (this._isMounted) {
        this.setState({
          id: res.Id,
          timeStamp: res.TimeStamp,
          address: res.Address,
          user: res.User,
          executor: res.Executor,
          price: res.Price,
          productsCount: res.ProductsCount,
          status: res.Status,
          products: res.Products
        })
      }
    })
  }

  componentWillUnmount () {
    this._isMounted = false
  }

  render () {
    return (
      <div>
        <div className='row mb-2'>
          <div className='offset-md-2 col-md-8'>
            <h2>
              Orders Details <Link className='btn btn-outline-secondary btn-ml-2' to='/moderator/orders'>Back</Link>
            </h2>
          </div>
        </div>
        <div className='row'>
          <div className='offset-md-2 col-md-8'>
            <table className='table table-hover'>
              <tbody>
                <tr>
                  <td>Id</td>
                  <td>{this.state.id}</td>
                </tr>
                <tr>
                  <td>Time Stamp</td>
                  <td>{this.state.timeStamp}</td>
                </tr>
                <tr>
                  <td>Address</td>
                  <td>{this.state.address}</td>
                </tr>
                <tr>
                  <td>User</td>
                  <td>{this.state.user}</td>
                </tr>
                <tr>
                  <td>Executor</td>
                  <td>{this.state.executor}</td>
                </tr>
                <tr>
                  <td>Total Price</td>
                  <td>${Number(this.state.price).toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Products Count</td>
                  <td>{this.state.productsCount}</td>
                </tr>
                <tr>
                  <td>Status</td>
                  <td>{this.state.status}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className='row'>
          <div className='offset-md-2 col-md-8'>
            <table className='table table-hover'>
              <TableHead heads={['Name', 'Price', 'Mass']} />
              <tbody>
                {this.state.products.map((p, i) =>
                  <React.Fragment key={p.Id + i}>
                    <tr>
                      <td>{p.Name}</td>
                      <td>${p.Price.toFixed(2)}</td>
                      <td>{p.Mass}g</td>
                    </tr>
                    <tr>
                      <td>Toppings:</td>
                      <td colSpan={2}>{p.Toppings.map(t => t.Name).join(', ')}</td>
                    </tr>
                  </React.Fragment>)
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

const OrderDetailsPage = protectedRoute(OrderDetailsPageBase, 'Moderator')

export default OrderDetailsPage
