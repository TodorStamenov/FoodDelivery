import { host, getHeaders } from './common'
const accountRoute = 'api/account/'

function register (email, password, confirmPassword) {
  return fetch(host + accountRoute + 'register', {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
      confirmPassword
    }),
    headers: getHeaders(false, true)
  }).then(res => res.json())
}

function login (email, password) {
  return fetch(host + accountRoute + 'login', {
    method: 'POST',
    body: JSON.stringify({
      email,
      password
    }),
    headers: getHeaders(false, true)
  }).then(res => res.json())
}

function logout () {
  return fetch(host + accountRoute + 'logout', {
    method: 'POST',
    headers: getHeaders(true, false)
  }).then(res => res.json())
}

function changePassword (oldPassword, newPassword, confirmPassword) {
  return fetch(host + accountRoute + 'changePassword', {
    method: 'POST',
    body: JSON.stringify({
      oldPassword,
      newPassword,
      confirmPassword
    }),
    headers: getHeaders(true, true)
  }).then(res => res.json())
}

const auth = { register, login, logout, changePassword }

export default auth
