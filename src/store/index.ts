import { configureStore,Store } from '@reduxjs/toolkit';
import authReducer from './AuthSlice';
import userReducer from './UserSlice'
import channelsReducer from './ChannelSlice' 
import peopleReducer from './PeopleSlice';
const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    channels : channelsReducer,
    people : peopleReducer
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;