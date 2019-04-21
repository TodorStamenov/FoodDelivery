import React, { Component } from 'react'
import { connect } from 'react-redux'

class Notification extends Component {
  constructor (props) {
    super(props)

    this.state = {
      message: '',
      type: ''
    }
  }

  componentWillReceiveProps (newProps) {
    if (newProps.appState) {
      this.setState({
        hasTimeout: true,
        message: newProps.appState.message,
        type: newProps.appState.type
      })

      setTimeout(() => {
        this.setState({
          message: '',
          type: ''
        })
      }, 3000)
    }
  }

  render () {
    return (
      <div className={'row ' + (this.state.message ? '' : 'd-none')}>
        <div
          role='alert'
          className={'offset-3 col-md-6 text-center alert alert-' + this.state.type}>
          {this.state.message}
        </div>
      </div>
    )
  }
}

function mapState (state) {
  return {
    appState: state
  }
}

export default connect(mapState)(Notification)
