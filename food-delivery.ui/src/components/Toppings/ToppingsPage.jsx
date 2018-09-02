import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import topping from '../../api/topping'
import TableHead from '../Common/TableHead'
import protectedRoute from '../../utils/protectedRoute'

class ToppingsPageBase extends Component {
  constructor (props) {
    super(props)

    this.state = {
      toppings: []
    }

    this.getToppings = this.getToppings.bind(this)
    this.deleteTopping = this.deleteTopping.bind(this)
  }

  componentDidMount () {
    this.getToppings()
  }

  getToppings () {
    topping.all().then(res => {
      this.setState({
        toppings: res
      })
    })
  }

  deleteTopping (id) {
    topping.remove(id).then(res => {
      console.log(res)
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

const ToppingsPage = protectedRoute(ToppingsPageBase, 'Moderator')

export default ToppingsPage
