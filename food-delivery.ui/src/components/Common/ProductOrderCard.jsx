import React, { Component } from 'react'

export default class ProductOrderCard extends Component {
  render () {
    return (
      <div className='col-md-3'>
        <div className='card h-100'>
          <div className='card-header text-center text-light bg-secondary'>
            {this.props.product.Name} | ${this.props.product.Price.toFixed(2)} | {this.props.product.Mass}g
          </div>
          <div className='card-body'>
            {
              this.props.product.Toppings.map((t, k) =>
                <div key={t.Id} className='form-check'>
                  <label className='form-check-label'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      value={t.Id}
                      onChange={e => this.props.handleToppingCheck(e, this.props.i + this.props.j, k)} />
                    {t.Name}
                  </label>
                </div>
              )
            }
          </div>
          <div className='card-footer text-center bg-white'>
            <button onClick={() => this.props.removeProduct(this.props.product.Id)} className='btn btn-outline-secondary btn-sm'>
              Remove
            </button>
          </div>
        </div>
      </div>
    )
  }
}
