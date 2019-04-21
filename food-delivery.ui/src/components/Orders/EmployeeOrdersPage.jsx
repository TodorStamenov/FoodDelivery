import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import order from '../../api/order'
import TableHead from '../Common/TableHead'
import protectedRoute from '../../utils/protectedRoute'
import actions from '../../utils/actions'
import './EmployeeOrdersPage.css'

const tableHeadNames = ['User', 'Address', 'Time Stamp', 'Actions']
const hiddenClassName = 'eop-order-hidden'

class EmployeeOrdersPageBase extends Component {
  constructor (props) {
    super(props)

    this._isMounted = false
    this.state = {
      orders: []
    }

    this.updateOrders = this.updateOrders.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.loadOrders = this.loadOrders.bind(this)
    this.toggleDetails = this.toggleDetails.bind(this)
  }

  componentDidMount () {
    this._isMounted = true
    this.loadOrders()
  }

  componentWillUnmount () {
    this._isMounted = false
  }

  loadOrders () {
    order.employeeOrders().then(res => {
      if (this._isMounted) {
        for (const order of res) {
          for (const product of order.Products) {
            product.toggleClass = hiddenClassName
          }
        }

        this.setState({
          orders: res
        })
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

  handleChange (event, orderId) {
    let orders = this.state.orders
    let orderIndex = orders.findIndex(o => o.Id === orderId)
    orders[orderIndex].Status = event.target.value

    this.setState({
      orders
    })
  }

  updateOrders () {
    let orders = this.state.orders.map(o => {
      return {
        Id: o.Id,
        Status: o.Status
      }
    })

    order.updateQueue(orders).then(res => {
      this.props.showSuccess(res)
      this.loadOrders()
    })
  }

  render () {
    if (this.state.orders.length === 0) {
      return <h4>You do not have any orders in your queue</h4>
    }

    return (
      <div>
        <div className='row'>
          <div className='col-md-12'>
            <h2>
              Orders Queue -
              <button
                onClick={this.updateOrders}
                className='btn btn-md btn-secondary ml-2'>
                Update Orders
              </button>
            </h2>
          </div>
        </div>
        <br />
        <div className='row'>
          <table className='table table-hover'>
            {<TableHead heads={tableHeadNames} />}
            <tbody>
              {this.state.orders.map(o =>
                <Fragment key={o.Id}>
                  <tr>
                    <td>{o.User}</td>
                    <td>{o.Address}</td>
                    <td>{o.TimeStamp}</td>
                    <td className='form-inline form-group'>
                      <select
                        value={o.Statuses.find(s => o.Status === s)}
                        onChange={e => this.handleChange(e, o.Id)}
                        className='form-control'>
                        {o.Statuses.sort((x, y) => y.localeCompare(x)).map(s =>
                          <option key={s} value={s}>{s}</option>
                        )}
                      </select>
                      <button
                        className='btn btn-secondary btn-sm ml-2'
                        onClick={() => this.toggleDetails(o.Id)}>
                        Details
                      </button>
                    </td>
                  </tr>
                  {o.Products.map((p, i) =>
                    <tr key={i} className={p.toggleClass}>
                      <td>{p.Name}</td>
                      <td colSpan={3}>
                        {(
                          p.Toppings.length === 0
                            ? 'Without Toppings'
                            : p.Toppings.map(t => t.Name).join(' | ')
                        )}
                      </td>
                    </tr>
                  )}
                </Fragment>
              )}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

function mapState (state) {
  return {
    appState: state
  }
}

function mapDispatch (dispatch) {
  return {
    showError: message => dispatch(actions.showErrorNotification(message)),
    showSuccess: message => dispatch(actions.showSuccessNotification(message))
  }
}

const EmployeeOrdersPage = protectedRoute(EmployeeOrdersPageBase, 'Employee')

export default connect(mapState, mapDispatch)(EmployeeOrdersPage)
