import { SAVE_COMMENT,
         CHANGE_AUTH,
         SIGNUP,
         SIGNUP_ERROR,
         SIGNIN,
         SIGNIN_ERROR,
         SIGNOUT
        } from './types';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

// Action creator for SAVE_COMMENT
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

export function signup({ email, password1, password2, displayName }) {
    // Using redux-thunk to be able to dispatch multiple actions in one action creator
    return (dispatch) => {
        if (!displayName) {
            dispatch({ type: SIGNUP_ERROR, payload: { code: 'auth/no-username', message: 'Please provide username' }});
            return;
        }
        if (password1 !== password2) {
            dispatch({ type: SIGNUP_ERROR, payload: { 
                code: 'auth/passwords-differ', 
                message: 'Passwords are not the same'
            }});
            return;
        }
        try {
            firebase.auth().createUserWithEmailAndPassword(email, password1)
            .then((response) => {
                response.user.updateProfile({ displayName: displayName }).then(() => {
                    dispatch({ type: SIGNUP, payload: response });
                });
            })
            .catch((error) => {
                dispatch({ type: SIGNUP_ERROR, payload: error});
            });
        } catch(error) {
            dispatch({ type: SIGNUP_ERROR, payload: error});
        }
    }
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