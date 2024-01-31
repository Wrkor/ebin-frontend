import { configureStore } from '@reduxjs/toolkit'
import appReducer from './appReducer'
import constantsReducer from './constantsReducer'
import userReducer from './userReducer'

const store = configureStore({
  reducer: {
    app: appReducer,
    constants: constantsReducer,
    user: userReducer,
  },
})

export default store;