import React, { Component } from 'react'
import protectedRoute from '../../utils/protectedRoute'
import category from '../../api/category'

class CreateCategoryFormBase extends Component {
  constructor (props) {
    super(props)

    this.state = {
      name: '',
      image: null
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.fileSelectedHandler = this.fileSelectedHandler.bind(this)
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

    category.add(fd).then(res => {
      if (res.ModelState) {
        console.log([...new Set(Object.values(res.ModelState).join(',').split(','))].join('\n'))
        return
      }

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
          <input className='btn btn-dark' type='submit' value='Add Category' />
        </form>
      </div>
    )
  }
}

const CreateCategoryForm = protectedRoute(CreateCategoryFormBase, 'Moderator')

export default CreateCategoryForm
