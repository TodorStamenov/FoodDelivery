import { host, getHeaders } from './common'

const orderRoute = 'api/orders/'

function queue (loadedElements) {
  return fetch(host + orderRoute + 'queue/' + loadedElements, {
    method: 'GET',
    headers: getHeaders(true, true)
  }).then(res => res.json())
}

function history (loadedElements) {
  return fetch(host + orderRoute + 'history/' + loadedElements, {
    method: 'GET',
    headers: getHeaders(true, true)
  }).then(res => res.json())
}

function employeeOrders () {
  return fetch(host + orderRoute + 'employeeQueue', {
    method: 'GET',
    headers: getHeaders(true, true)
  }).then(res => res.json())
}

function updateQueue (orders) {
  return fetch(host + orderRoute + 'updateQueue', {
    method: 'POST',
    headers: getHeaders(true, true),
    body: JSON.stringify(orders)
  }).then(res => res.json())
}

const feedback = { queue, history, employeeOrders, updateQueue }

export default feedback
