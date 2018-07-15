import host from './constants'

function register (email, password, confirmPassword) {
  return fetch(host + 'api/account/register', {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
      confirmPassword
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
}

function login (username, password) {
  return fetch(host + 'token', {
    method: 'POST',
    body: `grant_type=password&username=${username}&password=${password}`,
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
}

function logout () {
  return fetch(host + 'api/account/logout', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + sessionStorage.getItem('authtoken')
    }
  })
}

function getRoles () {
  return fetch(host + 'api/account/roles', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + sessionStorage.getItem('authtoken')
    }
  }).then(res => res.json())
}

const auth = { register, login, logout, getRoles }

export default auth
