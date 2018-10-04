import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import async from './middlewares/async';
import stateValidator from './middlewares/stateValidator';
import reducers from './reducers';
import reduxThunk from 'redux-thunk';
import './style/bootstrap-3.3.7-dist/css/bootstrap.min.css';

export default ({ children, initialState = {} }) => {
    const store = createStore(reducers, initialState, applyMiddleware(reduxThunk, async, stateValidator));

    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}