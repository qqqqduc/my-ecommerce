import _ from "lodash";
import * as type from "../type";

const initState = {
  province: [],
  district: [],
  ward: []
};


const provinceReducer = (state = initState, action: any) => {
    switch (action.type) {
      
      case type.GET_PROVINCE:
        return {
            ...state,
            province: action.payload
        }

      case type.GET_DISTRICT:
        return {
          ...state,
          district: action.payload
        }

      case type.GET_WARD:
        return {
          ...state,
          ward: action.payload
        }
  
      default:
        return state;
    }
  };
  
  export default provinceReducer;