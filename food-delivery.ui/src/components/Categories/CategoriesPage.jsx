import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import category from '../../api/category'
import TableHead from '../common/TableHead'
import protectedRoute from '../../utils/protectedRoute'

class CategoriesPageBase extends Component {
  constructor (props) {
    super(props)

    this.state = {
      categories: []
    }
  }

  componentDidMount () {
    category.all().then(res => {
      this.setState({
        categories: res
      })
    })
  }

  render () {
    return (
      <div>
        <div className='row'>
          <div className='col-md-6'>
            <h2>All Categories - <Link className='btn btn-secondary btn-md' to='/moderator/categories/create'>Create new Category</Link></h2>
          </div>
        </div>
        <br />
        <div className='row'>
          <table className='table table-hover'>
            {<TableHead heads={['Name', 'Products Count', 'Products', 'Actions']} />}
            <tbody>
              {this.state.categories.map(c =>
                <tr key={c.Id}>
                  <td>{c.Name}</td>
                  <td>{c.Products}</td>
                  <td><Link className='btn btn-secondary btn-sm' to={'/moderator/categories/' + c.Id + '/products'}>Products</Link></td>
                  <td><Link className='btn btn-secondary btn-sm' to={'/moderator/categories/edit/' + c.Id}>Edit</Link></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

const CategoriesPage = protectedRoute(CategoriesPageBase, 'Moderator')

export default CategoriesPage
