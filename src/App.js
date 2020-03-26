import React from 'react';
import { Provider } from 'react-redux';

import ConfigureStore from './store';
import Component from './routes';

function App() {
  const reduxStore = ConfigureStore({});
  return (
    <Provider store={reduxStore}>
      <div>
        <Component />
      </div>
    </Provider>
  );
}

export default App;
