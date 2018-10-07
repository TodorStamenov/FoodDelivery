import React, { Component } from 'react'
import { connect } from 'react-redux'
import order from '../../api/order'
import TableHead from '../Common/TableHead'
import protectedRoute from '../../utils/protectedRoute'
import actions from '../../utils/actions'

const tableHeadNames = ['User', 'Address', 'Time Stamp', 'Actions']

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
        this.setState({
          orders: res
        })
      }
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
          <div className='col-md-6'>
            <h2>Orders Queue - <button onClick={this.updateOrders} className='btn btn-md btn-secondary'>Update Orders</button></h2>
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
                    <td>{o.User}</td>
                    <td>{o.Address}</td>
                    <td>{o.TimeStamp}</td>
                    <td className='input-group'>
                      <select onChange={e => this.handleChange(e, o.Id)} className='form-control'>
                        {o.Statuses.sort((x, y) => y.localeCompare(x)).map(s =>
                          <option key={s} value={s} selected={(o.Status === s ? 'selected' : '')}>
                            {s}
                          </option>)
                        }
                      </select>
                      <button className='btn btn-secondary btn-sm ml-2' onClick={() => this.props.toggleDetails(o.Id, 'product')}>Details</button>
                    </td>
                  </tr>
                  {o.Products.map((p, i) =>
                    <tr key={i} style={{ display: 'none' }} className='product' data-id={o.Id}>
                      <td>{p.Name}</td>
                      <td colSpan={3}>Toppings: {p.Toppings.map(t => t.Name).join(' | ')}</td>
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
