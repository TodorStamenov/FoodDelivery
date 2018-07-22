import host from './constants'
const accountRoute = 'api/account/'

function register (email, password, confirmPassword) {
  return fetch(host + accountRoute + 'register', {
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

function login (email, password) {
  return fetch(host + accountRoute + 'login', {
    method: 'POST',
    body: JSON.stringify({
      email,
      password
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
}

function logout () {
  return fetch(host + accountRoute + 'logout', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + sessionStorage.getItem('authtoken')
    }
  })
}

const auth = { register, login, logout }

export default auth
