import axios from "axios";

export const unsplashApi = axios.create({
  baseURL: 'https://api.unsplash.com'
})

unsplashApi.interceptors.request.use(config => {
  config.headers.Authorization = `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`

  return config
})