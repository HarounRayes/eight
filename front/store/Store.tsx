import { configureStore } from "@reduxjs/toolkit";

import searchSlice from '@/store/Reducers/api/searchSlice';
import globalSlice from '@/store/Reducers/global_states';


const appStore = configureStore({
  reducer: {
    global: globalSlice,
    search: searchSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        serializableCheck: false,
      },
  }),
});

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
export default appStore;
