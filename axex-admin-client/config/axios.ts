import axios, { AxiosError } from "axios"
import config from "../../src/config/config"
import clearLocalStorage from "../contexts/auth"

axios.defaults.baseURL = config.server.apiUrl
axios.defaults.headers.post["Content-Type"] = "application/json"
axios.defaults.withCredentials = true

axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      clearLocalStorage()
      window.location.reload()
    }
    return Promise.reject(error)
  },
)
