import { APP_DATA }  from '../actions/actionsTypes';

export default (state = [], action) => {
    switch(action.type) {
      case APP_DATA:
          return Object.assign({}, state, action.data);
      
      default:      
        return state;
    }
}