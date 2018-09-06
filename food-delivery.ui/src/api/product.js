import { host, getHeaders } from './common'

const productRoute = 'api/products/'

function all (page) {
  return fetch(host + productRoute + '?page=' + page, {
    method: 'GET',
    headers: getHeaders(true, true)
  }).then(res => res.json())
}

function get (id) {
  return fetch(host + productRoute + id, {
    method: 'GET',
    headers: getHeaders(true, true)
  }).then(res => res.json())
}

function add (name, price, mass, categoryId) {
  return fetch(host + productRoute, {
    method: 'POST',
    body: JSON.stringify({
      name,
      price,
      mass,
      categoryId
    }),
    headers: getHeaders(true, true)
  }).then(res => res.json())
}

function edit (id, name, price, mass, categoryId) {
  return fetch(host + productRoute + id, {
    method: 'PUT',
    body: JSON.stringify({
      name,
      price,
      mass,
      categoryId
    }),
    headers: getHeaders(true, true)
  }).then(res => res.json())
}

function remove (id) {
  return fetch(host + productRoute + id, {
    method: 'DELETE',
    headers: getHeaders(true, true)
  }).then(res => res.json())
}

const ingredient = {
  all,
  get,
  add,
  edit,
  remove
}

export default ingredient
