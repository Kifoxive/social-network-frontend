import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { itemsApi } from "../../api/api"

export const fetchMineItems = createAsyncThunk(
  "items/fetchGetMine",
  async () => {
    const { data } = await itemsApi.getMine()
    return data
  }
)
export const fetchOneItem = createAsyncThunk(
  "items/fetchOneItem",
  async (id) => {
    const { data } = await itemsApi.getOneItem(id)
    return data
  }
)
export const fetchRemoveItem = createAsyncThunk(
  "items/fetchRemoveItem",
  async (id) => {
    const { data } = await itemsApi.removeItem(id)
    return data
  }
)
export const fetchSendItem = createAsyncThunk(
  "items/fetchSendItem",
  async (fields) => {
    const { data } = await itemsApi.sendItem(fields)
    return data
  }
)
export const fetchUpdateItem = createAsyncThunk(
  "items/fetchUpdateItem",
  async (id) => {
    const { data } = await itemsApi.updateItem(id)
    return data
  }
)

const initialState = {
  myItems: {
    items: [],
    status: "loading",
  },
  currentItem: {
    item: {},
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
      state.myItems.items = action.payload.items
    },
    [fetchMineItems.rejected]: (state) => {
      state.myItems.status = "error"
      state.myItems.items = []
    },

    // get one item
    [fetchOneItem.pending]: (state) => {
      state.currentItem.status = "loading"
      state.currentItem.item = {}
    },
    [fetchOneItem.fulfilled]: (state, action) => {
      state.currentItem.status = "loaded"
      state.currentItem.item = action.payload
    },
    [fetchOneItem.rejected]: (state) => {
      state.currentItem.status = "error"
      state.currentItem.item = {}
    },
  },
})

export const itemsReducer = itemsSlice.reducer
