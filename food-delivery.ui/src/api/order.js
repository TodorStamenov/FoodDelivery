import { host, getHeaders } from './common'

const feedbackRoute = 'api/orders/'

function queue () {
  return fetch(host + feedbackRoute + 'queue', {
    method: 'GET',
    headers: getHeaders(true, true)
  }).then(res => res.json())
}

function history () {
  return fetch(host + feedbackRoute + 'history', {
    method: 'GET',
    headers: getHeaders(true, true)
  }).then(res => res.json())
}

const feedback = { queue, history }

export default feedback
