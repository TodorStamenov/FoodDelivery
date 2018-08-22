import { host, getHeaders } from './common'

const feedbackRoute = 'api/orders/'

function queue (loadedElements) {
  return fetch(host + feedbackRoute + 'queue/' + loadedElements, {
    method: 'GET',
    headers: getHeaders(true, true)
  }).then(res => res.json())
}

function history (loadedElements) {
  return fetch(host + feedbackRoute + 'history/' + loadedElements, {
    method: 'GET',
    headers: getHeaders(true, true)
  }).then(res => res.json())
}

const feedback = { queue, history }

export default feedback
