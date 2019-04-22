import React, { Component } from 'react'
import './CategoryHomeCard.css'

export default class CategoryHomeCard extends Component {
  render () {
    return (
      <div className='col-md-4'>
        <div className='card' >
          <h4 className='text-center card-title'>{this.props.category.Name}</h4>
          <hr />
          <img className='card-img-top' height='350px' src={this.props.category.Image} alt='Category img' />
          <div className='card-body'>
            <ul className='list-group'>
              <li
                className='list-group-item text-center'
                onClick={() => this.props.toggleProducts(this.props.category.Id)}>
                Products
              </li>
              {
                this.props.category.Products.map(p =>
                  <li key={p.Id} className={'list-group-item ' + p.toggleClass}>
                    <div className='product-item'>
                      {p.Name} - ${p.Price.toFixed(2)} - {p.Mass}g
                      {
                        !this.props.isAuthed ||
                        <button
                          onClick={() => this.props.addProduct(p.Id)}
                          className='btn btn-sm ml-2 btn-outline-secondary'>
                          Order
                        </button>
                      }
                    </div>
                  </li>
                )
              }
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
