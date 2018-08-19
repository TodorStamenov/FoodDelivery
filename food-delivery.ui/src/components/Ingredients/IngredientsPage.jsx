import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ingredient from '../../api/ingredient'
import TableHead from '../common/TableHead'
import protectedRoute from '../../utils/protectedRoute'

class IngredientsPageBase extends Component {
  constructor (props) {
    super(props)

    this.state = {
      ingredientPage: {
        CurrentPage: 1,
        Ingredients: []
      }
    }

    this.getIngredients = this.getIngredients.bind(this)
    this.renderPageLinks = this.renderPageLinks.bind(this)
  }

  componentDidMount () {
    this.getIngredients(1)
  }

  getIngredients (page) {
    ingredient.all(page).then(res => {
      this.setState({
        ingredientPage: res
      })
    })
  }

  renderPageLinks () {
    let pageLinks = []

    for (let i = 1; i <= this.state.ingredientPage.TotalPages; i++) {
      pageLinks.push(i)
    }

    return (
      <nav aria-label='Page navigation example'>
        <ul className='pagination'>
          {pageLinks.map(p =>
            <li key={p} className={'page-item ' + (p === this.state.ingredientPage.CurrentPage ? 'active' : '')}>
              <a onClick={() => this.getIngredients(p)} className='page-link'>{p}</a>
            </li>)}
        </ul>
      </nav>)
  }

  render () {
    return (
      <div>
        <div className='row'>
          <div className='col-md-6'>
            <h2>All Ingredients - <Link className='btn btn-secondary btn-md' to='/moderator/ingredients/create'>Create new Ingredient</Link></h2>
          </div>
        </div>
        <br />
        <div className='row'>
          {this.renderPageLinks()}
        </div>
        <br />
        <div className='row'>
          <table className='table table-hover table-striped'>
            {<TableHead heads={['Name', 'Type', 'Actions']} />}
            <tbody>
              {this.state.ingredientPage.Ingredients.map(i =>
                <tr key={i.Id}>
                  <td>{i.Name}</td>
                  <td>{i.IngredientType}</td>
                  <td>
                    <Link className='btn btn-secondary btn-sm' to={'/moderator/ingredients/edit/' + i.Id}>Edit</Link>
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

const IngredientsPage = protectedRoute(IngredientsPageBase, 'Moderator')

export default IngredientsPage
