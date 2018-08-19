import { host, getHeaders } from './common'

const ingredientRoute = 'api/ingredients/'

function all (page) {
  return fetch(host + ingredientRoute + '?page=' + page, {
    method: 'GET',
    headers: getHeaders(true, true)
  }).then(res => res.json())
}

function get (id) {
  return fetch(host + ingredientRoute + id, {
    method: 'GET',
    headers: getHeaders(true, true)
  }).then(res => res.json())
}

function types () {
  return fetch(host + ingredientRoute + 'types', {
    method: 'GET',
    headers: getHeaders(true, true)
  }).then(res => res.json())
}

function add (name, ingredientType) {
  return fetch(host + ingredientRoute, {
    method: 'POST',
    body: JSON.stringify({
      name,
      ingredientType
    }),
    headers: getHeaders(true, true)
  }).then(res => res.json())
}

function edit (id, name, ingredientType) {
  return fetch(host + ingredientRoute + id, {
    method: 'PUT',
    body: JSON.stringify({
      name,
      ingredientType
    }),
    headers: getHeaders(true, true)
  }).then(res => res.json())
}

const ingredient = { all, get, types, add, edit }

export default ingredient
