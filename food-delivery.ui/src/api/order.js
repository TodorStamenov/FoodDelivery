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

function userOrders (loadedElements) {
  return fetch(host + orderRoute + 'user/orders/' + loadedElements, {
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

const feedback = {
  moderatorQueue,
  moderatorHistory,
  employeeOrders,
  updateQueue,
  userOrders,
  details
}

export default feedback
