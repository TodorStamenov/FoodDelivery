import React, { Component } from 'react'
import order from '../../api/order'
import TableHead from '../common/TableHead'
import protectedRoute from '../../utils/protectedRoute'

const tableHeadNames = ['User', 'Address', 'Time Stamp', 'Actions']

class EmployeeOrdersPageBase extends Component {
  constructor (props) {
    super(props)

    this.state = {
      orders: []
    }

    this.renderTable = this.renderTable.bind(this)
    this.toggleIngredients = this.toggleIngredients.bind(this)
    this.toggleProducts = this.toggleProducts.bind(this)
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

  toggleProducts (id) {
    let products = document.getElementsByClassName('product')
    let ingredients = document.getElementsByClassName('ingredient')

    for (const ingredient of ingredients) {
      ingredient.style.display = 'none'
    }

    for (const element of products) {
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

  toggleIngredients (id) {
    let ingredients = document.getElementsByClassName('ingredient')

    for (const element of ingredients) {
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

  updateOrders () {
    let orders = this.state
      .orders
      .map(o => {
        return {
          Id: o.Id,
          Status: o.Status
        }
      })

    order.updateQueue(orders)
    this.loadOrders()
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
              {order.Statuses.sort((x, y) => x.localeCompare(y)).map(s =>
                <option key={s} value={s} selected={(order.Status === s ? 'selected' : '')}>
                  {s}
                </option>)}
            </select>
            <button className='btn btn-secondary btn-sm ml-2' onClick={() => this.toggleProducts(order.Id)}>Details</button>
          </td>
        </tr>
      )

      for (const product of order.Products) {
        table.push(
          <tr style={{ display: 'none' }}
            className='product table-secondary'
            onClick={() => this.toggleIngredients(order.Id + product.Id)}
            data-id={order.Id}
            key={product.Id + order.Id}>
            <td />
            <td>{product.Name}</td>
            <td>Main Ingredients:</td>
            <td>Toppings:</td>
          </tr>
        )

        const mains = product.Mains
        const toppings = product.Toppings

        const length = Math.max(mains.length, toppings.length)

        for (let i = 0; i < length; i++) {
          table.push(
            <tr style={{ display: 'none' }}
              className='ingredient'
              data-id={order.Id + product.Id}
              key={mains[i] ? mains[i].Id + product.Id + order.Id : toppings[i].Id + product.Id + order.Id}>
              <td />
              <td />
              <td>{mains[i] ? mains[i].Name : ''}</td>
              <td>{toppings[i] ? toppings[i].Name : ''}</td>
            </tr>
          )
        }
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
