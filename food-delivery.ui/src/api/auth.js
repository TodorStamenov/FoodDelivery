const host = 'http://localhost:22011/'

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

const auth = { register, login, logout }

export default auth
