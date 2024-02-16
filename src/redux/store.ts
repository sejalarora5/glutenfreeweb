import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import userSlice from "./userSlice/userSlice";
import storage from "redux-persist/lib/storage";
import themeSlice from "./themeSlice/themeSlice";
import blogsSlice from "./blogsSlice/blogsSlice";
import languageSlice from "./languageSlice/languageSlice";
import shopsSlice from "./shopsSlice/shopsSlice";
import shopsFilterSlice from "./shopsFilterSlice/shopsFilterSlice";
import shopsDetailSlice from "./shopsDetailSlice/shopsDetailSlice";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["blogs", "language", "shops", "shopsFilter", "shopsDetail"],
};

const rootReducers = combineReducers({
  userSlice,
  themeSlice,
  blogsSlice,
  languageSlice,
  shopsSlice,
  shopsFilterSlice,
  shopsDetailSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
