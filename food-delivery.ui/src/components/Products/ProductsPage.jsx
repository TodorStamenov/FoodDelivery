import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { matchPath } from 'react-router'
import product from '../../api/product'
import category from '../../api/category'
import TableHead from '../Common/TableHead'
import protectedRoute from '../../utils/protectedRoute'

class ProductsPageBase extends Component {
  constructor (props) {
    super(props)

    this._isMounted = true
    this.state = {
      categoryId: '',
      productsPage: {
        CurrentPage: 1,
        Products: []
      }
    }

    this.getProducts = this.getProducts.bind(this)
    this.deleteProduct = this.deleteProduct.bind(this)
    this.renderPageLinks = this.renderPageLinks.bind(this)
  }

  async componentDidMount () {
    this._isMounted = true
    const match = matchPath(this.props.location.pathname, {
      path: '/moderator/categories/:id/products',
      exact: true,
      strict: false
    })

    if (match) {
      await this.setState({
        categoryId: match.params.id
      })
    }

    this.getProducts(1)
  }

  componentWillUnmount () {
    this._isMounted = false
  }

  getProducts (page) {
    if (this.state.categoryId) {
      category.getProducts(this.state.categoryId, page).then(res => {
        if (this._isMounted) {
          this.setState({
            productsPage: res
          })
        }
      })
    } else {
      product.all(page).then(res => {
        if (this._isMounted) {
          this.setState({
            productsPage: res
          })
        }
      })
    }
  }

  deleteProduct (id) {
    product.remove(id).then(res => {
      console.log(res)
      this.getProducts(this.state.productsPage.CurrentPage)
    })
  }

  renderPageLinks () {
    let pageLinks = []

    for (let i = 1; i <= this.state.productsPage.TotalPages; i++) {
      pageLinks.push(i)
    }

    return (
      <nav aria-label='Page navigation example'>
        <ul className='pagination'>
          {pageLinks.map(p =>
            <li key={p} className='page-item'>
              <a onClick={() => this.getProducts(p)} className={'page-link ' + (p === this.state.productsPage.CurrentPage ? 'text-light bg-secondary' : '')}>{p}</a>
            </li>)
          }
        </ul>
      </nav>)
  }

  render () {
    return (
      <div>
        <div className='row'>
          <div className='col-md-6'>
            <h2>All Products - <Link className='btn btn-secondary btn-md' to='/moderator/products/create'>Create new Product</Link></h2>
          </div>
        </div>
        <br />
        <div className='row'>
          {this.renderPageLinks()}
        </div>
        <br />
        <div className='row'>
          <table className='table table-hover'>
            {<TableHead heads={['Name', 'Mass', 'Price', 'Category', 'Rating', 'Actions']} />}
            <tbody>
              {this.state.productsPage.Products.map(p =>
                <tr key={p.Id}>
                  <td>{p.Name}</td>
                  <td>{p.Mass}g</td>
                  <td>${p.Price.toFixed(2)}</td>
                  <td>{p.Category}</td>
                  <td>{p.Rating}</td>
                  <td>
                    <Link className='btn btn-secondary btn-sm' to={'/moderator/products/edit/' + p.Id}>Edit</Link>
                    <button onClick={() => this.deleteProduct(p.Id)} className='btn btn-secondary btn-sm ml-2'>Delete</button>
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

const ProductsPage = protectedRoute(ProductsPageBase, 'Moderator')

export default ProductsPage
