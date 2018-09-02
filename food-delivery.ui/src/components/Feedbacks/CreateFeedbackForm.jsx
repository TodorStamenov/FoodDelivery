import React, { Component } from 'react'
import protectedRoute from '../../utils/protectedRoute'
import feedback from '../../api/feedback'

class CreateFeedbackFormBase extends Component {
  constructor (props) {
    super(props)

    this.state = {
      productId: '',
      content: '',
      rate: '',
      rates: []
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount () {
    feedback.rates().then(res => {
      this.setState({
        rates: res
      })
    })
  }

  onChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit (e) {
    e.preventDefault()

    feedback.add(this.props.match.params.id, this.state.content, this.state.rate)
      .then(res => {
        if (res.ModelState) {
          console.log([...new Set(Object.values(res.ModelState).join(',').split(','))].join('\n'))
          return
        }

        this.props.history.push('/')
      })
  }

  render () {
    return (
      <div className='form-group col-md-4 offset-md-2'>
        <form onSubmit={this.onSubmit}>
          <div className='form-group'>
            <label htmlFor='content'>Feedback</label>
            <textarea
              onChange={this.onChange}
              value={this.state.content}
              type='text'
              name='content'
              className='form-control'
              id='content'
              placeholder='Feedback content'
              rows='10' />
          </div>

          <div className='form-group'>
            <label htmlFor='rate'>Rate</label>
            <select
              onChange={this.onChange}
              className='form-control'
              name='rate'
              id='rate'>
              <option value='none'>--Select Rate--</option>
              {this.state.rates.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>

          <input className='btn btn-dark' type='submit' value='Add Feedback' />
        </form>
      </div>
    )
  }
}

const CreateFeedbackForm = protectedRoute(CreateFeedbackFormBase, 'authed')

export default CreateFeedbackForm
