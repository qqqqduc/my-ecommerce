import { applyMiddleware, compose, createStore } from "redux";
import thunk from 'redux-thunk';
import rootReducer from "./reducers/rootReducer";

// load string from localStarage and convert into an Object
// invalid output must be undefined

const middleWare = [thunk];

// create our store from our rootReducers and use loadFromLocalStorage
// to overwrite any values that we already have saved
const store = createStore(rootReducer, compose(applyMiddleware(...middleWare)));

export default store;