import { host, getHeaders } from './common'

const homeRoute = 'api/home/'

function index () {
  return fetch(host + homeRoute, {
    method: 'GET',
    headers: getHeaders(false, false)
  }).then(res => res.json())
}

const home = { index }

export default home
