import host from './constants'
const adminRoute = 'api/users/'

function all (username) {
  return fetch(host + adminRoute + 'all?username=' + (username || ''), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('authtoken')
    }
  }).then(res => res.json())
}

function lock (username) {
  return fetch(host + adminRoute + 'lock?username=' + (username || ''), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('authtoken')
    }
  }).then(res => res.json())
}

function unlock (username) {
  return fetch(host + adminRoute + 'unlock?username=' + (username || ''), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('authtoken')
    }
  }).then(res => res.json())
}

function addRole (username, roleName) {
  return fetch(host + adminRoute + 'addRole?username=' + (username || '') + '&roleName=' + (roleName || ''), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('authtoken')
    }
  }).then(res => res.json())
}

function removeRole (username, roleName) {
  return fetch(host + adminRoute + '/removeRole?username=' + (username || '') + '&roleName=' + (roleName || ''), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('authtoken')
    }
  }).then(res => res.json())
}

const admin = { all, lock, unlock, addRole, removeRole }

export default admin
