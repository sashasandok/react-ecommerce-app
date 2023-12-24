const apiBaseUrl = 'http://localhost:3001/api/'

const apiUrl = (endpoint: string) => apiBaseUrl + endpoint

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
}

export const get = (endpoint: string) =>
  fetch(apiUrl(endpoint), {
    method: 'GET',
    headers,
    credentials: 'include',
  }).then((response) => response.json())

export const post = (endpoint: string, { ...args }) =>
  fetch(apiUrl(endpoint), {
    method: 'POST',
    headers,
    credentials: 'include',
    body: JSON.stringify(args),
  })
    .then((response) => {
      return response.json()
    })
    .then((data) => data)

export const put = (endpoint: string, { ...args }) =>
  fetch(apiUrl(endpoint), {
    method: 'PUT',
    headers,
    credentials: 'include',
    body: JSON.stringify(args),
  }).then((response) => response.json())

export const del = (endpoint: string) =>
  fetch(apiUrl(endpoint), {
    method: 'DELETE',
    headers,
    credentials: 'include',
  }).then((response) => response.status === 200)
