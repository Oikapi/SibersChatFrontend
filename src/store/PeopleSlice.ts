import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {IUser} from "../commonTypes/index"
import instance from "../services/axiosInstance";
import axios from "axios";

type initialState = {
    people : IUser[],
    status: "loading" | "failed" | "succeeded" | null,
    error: string | null
}

const initialState:initialState = {
    people : [],
    status : null,
    error : null
}
export const searchPeople = createAsyncThunk<IUser[] ,string, {rejectValue: string}>(
    "people/fetchPeople",
    async function (query, { rejectWithValue }) {
        try {
            const response = await instance.get(`http://127.0.0.1:8000/api/search-users?query=${query}`);
            console.log(response);
            return response.data;
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



const peopleSlice = createSlice({
    name : "people",
    initialState,
    reducers : {
    
    },
    extraReducers : (builder) => {
        builder
        .addCase(searchPeople.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(searchPeople.fulfilled, (state, action) => {
            console.log(action);
            state.status = 'succeeded';
            state.people = action.payload;
        })
        .addCase(searchPeople.rejected, (state, action) => {
            console.log(action);
            state.status = 'failed';
            state.error = action.payload as string;
        })
    }
}
)

export default peopleSlice.reducer;