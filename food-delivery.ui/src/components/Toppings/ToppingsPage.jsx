import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import topping from '../../api/topping'
import TableHead from '../Common/TableHead'
import protectedRoute from '../../utils/protectedRoute'

class ToppingsPageBase extends Component {
  constructor (props) {
    super(props)

    this.state = {
      toppingPage: {
        CurrentPage: 1,
        Toppings: []
      }
    }

    this.getToppings = this.getToppings.bind(this)
    this.deleteTopping = this.deleteTopping.bind(this)
    this.renderPageLinks = this.renderPageLinks.bind(this)
  }

  componentDidMount () {
    this.getToppings(1)
  }

  getToppings (page) {
    topping.all(page).then(res => {
      this.setState({
        toppingPage: res
      })
    })
  }

  deleteTopping (id) {
    topping.remove(id).then(res => {
      console.log(res)
      this.getToppings()
    })
  }

  renderPageLinks () {
    let pageLinks = []

    for (let i = 1; i <= this.state.toppingPage.TotalPages; i++) {
      pageLinks.push(i)
    }

    return (
      <nav aria-label='Page navigation example'>
        <ul className='pagination'>
          {pageLinks.map(p =>
            <li key={p} className='page-item'>
              <a onClick={() => this.getToppings(p)} className={'page-link ' + (p === this.state.toppingPage.CurrentPage ? 'text-light bg-secondary' : '')}>{p}</a>
            </li>)}
        </ul>
      </nav>)
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
        <div className='row'>
          {this.renderPageLinks()}
        </div>
        <br />
        <div className='row'>
          <table className='table table-hover'>
            {<TableHead heads={['Name', 'Actions']} />}
            <tbody>
              {this.state.toppingPage.Toppings.map(i =>
                <tr key={i.Id}>
                  <td>{i.Name}</td>
                  <td>
                    <Link className='btn btn-secondary btn-sm' to={'/moderator/toppings/edit/' + i.Id}>Edit</Link>
                    <button onClick={() => this.deleteTopping(i.Id)} className='btn btn-secondary btn-sm ml-2'>Delete</button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {this.renderPageLinks()}
      </div>
    )
  }
}

const ToppingsPage = protectedRoute(ToppingsPageBase, 'Moderator')

export default ToppingsPage
