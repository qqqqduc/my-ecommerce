import { combineReducers } from 'redux';
import productReducer from './productReducer';
import provinceReducer from './provinceReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
    Product: productReducer,
    Province: provinceReducer,
    User: userReducer
});

export default rootReducer;