import { actionTypes } from './actionTypes'

const rootReducer = (state = { message: '', type: '' }, action) => {
  switch (action.type) {
    case actionTypes.ERROR_NOTIFICATION:
      return {
        message: action.text,
        type: 'danger'
      }
    case actionTypes.SUCCESS_NOTIFICATION:
      return {
        message: action.text,
        type: 'success'
      }
    default:
      return state
  }
}

export default rootReducer
