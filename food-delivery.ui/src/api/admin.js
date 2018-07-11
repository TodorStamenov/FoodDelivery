const host = 'http://localhost:22011/'

function users () {
  return fetch(host + 'api/admin/users', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('authtoken')
    }
  }).then(res => res.json())
}

const admin = { users }

export default admin
