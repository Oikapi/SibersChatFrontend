import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import instance from '../services/axiosInstance';
import { userLoginData } from '../commonTypes';
import axios, { AxiosError } from 'axios';

interface AuthState {
  isAuthenticated : boolean,
  user : string | null,
  status : "loading" | "failed" | "succeeded" | null,
  error : string | null
}

const initialState: AuthState = {
  isAuthenticated : false,
  user : null,
  status : null,
  error : null,
};

export const signIn = createAsyncThunk<string , userLoginData, {rejectValue: string}>(
  "auth/signIn",
  async function (user, {rejectWithValue}) {

    try{
      const response = await instance.post('http://127.0.0.1:8000/api/auth',
        {
          email : user.email,
          password : user.password,
        }
      );
      console.log(response);
      return response.data.token;
    }
    catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
        return rejectWithValue(error.response?.data.message);
      } else {
        return rejectWithValue("different error than axios");
      }
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    removeToken: (state) => {
      state.isAuthenticated = false;
      // state.token = null;
      // Cookies.remove('authToken');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.status = 'loading';
        // state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        console.log(action);
        state.status = 'succeeded';
        state.isAuthenticated = true;
        state.user = action.payload;
        Cookies.set('authToken', action.payload);
      })
      .addCase(signIn.rejected, (state, action) => {
        console.log(action);
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.status = null;
      });
  },
}); 

export const { setToken, removeToken } = authSlice.actions;

export default authSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}