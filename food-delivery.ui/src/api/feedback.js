import { host, getHeaders } from './common'

const feedbackRoute = 'api/feedbacks/'

function all (page) {
  return fetch(host + feedbackRoute + page, {
    method: 'GET',
    headers: getHeaders(true, true)
  }).then(res => res.json())
}

function add (productId, content, rate) {
  return fetch(host + feedbackRoute + productId, {
    method: 'POST',
    body: JSON.stringify({
      content,
      rate
    }),
    headers: getHeaders(true, true)
  }).then(res => res.json())
}

function rates () {
  return fetch(host + feedbackRoute + 'rates', {
    method: 'GET',
    headers: getHeaders(true, true)
  }).then(res => res.json())
}

const feedback = { all, add, rates }

export default feedback
