const host = 'http://localhost:22011/'

const getHeaders = function (token, json) {
  let header = {}

  if (token) {
    header['Authorization'] = 'Bearer ' + sessionStorage.getItem('authtoken')
  }

  if (json) {
    header['Content-Type'] = 'application/json'
  }

  return header
}

export { host, getHeaders }
