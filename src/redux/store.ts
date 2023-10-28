import { applyMiddleware, compose, createStore } from "redux";
import thunk from 'redux-thunk';
import rootReducer from "./reducers/rootReducer";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // sử dụng local storage

const persistConfig = {
    key: 'root',
    storage,
  };

const middleWare = [thunk];

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, compose(applyMiddleware(...middleWare)));
export const persistor = persistStore(store);