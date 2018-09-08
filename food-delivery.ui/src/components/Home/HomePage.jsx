import React, { Component } from 'react'
import home from '../../api/home'

export default class HomePage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      categories: []
    }

    this.renderCards = this.renderCards.bind(this)
  }

  componentDidMount () {
    home.index().then(res => {
      this.setState({
        categories: res
      })
    })
  }

  renderCards () {
    let result = []

    for (let i = 0; i < this.state.categories.length; i += 3) {
      result.push(
        <div key={i} className='row'>
          {this.state.categories.slice(i, i + 3).map(c =>
            <div key={c.Id} className='col-md-4 card' >
              <h4 style={{paddingTop: '25px'}} className='text-center card-title'>{c.Name}</h4>
              <hr />
              <img className='card-img-top' height='350px' src={c.Image} alt='Category img' />
              <div className='card-body'>
                <ul className='list-group'>
                  <li className='list-group-item' onClick={() => this.props.toggleProducts(c.Id, 'product')}>Toggle Products</li>
                  {c.Products.map(p =>
                    <li key={p.Id} style={{display: 'none'}} data-id={c.Id} className='list-group-item product'>
                      {p.Name} - ${p.Price.toFixed(2)} - {p.Mass}g {!this.props.isAuthed || <button className='btn btn-sm ml-2 btn-outline-dark float-right'>Order</button>}
                    </li>)
                  }
                </ul>
              </div>
            </div>
          )}
        </div>
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
