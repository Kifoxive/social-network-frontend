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
  getMine() {
    return instance.get("posts/mine")
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

export const productsApi = {
  sendProduct(fields) {
    return instance.post(`products`, fields)
  },
  getProducts() {
    return instance.get(`products`)
  },
  getMine() {
    return instance.get(`products/mine`)
  },
  getOneProduct(id) {
    return instance.get(`products/${id}`)
  },
  // getProductsByTag(name) {
  //   return instance.get(`products/`, { params: { tag: name } })
  // },
  updateProduct(fields) {
    return instance.patch(`products/${fields.id}`, fields)
  },
  removeProduct(id) {
    return instance.delete(`products/${id}`)
  },
}

export const commentsApi = {
  getComments(id) {
    return instance.get(`comments/${id}`)
  },
  sendComment(fields) {
    return instance.post(`comments`, fields)
  },
  removeComment(params) {
    return instance.delete(`comments/${params.id}`, {
      data: { product: params.product },
    })
  },
}
