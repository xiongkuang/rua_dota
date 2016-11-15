import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import reduxThunk from 'redux-thunk';

import App from './components/app';
import Signin from './components/auth/signin';
import Singout from './components/auth/signout';
import Singup from './components/auth/signup';
import Feature from './components/feature';
import RequireAuth from './components/auth/require_auth';
import Welcome from './components/welcome'
import reducers from './reducers';
import {AUTH_USER} from './actions/types';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
//store is where we store the app state
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');
//if we have a token, consier the user to be signed in
if (token){
    //we need to update application state
    store.dispatch({type: AUTH_USER});
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Welcome}/>
            <Route path="signin" component={Signin} />
            <Route path="signout" component={Singout}/>
            <Route path="signup" component={Singup}/>
            <Route path="feature" component={RequireAuth(Feature)}/>
        </Route>
    </Router>

  </Provider>
  , document.querySelector('.container'));
