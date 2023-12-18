import axios from 'axios'
export const axiosApiInstance = axios.create({
  baseURL: 'http://localhost:3001/',
})

const refreshAccessToken = async () => {
  return await axios.get(`auth/refresh`).then((data) => data)
}

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async (config: any) => {
    const access_token = localStorage.getItem('access_token')

    config.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    }

    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`
    }

    return config
  },
  (error) => {
    Promise.reject(error)
  },
)
// Response interceptor for API calls
axiosApiInstance.interceptors.response.use(
  (response) => {
    return response
  },
  async function (error) {
    const originalRequest = error.config
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true
      const access_token = await refreshAccessToken()
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token
      return axiosApiInstance(originalRequest)
    }
    if (error.response.status === 400 || error.response.status === 404) {
      return error.response
    }
    return Promise.reject(error)
  },
)
