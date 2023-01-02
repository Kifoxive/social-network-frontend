import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "../../api/api";

export const fetchLogin = createAsyncThunk(
  "auth/fetchUserData",
  async (params) => {
    const { data } = await authApi.login(params);
    if (data) {
      window.localStorage.setItem("token", data.accessToken);
    }
    return data;
  }
);
export const fetchAuthMe = createAsyncThunk("auth/fetchAuthMe", async () => {
  const { data } = await authApi.me();
  return data;
});
export const fetchRegister = createAsyncThunk(
  "auth/fetchRegister",
  async (params) => {
    const { data } = await authApi.register(params);
    if (data) {
      window.localStorage.setItem("token", data.accessToken);
    }
    return data;
  }
);
export const fetchUpdatePassword = createAsyncThunk(
  "auth/fetchUpdatePassword",
  async (params) => {
    const { data } = await authApi.changePassword(params);
    return data;
  }
);
export const fetchUpdateUser = createAsyncThunk(
  "users/fetchUpdateUser",
  async (fields) => {
    const { data } = await authApi.updateProfile(fields);
    return data;
  }
);

const initialState = {
  data: null,
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
      window.localStorage.removeItem("token");
    },
  },
  extraReducers: {
    // login
    [fetchLogin.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchLogin.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload.user;
    },
    [fetchLogin.rejected]: (state) => {
      state.status = "error";
      state.data = null;
    },
    // auth me
    [fetchAuthMe.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchAuthMe.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    },
    [fetchAuthMe.rejected]: (state) => {
      state.status = "error";
      state.data = null;
    },
    // register
    [fetchRegister.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchRegister.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload.user;
    },
    [fetchRegister.rejected]: (state) => {
      state.status = "error";
      state.data = null;
    },
    // update profile
    [fetchUpdateUser.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchUpdateUser.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    },
    [fetchUpdateUser.rejected]: (state) => {
      state.status = "error";
      state.data = null;
    },
  },
});

export const selectIsAuth = (state) => Boolean(state.auth.data);

export const authReducer = authSlice.reducer;
export const { logout } = authSlice.actions;
