import { combineReducers, configureStore } from "@reduxjs/toolkit";
import reactFlowReducer from "./reactFlowSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import AuthReducer from "./userSlice";

const persistConfig = {
  key: "root",
  storage,
};
const rootReducer = combineReducers({
  reactFlow: reactFlowReducer,
  auth: AuthReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);
