import { configureStore } from "@reduxjs/toolkit"
import { postsReducer } from "./slices/postsSlice.js"
import { authReducer } from "./slices/authSlice.js"
import { productsReducer } from "./slices/productsSlice.js"
import { commentsReducer } from "./slices/commentsSlice.js"
import { usersReducer } from "./slices/usersSlice.js"

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReducer,
    products: productsReducer,
    comments: commentsReducer,
    users: usersReducer,
  },
})

export default store
