import React, { Component } from 'react'
import { connect } from 'react-redux'
import protectedRoute from '../../utils/protectedRoute'
import category from '../../api/category'
import actions from '../../utils/actions'

class EditCategoryFormBase extends Component {
  constructor (props) {
    super(props)

    this._isMounted = false
    this.state = {
      id: 0,
      name: '',
      image: null
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.fileSelectedHandler = this.fileSelectedHandler.bind(this)
  }

  componentDidMount () {
    this._isMounted = true
    category.get(this.props.match.params.id).then(res => {
      if (this._isMounted) {
        this.setState({
          id: res.Id,
          name: res.Name
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
    const fd = new FormData()

    fd.append('name', this.state.name)
    fd.append('image', this.state.image)

    category.edit(this.state.id, fd).then(res => {
      if (res.ModelState) {
        this.props.showError([...new Set(Object.values(res.ModelState).join(',').split(','))].join('\n'))
        return
      }

      this.props.showSuccess(res)
      this.props.history.push('/moderator/categories')
    })
  }

  fileSelectedHandler (e) {
    this.setState({
      image: e.target.files[0]
    })
  }

  render () {
    return (
      <div className='form-group col-md-4 offset-md-2'>
        <form onSubmit={this.onSubmit}>
          <div className='form-group'>
            <label htmlFor='name'>Name</label>
            <input onChange={this.onChange} value={this.state.name} type='text' name='name' className='form-control' id='name' placeholder='Category name' />
          </div>
          <div className='form-group'>
            <input onChange={this.fileSelectedHandler} type='file' name='image' accept='image/*' style={{ 'display': 'none' }} />
            <button type='button' className='btn btn-dark' onClick={() => document.getElementsByName('image')[0].click()}>
              Choose an Image
            </button>
          </div>
          <input className='btn btn-dark' type='submit' value='Edit Category' />
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
const EditCategoryForm = protectedRoute(EditCategoryFormBase, 'Moderator')

export default connect(mapState, mapDispatch)(EditCategoryForm)
