import { POST_DATA, GET_DATA, RESET }  from '../actions/actionsTypes';

const initState = {
    data: [],
    success: false,
    type: null
}

export default (state = initState, action) => {
    switch(action.type) {
      case RESET:
        return {
          ...state,
          success: false,
          type: RESET,
        }
      case POST_DATA:
        return {
            ...state,
            data: action.data,
            success: action.success,
            type: POST_DATA
        }
      case GET_DATA:
        return {
            ...state,
            data: action.data,
            success: action.success,
            type: GET_DATA
        }
      default:      
        return state;
    }
}