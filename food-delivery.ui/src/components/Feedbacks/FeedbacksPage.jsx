import React, { Component, Fragment } from 'react'
import feedback from '../../api/feedback'
import TableHead from '../Common/TableHead'
import protectedRoute from '../../utils/protectedRoute'
import './FeedbacksPage.css'

const tableHeadNames = ['Product', 'Rate', 'Timestamp', 'User', 'Actions']
const hiddenClassName = 'fp-feedback-hidden'

class FeedbacksPageBase extends Component {
  constructor (props) {
    super(props)

    this._isMounted = false
    this.state = {
      feedbackPage: {
        CurrentPage: 1,
        Feedbacks: []
      }
    }

    this.renderPageLinks = this.renderPageLinks.bind(this)
    this.getFeedbacks = this.getFeedbacks.bind(this)
    this.toggleDetails = this.toggleDetails.bind(this)
  }

  componentDidMount () {
    this._isMounted = true
    this.getFeedbacks(1)
  }

  componentWillUnmount () {
    this._isMounted = false
  }

  getFeedbacks (page) {
    feedback.all(page).then(res => {
      if (this._isMounted) {
        for (const feedback of res.Feedbacks) {
          feedback.toggleClass = hiddenClassName
        }

        this.setState({
          feedbackPage: res
        })
      }
    })
  }

  toggleDetails (id) {
    let feedbacks = this.state.feedbackPage.Feedbacks

    for (const feedback of feedbacks) {
      if (feedback.Id === id) {
        feedback.toggleClass = feedback.toggleClass ? '' : hiddenClassName
      } else {
        feedback.toggleClass = hiddenClassName
      }
    }

    this.setState(prevState => ({
      feedbackPage: {
        CurrentPage: prevState.feedbackPage.CurrentPage,
        EntriesPerPage: prevState.feedbackPage.EntriesPerPage,
        Feedbacks: feedbacks,
        TotalEntries: prevState.feedbackPage.TotalEntries,
        TotalPages: prevState.feedbackPage.TotalPages
      }
    }))
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
              <a
                onClick={() => this.getFeedbacks(p)}
                className={'page-link ' + (p === this.state.feedbackPage.CurrentPage ? 'text-light bg-secondary' : '')}>
                {p}
              </a>
            </li>)
          }
        </ul>
      </nav>
    )
  }

  render () {
    return (
      <div>
        <div className='row'>
          <div className='col-md-6'>
            <h2>All Feedbacks</h2>
          </div>
        </div>
        <div className='row my-2'>
          {this.renderPageLinks()}
        </div>
        <div className='row'>
          <div className='col-md-12'>
            <table className='table table-hover'>
              {<TableHead heads={tableHeadNames} />}
              <tbody>
                {
                  this.state.feedbackPage.Feedbacks.map(f =>
                    <Fragment key={f.Id}>
                      <tr>
                        <td>{f.ProductName}</td>
                        <td>{f.Rate}</td>
                        <td>{f.TimeStamp}</td>
                        <td>{f.User}</td>
                        <td>
                          <button
                            onClick={() => this.toggleDetails(f.Id)}
                            className='btn btn-secondary btn-sm'>
                            Details
                          </button>
                        </td>
                      </tr>
                      <tr className={f.toggleClass}>
                        <td colSpan={tableHeadNames.length}>{f.Content}</td>
                      </tr>
                    </Fragment>
                  )
                }
              </tbody>
            </table>
          </div>
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
