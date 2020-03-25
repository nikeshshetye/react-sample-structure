import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';

const ConfigureStore = (preloadedState = {}) => {
    return createStore(
        reducers,
        preloadedState,
        applyMiddleware(ReduxThunk),
    );
};

export default ConfigureStore;
