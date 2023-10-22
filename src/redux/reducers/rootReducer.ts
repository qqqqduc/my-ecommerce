import { combineReducers } from 'redux';
import productReducer from './productReducer';
import provinceReducer from './provinceReducer';

const rootReducer = combineReducers({
    Product: productReducer,
    Province: provinceReducer
});

export default rootReducer;