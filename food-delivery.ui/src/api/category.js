import { host, getHeaders } from './common'

const categoryRoute = 'api/categories/'

function all () {
  return fetch(host + categoryRoute, {
    method: 'GET',
    headers: getHeaders(true, true)
  }).then(res => res.json())
}

function addCategory (formData) {
  return fetch(host + categoryRoute, {
    method: 'POST',
    body: formData,
    headers: {
      'Authorization': 'Bearer ' + sessionStorage.getItem('authtoken')
    }
  }).then(res => res.json())
}

const moderator = { all, addCategory }

export default moderator
