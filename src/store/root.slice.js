import { combineReducers } from '@reduxjs/toolkit'
import storageSlice from './storage.slice'
import appSlice from './app.slice'
import userSlice from './user.slice';

import * as userThunks from './user.thunks';
import * as appThunks from './app.thunks';

export const rootReducer = combineReducers({
  app: appSlice.reducer,
  storage: storageSlice.reducer,
  user: userSlice.reducer,
})

export const rootActions = {
  ...storageSlice.actions,
  ...appThunks,
  ...userThunks,
}

export default rootReducer;