import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { productsApi } from "../../api/api"

export const fetchMineProducts = createAsyncThunk(
  "products/fetchGetMine",
  async () => {
    const { data } = await productsApi.getMine()
    return data
  }
)
export const fetchOneProduct = createAsyncThunk(
  "products/fetchOneProduct",
  async (id) => {
    const { data } = await productsApi.getOneProduct(id)
    return data
  }
)
export const fetchRemoveProduct = createAsyncThunk(
  "products/fetchRemoveProduct",
  async (id) => {
    const { data } = await productsApi.removeProduct(id)
    return data
  }
)
export const fetchSendProduct = createAsyncThunk(
  "products/fetchSendProduct",
  async (fields) => {
    const { data } = await productsApi.sendProduct(fields)
    return data
  }
)
export const fetchUpdateProduct = createAsyncThunk(
  "products/fetchUpdateProduct",
  async (id) => {
    const { data } = await productsApi.updateProduct(id)
    return data
  }
)

const initialState = {
  myProducts: {
    items: [],
    status: "loading",
  },
  currentProduct: {
    item: {},
    status: "loading",
  },
}

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: {
    // get my products
    [fetchMineProducts.pending]: (state) => {
      state.myProducts.status = "loading"
      state.myProducts.items = []
    },
    [fetchMineProducts.fulfilled]: (state, action) => {
      state.myProducts.status = "loaded"
      state.myProducts.items = action.payload.products
    },
    [fetchMineProducts.rejected]: (state) => {
      state.myProducts.status = "error"
      state.myProducts.items = []
    },

    // get one product
    [fetchOneProduct.pending]: (state) => {
      state.currentProduct.status = "loading"
      state.currentProduct.item = {}
    },
    [fetchOneProduct.fulfilled]: (state, action) => {
      state.currentProduct.status = "loaded"
      state.currentProduct.item = action.payload
    },
    [fetchOneProduct.rejected]: (state) => {
      state.currentProduct.status = "error"
      state.currentProduct.item = {}
    },
  },
})

export const productsReducer = productsSlice.reducer
