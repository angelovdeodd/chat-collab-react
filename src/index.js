import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import Root from './Root';
import firebase from 'firebase';
import firebaseConfig from './firebaseConfig';

import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
    <Root>
        <BrowserRouter>
            <Route path="/" component={App} />
        </BrowserRouter>
    </Root>

, document.getElementById('root'));
registerServiceWorker();
