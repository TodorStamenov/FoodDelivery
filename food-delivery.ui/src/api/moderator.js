import host from './constants'
const moderatorRoute = 'api/moderator/'

function categories () {
  return fetch(host + moderatorRoute + 'category', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('authtoken')
    }
  }).then(res => res.json())
}

function destroy (id) {
  return fetch(host + moderatorRoute + 'category/' + id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('authtoken')
    }
  }).then(res => res.json())
}

const moderator = { categories, destroy }

export default moderator
