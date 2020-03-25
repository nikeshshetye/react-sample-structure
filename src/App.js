import React from 'react';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';

import ConfigureStore from './store';
import Component from './routes';

function App() {
  const reduxStore = ConfigureStore({});
  return (
    <AppContainer>
        <Provider store={reduxStore}>
            <React.Fragment>
                <Component />
            </React.Fragment>
        </Provider>
    </AppContainer>
  );
}

export default App;
