import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService.js'


// use this function in registerPage
export const register = createAsyncThunk("users/register", async (inputValues, thunkAPI)=>{
    try {
      const response = await authService.registerUser(inputValues);
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

// use this function in loginPage
export const login = createAsyncThunk("users/login", async (inputValues, thunkAPI)=>{
  try {
    const response = await authService.loginUser(inputValues);
    window.localStorage.setItem("user", JSON.stringify(response));
      return response;
  } catch (error) {
      return thunkAPI.rejectWithValue(error);
  }
});

// getting this function in Categories
export const getUsers  = createAsyncThunk("users/getUsers", async (thunkAPI)=>{
  try {
    const response = await authService.getAllUser();
      return response;
  } catch (error) {
      return thunkAPI.rejectWithValue(error);
  }
});



// use this function in logout - DashboardLayout
export const logout = createAsyncThunk("users/logout", async (thunkAPI)=>{
  try {
    const response = await authService.logoutUser();
    window.localStorage.removeItem("user");
      return response;
  } catch (error) {
      return thunkAPI.rejectWithValue(error);
  }
});

// Use this function for deleting categories
export const DeleteUser  = createAsyncThunk("users/DeleteUser", async (userId, thunkAPI)=>{
  try {
    const response = await authService.deleteUse(userId);
      return response;
  } catch (error) {
      return thunkAPI.rejectWithValue(error);
  }
});

const getUserDataFromLocalStorage = window.localStorage.getItem("user") ? JSON.parse(window.localStorage.getItem("user")) : null;

const initialState = {
  user: getUserDataFromLocalStorage,
  status: "idle",
  error: null,
};

// user this export in store file, authReducer

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    incrementByAmount: (state, action) => {
    state.value += action.payload
  },
},

extraReducers: (builder) => {
  builder
  .addCase(register.pending,(state) => {
    state.status = "loading";
    state.error = null;
  }).addCase(register.fulfilled,(state, action) => {
    state.status = "success";
    state.user = action.payload
  }).addCase(register.rejected,(state, action) => {
    state.status = "failed";
    state.user = action.payload
  })
  .addCase(login.pending,(state) => {
    state.status = "loading";
    state.error = null;
  }).addCase(login.fulfilled,(state, action) => {
    state.status = "success";
    state.user = action.payload
  }).addCase(login.rejected,(state, action) => {
    state.status = "failed";
    state.user = action.payload
  })
  .addCase(getUsers.pending,(state) => {
    state.status = "loading";
    state.error = null;
  }).addCase(getUsers.fulfilled,(state) => {
    state.status = "success";
    state.user = action.payload.users;;
  }).addCase(getUsers.rejected,(state, action) => {
    state.status = "failed";
    state.user = action.payload
  })
  .addCase(logout.pending,(state) => {
    state.status = "loading";
    state.error = null;
  }).addCase(logout.fulfilled,(state) => {
    state.status = "success";
    state.user = null;
  }).addCase(logout.rejected,(state, action) => {
    state.status = "failed";
    state.user = action.payload
  })
  .addCase(DeleteUser.pending,(state) => {
    state.status = "loading";
    state.error = null;
  }).addCase(DeleteUser.fulfilled,(state) => {
    state.status = "success";
    state.user = null;
  }).addCase(DeleteUser.rejected,(state, action) => {
    state.status = "failed";
    state.user = action.payload
  })
}

})

// Action creators are generated for each case reducer function
export const { incrementByAmount  } = authSlice.actions

export default authSlice.reducer