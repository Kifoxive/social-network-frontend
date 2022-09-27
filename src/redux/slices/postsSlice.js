import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { postsApi } from "../../api/api"

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const { data } = await postsApi.getPosts()
  return data
})
export const fetchAddImage = createAsyncThunk(
  "posts/fetchAddImage",
  async (formData) => {
    const { data } = await postsApi.sendImage(formData)
    return data
  }
)
export const fetchSendPost = createAsyncThunk(
  "posts/fetchSendPost",
  async (fields) => {
    const { data } = await postsApi.sendPost(fields)
    return data
  }
)
export const fetchMinePosts = createAsyncThunk("posts/fetchMine", async () => {
  const { data } = await postsApi.getMine()
  return data
})
export const fetchOnePost = createAsyncThunk(
  "posts/fetchOnePost",
  async (id) => {
    const { data } = await postsApi.getOnePost(id)
    return data
  }
)
export const fetchUserPosts = createAsyncThunk(
  "posts/fetchUserPosts",
  async (id) => {
    const { data } = await postsApi.getPostsByUser(id)
    return data
  }
)
export const fetchRemovePost = createAsyncThunk(
  "posts/fetchRemovePosts",
  async (id) => {
    const { data } = await postsApi.removePost(id)
    return data
  }
)
export const fetchUpdatePost = createAsyncThunk(
  "posts/fetchUpdatePost",
  async (fields) => {
    const { data } = await postsApi.updatePost(fields)
    return data
  }
)

const initialState = {
  allPosts: {
    items: [],
    status: "loading",
  },
  onePost: {
    item: {},
    status: "loading",
  },
  myPosts: {
    items: [],
    status: "loading",
  },
}

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    // get posts
    [fetchPosts.pending]: (state) => {
      state.allPosts.status = "loading"
      state.allPosts.items = []
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.allPosts.status = "loaded"
      state.allPosts.items = action.payload.posts
    },
    [fetchPosts.rejected]: (state) => {
      state.allPosts.status = "error"
      state.allPosts.items = []
    },
    // get my posts
    [fetchMinePosts.pending]: (state) => {
      state.myPosts.status = "loading"
      state.myPosts.items = []
    },
    [fetchMinePosts.fulfilled]: (state, action) => {
      state.myPosts.status = "loaded"
      state.myPosts.items = action.payload.posts
    },
    [fetchMinePosts.rejected]: (state) => {
      state.myPosts.status = "error"
      state.myPosts.items = []
    },
    // get one post
    [fetchOnePost.pending]: (state) => {
      state.onePost.status = "loading"
      state.onePost.item = {}
    },
    [fetchOnePost.fulfilled]: (state, action) => {
      state.onePost.status = "loaded"
      state.onePost.item = action.payload.post
    },
    [fetchOnePost.rejected]: (state) => {
      state.onePost.status = "error"
      state.onePost.item = {}
    },
    // get posts by user
    [fetchUserPosts.pending]: (state) => {
      state.allPosts.status = "loading"
      state.allPosts.items = []
    },
    [fetchUserPosts.fulfilled]: (state, action) => {
      state.allPosts.status = "loaded"
      state.allPosts.items = action.payload.posts
    },
    [fetchUserPosts.rejected]: (state) => {
      state.allPosts.status = "error"
      state.allPosts.items = []
    },
    // remove post
    [fetchRemovePost.pending]: (state, action) => {
      state.myPosts.status = "loading"
    },
    [fetchRemovePost.fulfilled]: (state, action) => {
      state.myPosts.status = "loaded"
      if (action.payload.success) {
        state.myPosts.items = state.myPosts.items.filter(
          (item) => item._id !== action.meta.arg
        )
      }
    },
    [fetchRemovePost.rejected]: (state) => {
      state.allPosts.status = "error"
      state.allPosts.items = []
    },
  },
})

export const postsReducer = postsSlice.reducer
