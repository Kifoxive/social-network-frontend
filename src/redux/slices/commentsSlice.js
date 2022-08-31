import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { commentsApi } from "../../api/api"

export const fetchComments = createAsyncThunk(
  "items/fetchGetMine",
  async (id) => {
    const { data } = await commentsApi.getComments(id)
    return data
  }
)

const initialState = {
  items: [],
  status: "loading",
}

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: {
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
  },
})

export const commentsReducer = commentsSlice.reducer
