import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice.js'
import eventReducer from './features/event/eventSlice.js'


export const store = configureStore({
  reducer: {
    auth: authReducer,
    events: eventReducer
  },
})