import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { itemsApi } from "../../api/api"

export const fetchMineItems = createAsyncThunk(
  "items/fetchGetMine",
  async () => {
    const { data } = await itemsApi.getMine()
    return data
  }
)

const initialState = {
  myItems: {
    items: [],
    status: "loading",
  },
}

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {},
  extraReducers: {
    // get my items
    [fetchMineItems.pending]: (state) => {
      state.myItems.status = "loading"
      state.myItems.items = []
    },
    [fetchMineItems.fulfilled]: (state, action) => {
      state.myItems.status = "loaded"
      state.myItems.items = action.payload
    },
    [fetchMineItems.rejected]: (state) => {
      state.myItems.status = "error"
      state.myItems.items = []
    },
  },
})

export const itemsReducer = itemsSlice.reducer
