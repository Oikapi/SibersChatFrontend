import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../services/axiosInstance";
import axios from "axios";

interface userData {
    name :string | null,
    email : string | null,
}

interface initialStateType extends userData  {
    status : "loading" | "failed" | "succeeded" | null,
    error : string | null
}


const initialState:initialStateType = {
    name: null,
    email: null,
    status: null,
    error : null
}

export const fetchUser = createAsyncThunk<userData, undefined, {rejectValue : string}>(
    "user/getUser",
    async function (_, {rejectWithValue}) {
        try{
            const response = await instance.get('http://127.0.0.1:8000/api/user');
            return {
                name : response.data.name,
                email : response.data.email
            }
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


const userSlice = createSlice({
    name: "user",
    initialState,
    extraReducers: (builder) => {
        builder.
        addCase(fetchUser.pending, (state) => {
            state.status = 'loading';
            // state.error = null;
        })
        .addCase(fetchUser.fulfilled, (state, action) => {
            console.log(action);
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.status = 'succeeded';
        })
        .addCase(fetchUser.rejected, (state, action) => {
            console.log(action);
            state.status = 'failed';
            state.error = action.payload as string;
        });
    },
    reducers: {

    }
}
)

export default userSlice.reducer;