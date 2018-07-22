import { host, getHeaders } from './common'
import axios from 'axios'

const categoryRoute = 'api/categories/'

function all () {
  return fetch(host + categoryRoute, {
    method: 'GET',
    headers: getHeaders(true, true)
  }).then(res => res.json())
}

function addCategory (formData) {
  return axios.post(host + categoryRoute, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': 'Bearer ' + sessionStorage.getItem('authtoken')
    }
  })
}

const moderator = { all, addCategory }

export default moderator
