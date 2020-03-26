import { POST_DATA }  from '../actions/actionsTypes';

const initState = {
    data: [],
    type: null
}

export default (state = initState, action) => {
    switch(action.type) {
      case POST_DATA:
        return {
            ...state,
            data: action.data,
            type: POST_DATA
        }
      default:      
        return state;
    }
}