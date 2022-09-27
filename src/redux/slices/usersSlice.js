import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { usersApi } from "../../api/api"

export const fetchOneUser = createAsyncThunk(
  "users/fetchOneUser",
  async (id) => {
    const { data } = await usersApi.getOneUser(id)
    return data
  }
)
export const fetchUsersByName = createAsyncThunk(
  "users/fetchUsersByName",
  async (name) => {
    const { data } = await usersApi.getByName(name)
    return data
  }
)
export const fetchUpdateUser = createAsyncThunk(
  "users/fetchUpdateUser",
  async (fields) => {
    const { data } = await usersApi.updateProfile(fields)
    return data
  }
)

const initialState = {
  allUsers: {
    items: [],
    status: "loading",
  },
  oneUser: {
    item: {},
    status: "loading",
  },
}

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    // get one user
    [fetchOneUser.pending]: (state) => {
      state.oneUser.status = "loading"
    },
    [fetchOneUser.fulfilled]: (state, action) => {
      state.oneUser.status = "loaded"
      state.oneUser.item = action.payload
    },
    [fetchOneUser.rejected]: (state) => {
      state.oneUser.status = "error"
    },
    // get users by name
    [fetchUsersByName.pending]: (state) => {
      state.allUsers.status = "loading"
    },
    [fetchUsersByName.fulfilled]: (state, action) => {
      state.allUsers.status = "loaded"
      state.allUsers.items = action.payload
    },
    [fetchUsersByName.rejected]: (state) => {
      state.allUsers.status = "error"
    },
  },
})

export const usersReducer = usersSlice.reducer
