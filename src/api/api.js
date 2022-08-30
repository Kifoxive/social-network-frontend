import axios from "axios"

const instance = axios.create({
  baseURL: "http://localhost:3001/",
})

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("token")
  return config
})

export const postsApi = {
  getPosts() {
    return instance.get(`posts`)
  },
  sendImage(formData) {
    return instance.post(`upload`, formData)
  },
  sendPost(fields) {
    return instance.post(`posts`, fields)
  },
  getOnePost(id) {
    return instance.get(`posts/${id}`)
  },
  removePost(id) {
    return instance.delete(`posts/${id}`)
  },
  updatePost(fields) {
    return instance.patch(`posts/${fields.id}`, fields)
  },
}

export const authApi = {
  register(params) {
    return instance.post(`auth/register`, params)
  },
  login(params) {
    return instance.post(`auth/login`, params)
  },
  me() {
    return instance.get("auth/me")
  },
}

export const itemsApi = {
  sendItem(fields) {
    return instance.post(`items`, fields)
  },
  getItems() {
    return instance.get(`items`)
  },
  getMine() {
    return instance.get(`items/mine`)
  },
  getOneItem(id) {
    return instance.get(`items/${id}`)
  },
  updateItem(fields) {
    return instance.patch(`items/${fields.id}`, fields)
  },
  removeItem(id) {
    return instance.delete(`items/${id}`)
  },
}
