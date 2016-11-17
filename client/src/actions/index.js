import axios from 'axios';
import { browserHistory } from 'react-router';
import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
    FETCH_MESSAGE
} from './types';

const API_KEY = '1F31482C189648752258A907BE5BDCF3';
const DOTA2_WEB = 'http://'
const ROOT_URL = 'http://localhost:3090';

export function signinUser({ email, password }) {
    return function(dispatch) {
        // Submit email/password to the server
        axios.post(`${ROOT_URL}/signin`, { email, password })
            .then(response => {
                // If request is good...
                // - Update state to indicate user is authenticated
                dispatch({ type: AUTH_USER });
                // - Save the JWT token
                localStorage.setItem('token', response.data.token);
                // - redirect to the route '/feature'
                browserHistory.push('/feature');
            })
            .catch(error => {
                // If request is bad...
                // - Show an error to the user
                dispatch(authError('Bad Login Info'));
            });
    }
}

export function signupUser({ email, password }) {
    return function(dispatch) {
        axios.post(`${ROOT_URL}/signup`, { email, password })
            .then(response => {
                dispatch({ type: AUTH_USER });
                localStorage.setItem('token', response.data.token);
                browserHistory.push('/feature');
            })
            .catch(error => {
                console.log(error.response.data);
                dispatch(authError(error.response.data.error))
            });
    }
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    };
}

export function signoutUser() {
    localStorage.removeItem('token');

    return { type: UNAUTH_USER };
}

export function fetchMessage(){
    return function (dispatch) {
        axios.get(ROOT_URL, {headers:{authorization: localStorage.getItem('token')}})
            .then(response =>{
                dispatch({
                    type: FETCH_MESSAGE,
                    payload: response.data.message
                });
            })
    }
}
/** If use redux-promise
export function fetchMessage() {
    const request = axios.get(ROOT_URL, {headers:{authorization: localStorage.getItem('token')}});
    return {
        type: FETCH_MESSAGE,
        payload: request
    }
}
**/

