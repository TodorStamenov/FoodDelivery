import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import category from '../../api/category'
import TableHead from '../Common/TableHead'
import protectedRoute from '../../utils/protectedRoute'

class CategoriesPageBase extends Component {
  constructor (props) {
    super(props)

    this._isMounted = false
    this.state = {
      categories: []
    }
  }

  componentDidMount () {
    this._isMounted = true

    category.all().then(res => {
      if (this._isMounted) {
        this.setState({
          categories: res
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
          <div className='col-md-12'>
            <h2>
              All Categories - <Link className='btn btn-secondary btn-md' to='/moderator/categories/create'>Create new Category</Link>
            </h2>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-12'>
            <table className='table table-hover'>
              {<TableHead heads={['Name', 'Products Count', 'Products', 'Actions']} />}
              <tbody>
                {
                  this.state.categories.map(c =>
                    <tr key={c.Id}>
                      <td>{c.Name}</td>
                      <td>{c.Products}</td>
                      <td><Link className='btn btn-secondary btn-sm' to={'/moderator/categories/' + c.Id + '/products'}>Products</Link></td>
                      <td><Link className='btn btn-secondary btn-sm' to={'/moderator/categories/edit/' + c.Id}>Edit</Link></td>
                    </tr>
                  )
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

const CategoriesPage = protectedRoute(CategoriesPageBase, 'Moderator')

export default CategoriesPage
