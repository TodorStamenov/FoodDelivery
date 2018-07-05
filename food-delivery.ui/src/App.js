import React, { Component } from 'react'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      feedbacks: []
    }
  }

  componentDidMount () {
    fetch('http://localhost:22011/api/feedbacks/all')
      .then(data => data.json())
      .then(feedbacks => {
        this.setState({
          feedbacks
        })
      })
  }

  render () {
    return (
      <div>
        {this.state.feedbacks.map(f => <p key={f.Id}>{f.Content}</p>)}
      </div>
    )
  }
}

export default App
