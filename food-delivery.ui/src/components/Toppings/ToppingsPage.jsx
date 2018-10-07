import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import topping from '../../api/topping'
import TableHead from '../Common/TableHead'
import protectedRoute from '../../utils/protectedRoute'
import actions from '../../utils/actions'

class ToppingsPageBase extends Component {
  constructor (props) {
    super(props)

    this._isMounted = false
    this.state = {
      toppings: []
    }

    this.getToppings = this.getToppings.bind(this)
    this.deleteTopping = this.deleteTopping.bind(this)
  }

  componentDidMount () {
    this._isMounted = true
    this.getToppings()
  }

  getToppings () {
    topping.all().then(res => {
      if (this._isMounted) {
        this.setState({
          toppings: res
        })
      }
    })
  }

  componentWillUnmount () {
    this._isMounted = false
  }

  deleteTopping (id) {
    topping.remove(id).then(res => {
      if (res.ModelState) {
        this.props.showError([...new Set(Object.values(res.ModelState).join(',').split(','))].join('\n'))
        return
      }

      this.props.showSuccess(res)
      this.getToppings()
    })
  }

  render () {
    return (
      <div>
        <div className='row'>
          <div className='col-md-6'>
            <h2>All Toppings - <Link className='btn btn-secondary btn-md' to='/moderator/toppings/create'>Create new Topping</Link></h2>
          </div>
        </div>
        <br />
        <br />
        <div className='row'>
          <table className='table table-hover'>
            {<TableHead heads={['Name', 'Actions']} />}
            <tbody>
              {this.state.toppings.map(t =>
                <tr key={t.Id}>
                  <td>{t.Name}</td>
                  <td>
                    <Link className='btn btn-secondary btn-sm' to={'/moderator/toppings/edit/' + t.Id}>Edit</Link>
                    <button onClick={() => this.deleteTopping(t.Id)} className='btn btn-secondary btn-sm ml-2'>Delete</button>
                  </td>
                </tr>
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

const ToppingsPage = protectedRoute(ToppingsPageBase, 'Moderator')

export default connect(mapState, mapDispatch)(ToppingsPage)
