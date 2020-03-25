import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './pages';

export default () => (
    <BrowserRouter>
        <Route path="/" component={App} />
    </BrowserRouter>
);
