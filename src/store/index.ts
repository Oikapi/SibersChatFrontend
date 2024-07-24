import { configureStore,Store } from '@reduxjs/toolkit';
import authReducer from './AuthSlice';
import userReducer from './UserSlice'
import channelsReducer from './ChannelSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    channels : channelsReducer
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;