import host from './constants'
const categoryRoute = 'api/categories/'

function all () {
  return fetch(host + categoryRoute, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('authtoken')
    }
  }).then(res => res.json())
}

const moderator = { all }

export default moderator
