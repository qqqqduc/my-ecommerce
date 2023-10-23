import _ from "lodash";
import * as type from "../type";

const initState = {
  user: null
};

const userReducer = (state = initState, action: any) => {
    switch (action.type) {
      
      case type.LOGIN_SUCCESS:
        return {
            ...state,
            user: action.payload
        }

      case type.LOGOUT_SUCCESS:
        return {
          ...state,
          user: null
        }

      default:
        return state;
    }
  };
  
  export default userReducer;