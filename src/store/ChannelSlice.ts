import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IChannel, IMessage, IRawMessage } from "../commonTypes"
import instance from "../services/axiosInstance"
import axios from "axios"


type initialStateType = {
    channels: IChannel[],
    status: "loading" | "failed" | "succeeded" | null,
    error: string | null
}

const initialState: initialStateType = {
    channels: [],
    status: null,
    error: null,
}

export const fetchChannels = createAsyncThunk<IChannel[] , undefined, {rejectValue: string}>(
    "channels/fetchChannels",
    async function (_, { rejectWithValue }) {
        try {
            const response = await instance.get('http://127.0.0.1:8000/api/channels',);
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

export const fetchMessages = createAsyncThunk<{
    channelId : number,
    messages : IRawMessage[]
} , number, {rejectValue: string}>(
    "channels/fetchMessages",
    async function (channelId, { rejectWithValue }) {
        try {
            const response = await instance.get(`http://127.0.0.1:8000/api/channels/${channelId}/messages`,);
            console.log(response);
            return {
                channelId : channelId,
                messages : response.data.data
            }
            // return response.data;
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


const channelsSlice = createSlice({
    name: "channels",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchChannels.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchChannels.fulfilled, (state, action) => {
                console.log(action);
                state.status = 'succeeded';
                state.channels = action.payload;
            })
            .addCase(fetchChannels.rejected, (state, action) => {
                console.log(action);
                state.status = 'failed';
                state.error = action.payload as string;
            })
            .addCase(fetchMessages.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchMessages.fulfilled, (state, action) => {
                console.log(action);
                const transformedMessages = action.payload.messages.map(message => ({
                    id: message.id,
                    user: {
                        id: message.user.id,
                        name: message.user.name
                    },
                    message: message.message,
                    createdAt: new Date(message.created_at) // Преобразование строки в объект Date
                }));
                
                state.status = 'succeeded';
                state.channels = state.channels.map(channel => {
                    if(channel.id == action.payload.channelId){
                        channel.messages = transformedMessages;

                    }
                    return channel;
                })
            })
            .addCase(fetchMessages.rejected, (state, action) => {
                console.log(action);
                state.status = 'failed';
                state.error = action.payload as string;
            })
            .addMatcher(isError, (state, action: PayloadAction<string>) => {
                state.error = action.payload;
                state.status = null;
            });
    },
    reducers : {
        
    }
})

function isError(action: AnyAction) {
    return action.type.endsWith('rejected');
  }

export default channelsSlice.reducer;