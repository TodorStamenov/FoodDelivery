import { host, getHeaders } from './common'

const categoryRoute = 'api/categories/'

function all () {
  return fetch(host + categoryRoute, {
    method: 'GET',
    headers: getHeaders(true, true)
  }).then(res => res.json())
}

function getAll () {
  return fetch(host + categoryRoute + 'all', {
    method: 'GET',
    headers: getHeaders(true, true)
  }).then(res => res.json())
}

function getProducts (id, page) {
  return fetch(host + categoryRoute + id + '/products?page=' + page, {
    method: 'GET',
    headers: getHeaders(true, true)
  }).then(res => res.json())
}

function add (formData) {
  return fetch(host + categoryRoute, {
    method: 'POST',
    body: formData,
    headers: getHeaders(true, false)
  }).then(res => res.json())
}

function edit (id, formData) {
  return fetch(host + categoryRoute + id, {
    method: 'PUT',
    body: formData,
    headers: getHeaders(true, false)
  }).then(res => res.json())
}

function get (id) {
  return fetch(host + categoryRoute + id, {
    method: 'GET',
    headers: getHeaders(true, true)
  }).then(res => res.json())
}

const moderator = {
  all,
  getAll,
  getProducts,
  get,
  add,
  edit
}

export default moderator
