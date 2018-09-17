import { host, getHeaders } from './common'

const orderRoute = 'api/orders/'

function moderatorQueue (loadedElements) {
  return fetch(host + orderRoute + 'moderator/queue/' + loadedElements, {
    method: 'GET',
    headers: getHeaders(true, true)
  }).then(res => res.json())
}

function moderatorHistory (loadedElements) {
  return fetch(host + orderRoute + 'moderator/history/' + loadedElements, {
    method: 'GET',
    headers: getHeaders(true, true)
  }).then(res => res.json())
}

function employeeOrders () {
  return fetch(host + orderRoute + 'employee/queue', {
    method: 'GET',
    headers: getHeaders(true, true)
  }).then(res => res.json())
}

function updateQueue (orders) {
  return fetch(host + orderRoute + 'employee/updateQueue', {
    method: 'POST',
    headers: getHeaders(true, true),
    body: JSON.stringify(orders)
  }).then(res => res.json())
}

function userPending () {
  return fetch(host + orderRoute + 'user/pending', {
    method: 'GET',
    headers: getHeaders(true, true)
  }).then(res => res.json())
}

function userQueue () {
  return fetch(host + orderRoute + 'user/queue', {
    method: 'GET',
    headers: getHeaders(true, true)
  }).then(res => res.json())
}

function userHistory (loadedElements) {
  return fetch(host + orderRoute + 'user/history/' + loadedElements, {
    method: 'GET',
    headers: getHeaders(true, true)
  }).then(res => res.json())
}

function details (id) {
  return fetch(host + orderRoute + 'details/' + id, {
    method: 'GET',
    headers: getHeaders(true, true)
  }).then(res => res.json())
}

function addProduct (productId) {
  return fetch(host + orderRoute + 'addProduct', {
    method: 'POST',
    body: JSON.stringify(productId),
    headers: getHeaders(true, true)
  }).then(res => res.json())
}

function removeProduct (productId) {
  return fetch(host + orderRoute + 'removeProduct', {
    method: 'POST',
    body: JSON.stringify(productId),
    headers: getHeaders(true, true)
  }).then(res => res.json())
}

function clearProducts () {
  return fetch(host + orderRoute + 'clearProducts', {
    method: 'POST',
    headers: getHeaders(true, true)
  }).then(res => res.json())
}

function submitOrder (address, products) {
  return fetch(host + orderRoute + 'submitOrder?address=' + address, {
    method: 'POST',
    body: JSON.stringify(products),
    headers: getHeaders(true, true)
  }).then(res => res.json())
}

const feedback = {
  moderatorQueue,
  moderatorHistory,
  employeeOrders,
  userPending,
  updateQueue,
  userQueue,
  userHistory,
  addProduct,
  removeProduct,
  clearProducts,
  submitOrder,
  details
}

export default feedback
