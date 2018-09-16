import React, { Component } from 'react'
import home from '../../api/home'
import order from '../../api/order'

export default class HomePage extends Component {
  constructor (props) {
    super(props)

    this._isMounted = false
    this.state = {
      categories: []
    }

    this.renderCards = this.renderCards.bind(this)
    this.addProduct = this.addProduct.bind(this)
  }

  componentDidMount () {
    this._isMounted = true
    home.index().then(res => {
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

  addProduct (id) {
    order.addProduct(id).then(res => {
      console.log(res)
    })
  }

  renderCards () {
    let result = []

    for (let i = 0; i < this.state.categories.length; i += 3) {
      result.push(
        <React.Fragment key={i}>
          <div className='row'>
            {this.state.categories.slice(i, i + 3).map(c =>
              <div key={c.Id} className='col-md-4'>
                <div className='card' >
                  <h4 style={{paddingTop: '25px'}} className='text-center card-title'>{c.Name}</h4>
                  <hr />
                  <img className='card-img-top' height='350px' src={c.Image} alt='Category img' />
                  <div className='card-body'>
                    <ul className='list-group'>
                      <li className='list-group-item text-center' onClick={() => this.props.toggleProducts(c.Id, 'product')}>Products</li>
                      {c.Products.map(p =>
                        <li key={p.Id} style={{display: 'none'}} data-id={c.Id} className='list-group-item product'>
                          {p.Name} - ${p.Price.toFixed(2)} - {p.Mass}g
                          {
                            !this.props.isAuthed ||
                            <button onClick={() => this.addProduct(p.Id)} className='btn btn-sm ml-2 btn-outline-secondary float-right'>Order</button>
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
        </React.Fragment>
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
