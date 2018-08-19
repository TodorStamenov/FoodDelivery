import { host, getHeaders } from './common'

const feedbackRoute = 'api/feedbacks/'

function all (page) {
  return fetch(host + feedbackRoute + page, {
    method: 'GET',
    headers: getHeaders(true, true)
  }).then(res => res.json())
}

const feedback = { all }

export default feedback
