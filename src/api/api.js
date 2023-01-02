import axios from "axios";

export const API_URL = "http://localhost:3001";

const instance = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});
instance.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get(`${API_URL}/auth/refresh`, {
          withCredentials: true,
        });
        localStorage.setItem("token", response.data.accessToken);
        return instance.request(originalRequest);
      } catch (e) {
        console.log("Not authorized");
      }
    }
    throw error;
  }
);

export const postsApi = {
  getPosts() {
    return instance.get(`posts`);
  },
  getMine() {
    return instance.get("posts/mine");
  },
  sendImage(formData) {
    return instance.post(`upload`, formData);
  },
  sendPost(fields) {
    return instance.post(`posts`, fields);
  },
  getOnePost(id) {
    return instance.get(`posts/${id}`);
  },
  getPostsByUser(id) {
    return instance.get(`users/${id}/posts`);
  },
  removePost(id) {
    return instance.delete(`posts/${id}`);
  },
  updatePost(fields) {
    return instance.patch(`posts/${fields.id}`, fields);
  },
};

export const authApi = {
  register(params) {
    return instance.post(`auth/register`, params);
  },
  login(params) {
    return instance.post(`auth/login`, params);
  },
  me() {
    return instance.get(`auth/me`);
  },
  updateProfile(fields) {
    return instance.patch(`auth/update`, fields);
  },
  async changePassword(params) {
    const a = await instance
      .patch(`auth/change-password`, params)
      .catch(function (error) {
        throw new Error(error.response.data.message);
      });
    return a;
  },
};

export const productsApi = {
  sendProduct(fields) {
    return instance.post(`products`, fields);
  },
  getProducts() {
    return instance.get(`products`);
  },
  getMine() {
    return instance.get(`products/mine`);
  },
  getOneProduct(id) {
    return instance.get(`products/${id}`);
  },
  getProductsByUser(id) {
    return instance.get(`users/${id}/products`);
  },
  updateProduct(fields) {
    return instance.patch(`products/${fields.id}`, fields);
  },
  removeProduct(id) {
    return instance.delete(`products/${id}`);
  },
};

export const commentsApi = {
  getComments(id) {
    return instance.get(`comments/${id}`);
  },
  sendComment(fields) {
    return instance.post(`comments`, fields);
  },
  removeComment(params) {
    return instance.delete(`comments/${params.id}`, {
      data: { product: params.product },
    });
  },
};

export const usersApi = {
  getOneUser(id) {
    return instance.get(`users/${id}`);
  },
  getByName(name) {
    return instance.get(`users/search?name=${name}`);
  },
  getFriends(id) {
    return instance.get(`users/${id}/friends`);
  },
};
