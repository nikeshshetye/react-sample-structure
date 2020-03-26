import { combineReducers } from 'redux';
import app from './AppReducer';
import postReducer from './PostReducer';

const rootReducer = combineReducers({
    app: app,
    postReducer
});

export default rootReducer;
