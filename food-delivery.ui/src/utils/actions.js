import { actionTypes } from './actionTypes'

function showErrorNotification (text) {
  return {
    type: actionTypes.ERROR_NOTIFICATION,
    text
  }
}

function showSuccessNotification (text) {
  return {
    type: actionTypes.SUCCESS_NOTIFICATION,
    text
  }
}

const actions = {
  showErrorNotification,
  showSuccessNotification
}

export default actions
