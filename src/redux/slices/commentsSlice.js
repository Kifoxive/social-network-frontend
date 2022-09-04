import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { commentsApi } from "../../api/api"

export const fetchComments = createAsyncThunk(
  "comments/fetchGetComments",
  async (id) => {
    const { data } = await commentsApi.getComments(id)
    return data
  }
)
export const fetchSendComment = createAsyncThunk(
  "comments/fetchSendComment",
  async (fields) => {
    const { data } = await commentsApi.sendComment(fields)
    return data
  }
)
export const fetchRemoveComment = createAsyncThunk(
  "comments/fetchRemoveComment",
  async (params) => {
    const { data } = await commentsApi.removeComment(params)
    return data
  }
)

const initialState = {
  items: [],
  status: "loading",
  isDisabled: false,
}

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: {
    // send comments
    [fetchSendComment.pending]: (state) => {
      state.isDisabled = true
    },
    [fetchSendComment.fulfilled]: (state) => {
      state.isDisabled = false
    },
    [fetchSendComment.rejected]: (state) => {
      state.isDisabled = false
    },
    // get my comments
    [fetchComments.pending]: (state) => {
      state.status = "loading"
      state.items = []
    },
    [fetchComments.fulfilled]: (state, action) => {
      state.status = "loaded"
      state.items = action.payload
    },
    [fetchComments.rejected]: (state) => {
      state.status = "error"
      state.items = []
    },
    // remove comments
    [fetchRemoveComment.pending]: (state) => {},
    [fetchRemoveComment.fulfilled]: (state, action) => {
      if (action.payload.success) {
        state.items = state.items.filter(
          (item) => item._id !== action.meta.arg.id
        )
      }
    },
    [fetchRemoveComment.rejected]: (state) => {
      state.items = []
    },
  },
})

export const commentsReducer = commentsSlice.reducer
