import { SAVE_COMMENT,
         CHANGE_AUTH,
         SIGNIN,
         SIGNIN_ERROR,
         SIGNOUT
        } from './types';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

export function saveComment(comment) {
    return {
        type: SAVE_COMMENT,
        payload: comment
    };
}

export function changeAuth(isLoggedIn) {

    return {
        type: CHANGE_AUTH,
        payload: isLoggedIn
    };
}

export const signin = ({ email, password }) => dispatch => {
    try {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .catch((error) => {
                dispatch({ type: SIGNIN_ERROR, payload: error });
            })
            .then((response) => {
                if(response) dispatch({ type: SIGNIN, payload: response.user });
            });
        } catch(error) {
            dispatch({ type: SIGNIN_ERROR, payload: error });
        };
};

export const checkAuth = () => dispatch => {
    firebase.auth().onAuthStateChanged((user) => {
        if(user) {
            dispatch({ type: CHANGE_AUTH, payload: true });
            dispatch({ type: SIGNIN, payload: user });
        } else {
            dispatch({ type: CHANGE_AUTH, payload: false });
        }
    });
}

export function signout() {
    firebase.auth().signOut();
    return { type: SIGNOUT, payload: true };
}