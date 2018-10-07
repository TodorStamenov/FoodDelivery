import React, { Component } from 'react'
import { connect } from 'react-redux'
import protectedRoute from '../../utils/protectedRoute'
import feedback from '../../api/feedback'
import actions from '../../utils/actions'

class CreateFeedbackFormBase extends Component {
  constructor (props) {
    super(props)

    this._isMounted = false
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
    this._isMounted = true
    feedback.rates().then(res => {
      if (this._isMounted) {
        this.setState({
          rates: res
        })
      }
    })
  }

  componentWillUnmount () {
    this._isMounted = false
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
          this.props.showError([...new Set(Object.values(res.ModelState).join(',').split(','))].join('\n'))
          return
        }

        this.props.showSuccess(res)
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

const CreateFeedbackForm = protectedRoute(CreateFeedbackFormBase, 'authed')

export default connect(mapState, mapDispatch)(CreateFeedbackForm)
