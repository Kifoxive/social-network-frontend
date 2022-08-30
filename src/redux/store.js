import { configureStore } from "@reduxjs/toolkit"
import { postsReducer } from "./slices/postsSlice.js"
import { authReducer } from "./slices/authSlice.js"
import { itemsReducer } from "./slices/itemsSlice.js"

export const store = configureStore({
  reducer: { posts: postsReducer, auth: authReducer, items: itemsReducer },
})

export default store
