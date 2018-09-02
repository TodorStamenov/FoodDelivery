import { host, getHeaders } from './common'

const toppingRoute = 'api/toppings/'

function all (page) {
  return fetch(host + toppingRoute + '?page=' + page, {
    method: 'GET',
    headers: getHeaders(true, true)
  }).then(res => res.json())
}

function get (id) {
  return fetch(host + toppingRoute + id, {
    method: 'GET',
    headers: getHeaders(true, true)
  }).then(res => res.json())
}

function add (name) {
  return fetch(host + toppingRoute, {
    method: 'POST',
    body: JSON.stringify({ name }),
    headers: getHeaders(true, true)
  }).then(res => res.json())
}

function edit (id, name) {
  return fetch(host + toppingRoute + id, {
    method: 'PUT',
    body: JSON.stringify({ name }),
    headers: getHeaders(true, true)
  }).then(res => res.json())
}

function remove (id) {
  return fetch(host + toppingRoute + id, {
    method: 'DELETE',
    headers: getHeaders(true, true)
  }).then(res => res.json())
}

const ingredient = { all, get, add, edit, remove }

export default ingredient
