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
    headers: getHeaders(true, false)
  }).then(res => res.json())
}

function editCategory (id, formData) {
  return fetch(host + categoryRoute + id, {
    method: 'PUT',
    body: formData,
    headers: getHeaders(true, false)
  }).then(res => res.json())
}

function getCategory (id) {
  return fetch(host + categoryRoute + id, {
    method: 'GET',
    headers: getHeaders(true, true)
  }).then(res => res.json())
}

const moderator = { all, getCategory, addCategory, editCategory }

export default moderator
