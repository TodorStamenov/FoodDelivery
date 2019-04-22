import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import home from '../../api/home'
import order from '../../api/order'
import actions from '../../utils/actions'
import './HomePage.css'
import CategoryHomeCard from '../Common/CategoryHomeCard'

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
          <div className='row mb-2'>
            {
              this.state.categories
                .slice(i, i + 3)
                .map(c =>
                  <CategoryHomeCard
                    key={c.Id}
                    category={c}
                    isAuthed={this.props.isAuthed}
                    toggleProducts={this.toggleProducts}
                    addProduct={this.addProduct} />
                )
            }
          </div>
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
