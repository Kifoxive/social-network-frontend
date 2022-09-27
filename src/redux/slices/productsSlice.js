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
export const fetchUserProducts = createAsyncThunk(
  "posts/fetchUserProducts",
  async (id) => {
    const { data } = await productsApi.getProductsByUser(id)
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
  oneProduct: {
    item: {},
    status: "loading",
  },
  allProducts: {
    items: [],
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
      state.allProducts.status = "loading"
      state.allProducts.items = []
    },
    [fetchMineProducts.fulfilled]: (state, action) => {
      state.allProducts.status = "loaded"
      state.allProducts.items = action.payload.products
    },
    [fetchMineProducts.rejected]: (state) => {
      state.allProducts.status = "error"
      state.allProducts.items = []
    },
    // get one product
    [fetchOneProduct.pending]: (state) => {
      state.oneProduct.status = "loading"
      state.oneProduct.item = {}
    },
    [fetchOneProduct.fulfilled]: (state, action) => {
      state.oneProduct.status = "loaded"
      state.oneProduct.item = action.payload.product
    },
    [fetchOneProduct.rejected]: (state) => {
      state.oneProduct.status = "error"
      state.oneProduct.item = {}
    },
    // get products by user
    [fetchUserProducts.pending]: (state) => {
      state.allProducts.status = "loading"
      state.allProducts.items = []
    },
    [fetchUserProducts.fulfilled]: (state, action) => {
      console.log(action.payload)
      state.allProducts.status = "loaded"
      state.allProducts.items = action.payload.products
    },
    [fetchUserProducts.rejected]: (state) => {
      state.allProducts.status = "error"
      state.allProducts.items = []
    },
  },
})

export const productsReducer = productsSlice.reducer
