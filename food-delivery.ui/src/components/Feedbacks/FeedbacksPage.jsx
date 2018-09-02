import React, { Component } from 'react'
import feedback from '../../api/feedback'
import TableHead from '../Common/TableHead'
import protectedRoute from '../../utils/protectedRoute'

const tableHeadNames = ['Product', 'Rate', 'Timestamp', 'User', 'Actions']

class FeedbacksPageBase extends Component {
  constructor (props) {
    super(props)

    this.state = {
      feedbackPage: {
        CurrentPage: 1,
        Feedbacks: []
      }
    }

    this.renderPageLinks = this.renderPageLinks.bind(this)
    this.renderTable = this.renderTable.bind(this)
    this.getFeedbacks = this.getFeedbacks.bind(this)
  }

  componentDidMount () {
    this.getFeedbacks(1)
  }

  getFeedbacks (page) {
    feedback.all(page).then(res => {
      this.setState({
        feedbackPage: res
      })
    })
  }

  renderPageLinks () {
    let pageLinks = []

    for (let i = 1; i <= this.state.feedbackPage.TotalPages; i++) {
      pageLinks.push(i)
    }

    return (
      <nav aria-label='Page navigation example'>
        <ul className='pagination'>
          {pageLinks.map(p =>
            <li key={p} className='page-item'>
              <a onClick={() => this.getFeedbacks(p)} className={'page-link ' + (p === this.state.feedbackPage.CurrentPage ? 'text-light bg-secondary' : '')}>{p}</a>
            </li>)}
        </ul>
      </nav>)
  }

  renderTable () {
    let table = []

    for (const feedback of this.state.feedbackPage.Feedbacks) {
      table.push(
        <tr key={feedback.Id}>
          <td>{feedback.ProductName}</td>
          <td>{feedback.Rate}</td>
          <td>{feedback.TimeStamp}</td>
          <td>{feedback.User}</td>
          <td><button onClick={() => this.props.toggleDetails(feedback.Id.toString(), 'feedback-content')} className='btn btn-secondary btn-sm'>Details</button></td>
        </tr>)

      table.push(
        <tr className='feedback-content' style={{display: 'none'}} data-id={feedback.Id} key={feedback.Id + '1'}>
          <td colSpan={tableHeadNames.length}>{feedback.Content}</td>
        </tr>)
    }

    return table
  }

  render () {
    return (
      <div>
        <div className='row'>
          <div className='col-md-6'>
            <h2>All Feedbacks</h2>
          </div>
        </div>
        <br />
        <div className='row'>
          {this.renderPageLinks()}
        </div>
        <br />
        <div className='row'>
          <table className='table table-hover'>
            {<TableHead heads={tableHeadNames} />}
            <tbody>
              {this.renderTable()}
            </tbody>
          </table>
        </div>
        <div className='row'>
          {this.renderPageLinks()}
        </div>
      </div>
    )
  }
}

const FeedbacksPage = protectedRoute(FeedbacksPageBase, 'Moderator')

export default FeedbacksPage
