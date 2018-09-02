import React, { Component } from 'react'
import order from '../../api/order'
import TableHead from '../Common/TableHead'
import protectedRoute from '../../utils/protectedRoute'

const tableHeadNames = ['User', 'Address', 'Time Stamp', 'Actions']

class EmployeeOrdersPageBase extends Component {
  constructor (props) {
    super(props)

    this.state = {
      orders: []
    }

    this.renderTable = this.renderTable.bind(this)
    this.updateOrders = this.updateOrders.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.loadOrders = this.loadOrders.bind(this)
  }

  componentDidMount () {
    this.loadOrders()
  }

  loadOrders () {
    order.employeeOrders().then(res => {
      this.setState({
        orders: res
      })
    })
  }

  handleChange (event, orderId) {
    let orders = this.state.orders
    let orderIndex = orders.findIndex(o => o.Id === orderId)
    orders[orderIndex].Status = event.target.value

    this.setState({
      orders
    })
  }

  updateOrders () {
    let orders = this.state
      .orders
      .map(o => {
        return {
          Id: o.Id,
          Status: o.Status
        }
      })

    order.updateQueue(orders).then(res => {
      console.log(res)
      this.loadOrders()
    })
  }

  renderTable () {
    let table = []

    for (const order of this.state.orders) {
      table.push(
        <tr key={order.Id}>
          <td>{order.User}</td>
          <td>{order.Address}</td>
          <td>{order.TimeStamp}</td>
          <td className='input-group'>
            <select onChange={e => this.handleChange(e, order.Id)} className='form-control'>
              {order.Statuses.sort((x, y) => y.localeCompare(x)).map(s =>
                <option key={s} value={s} selected={(order.Status === s ? 'selected' : '')}>
                  {s}
                </option>)
              }
            </select>
            <button className='btn btn-secondary btn-sm ml-2' onClick={() => this.props.toggleDetails(order.Id, 'product')}>Details</button>
          </td>
        </tr>
      )

      for (const product of order.Products) {
        table.push(
          <tr style={{ display: 'none' }}
            className='product'
            data-id={order.Id}
            key={product.Id + order.Id + product.Toppings.map(t => t.Id).join()}>
            <td>{product.Name}</td>
            <td colSpan={3}>Toppings: {product.Toppings.map(t => t.Name).join(', ')}</td>
          </tr>
        )
      }
    }

    return table
  }

  render () {
    return (
      <div>
        <div className='row'>
          <div className='col-md-6'>
            <h2>Orders Queue - <button onClick={this.updateOrders} className='btn btn-md btn-secondary'>Update Orders</button></h2>
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

const EmployeeOrdersPage = protectedRoute(EmployeeOrdersPageBase, 'Employee')

export default EmployeeOrdersPage
