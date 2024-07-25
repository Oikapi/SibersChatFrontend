import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IChannel, IMessage, IMessageWChannelId, IRawMessage, IUser } from "../commonTypes"
import instance from "../services/axiosInstance"
import axios from "axios"


type rawMessage = {
    channelId : number,
    message : string
}

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

export const fetchMembers = createAsyncThunk<
{
    channelId : number,
    members : IUser[]
}, number, {rejectValue: string}>(
    "channels/fetchMembers",
    async function (channelId, { rejectWithValue }) {
        try {
            const response = await instance.get(`http://127.0.0.1:8000/api/channels/${channelId}/members`);
            console.log(response);
            return {
                channelId : channelId,
                members : response.data
            }
            ;
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

export const sendMessage = createAsyncThunk<string, rawMessage, {rejectValue: string}>(
    "channels/sendMessage",
    async function (messageData, { rejectWithValue }) {
        try {
            const response = await instance.post(`http://127.0.0.1:8000/api/messages`,
                {
                    channel_id : messageData.channelId,
                    message : messageData.message    
                }
            );
            console.log(response);
            return response.data
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
    reducers : {
        getMessage: (state, action: PayloadAction<
            {
                message : any,  // Костыль
                channel_id : number,
            }>) => {
            state.channels = state.channels.map(channel => {
                if(channel.id == action.payload.channel_id){
                    const message = action.payload.message
                    const newMessage:IMessage = {
                        id : message.id,
                        user : message.user,
                        message : message.message,
                        createdAt : new Date(message.created_at),
                    }
                    channel.messages.push(newMessage);
                }
                return channel;
            })
          },
    },
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
            .addCase(fetchMembers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchMembers.fulfilled, (state, action) => {
                console.log(action);
                state.status = 'succeeded';
                state.channels = state.channels.map(channel => {
                    if(channel.id == action.payload.channelId){
                        channel.members = action.payload.members;
                    }
                    return channel;
                })
                console.log(state.channels)
            })
            .addCase(fetchMembers.rejected, (state, action) => {
                console.log(action);
                state.status = 'failed';
                state.error = action.payload as string;
            })
            .addMatcher(isError, (state, action: PayloadAction<string>) => {
                state.error = action.payload;
                state.status = null;
            })
        },
})

export const { getMessage } = channelsSlice.actions;

function isError(action: AnyAction) {
    return action.type.endsWith('rejected');
  }


export default channelsSlice.reducer;