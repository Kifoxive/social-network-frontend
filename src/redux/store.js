import { configureStore } from "@reduxjs/toolkit"
import { postsReducer } from "./slices/postsSlice.js"
import { authReducer } from "./slices/authSlice.js"
import { itemsReducer } from "./slices/itemsSlice.js"
import { commentsReducer } from "./slices/commentsSlice.js"

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReducer,
    items: itemsReducer,
    comments: commentsReducer,
  },
})

export default store
