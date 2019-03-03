import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import home from '../../api/home'
import order from '../../api/order'
import actions from '../../utils/actions'
import './HomePage.css'

const hiddenClassName = 'hp-product-hidden'

class HomePage extends Component {
  constructor (props) {
    super(props)

    this._isMounted = false
    this.state = {
      categories: []
    }

    this.renderCards = this.renderCards.bind(this)
    this.addProduct = this.addProduct.bind(this)
    this.toggleProducts = this.toggleProducts.bind(this)
  }

  componentDidMount () {
    this._isMounted = true
    home.index().then(res => {
      if (this._isMounted) {
        for (const category of res) {
          for (const product of category.Products) {
            product.toggleClass = hiddenClassName
          }
        }

        console.log(res)

        this.setState({
          categories: res
        })
      }
    })
  }

  componentWillUnmount () {
    this._isMounted = false
  }

  addProduct (id) {
    order.addProduct(id).then(res => {
      this.props.showSuccess(res)
    })
  }

  toggleProducts (id) {
    let categories = this.state.categories

    for (const category of categories) {
      if (category.Id === id) {
        for (const product of category.Products) {
          product.toggleClass = product.toggleClass ? '' : hiddenClassName
        }
      } else {
        for (const product of category.Products) {
          product.toggleClass = hiddenClassName
        }
      }
    }

    this.setState({
      categories
    })
  }

  renderCards () {
    let result = []

    for (let i = 0; i < this.state.categories.length; i += 3) {
      result.push(
        <Fragment key={i}>
          <div className='row'>
            {this.state.categories.slice(i, i + 3).map(c =>
              <div key={c.Id} className='col-md-4'>
                <div className='card' >
                  <h4 style={{paddingTop: '25px'}} className='text-center card-title'>{c.Name}</h4>
                  <hr />
                  <img className='card-img-top' height='350px' src={c.Image} alt='Category img' />
                  <div className='card-body'>
                    <ul className='list-group'>
                      <li className='list-group-item text-center' onClick={() => this.toggleProducts(c.Id)}>Products</li>
                      {c.Products.map(p =>
                        <li key={p.Id} className={'list-group-item ' + p.toggleClass}>
                          {p.Name} - ${p.Price.toFixed(2)} - {p.Mass}g
                          {
                            !this.props.isAuthed ||
                            <button onClick={() => this.addProduct(p.Id)} className='btn btn-sm ml-2 btn-outline-secondary float-right'>
                              Order
                            </button>
                          }
                        </li>)
                      }
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
          <br />
        </Fragment>
      )
    }

    return result
  }

  render () {
    return (
      <div className='container body-content'>
        {this.renderCards()}
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

export default connect(mapState, mapDispatch)(HomePage)
