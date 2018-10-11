import { SET_BASE_NAME, SEND_VERIFY_LINK } from './typesProfile';
import { SIGNIN } from './types';
import firebase from 'firebase/app';
import 'firebase/auth';
import { SubmissionError } from 'redux-form';

export const setBaseName = username => dispatch => {

    const user = firebase.auth().currentUser;
    
    user.updateProfile({ displayName: username }).then(() => {
        dispatch({
            type: SET_BASE_NAME,
            payload: user
        });
    });
}

export const submitSignup = ({ email, password1, displayName }) => dispatch => {
    return firebase.auth().createUserWithEmailAndPassword(email, password1)
        .then((response) => {
            response.user.sendEmailVerification();
            response.user.updateProfile({ displayName: displayName });
        })
        .catch((error) => {
            throw new SubmissionError({
                email: error.message
            });
        });
}

export const submitSignin = ({ email, password }) => dispatch => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .catch((error) => {
            switch (error.code) {
                case 'auth/user-not-found':
                case 'auth/invalid-email':
                case 'auth/user-disabled':
                    throw new SubmissionError({ email: error.message });
                case 'auth/wrong-password':
                    throw new SubmissionError({ password: error.message });
                case 'auth/argument-error':
                case 'auth/too-many-requests':
                    throw new SubmissionError({ _error: error.message });
                default:
                    return false;
            }
            
        })
        .then((response) => {
            if(response) dispatch({ type: SIGNIN, payload: response.user });
        });
}

export const submitLostPasswordForm = ({ email }) => dispatch => {
    return firebase.auth().sendPasswordResetEmail(email, { url: 'https://chat-collab.firebaseapp.com/signup' })
        .catch((error) => {
            throw new SubmissionError({ email: error.message });
        });
}

export const sendVerifyLink = () => dispatch => {
    const user = firebase.auth().currentUser;
    dispatch({
        type: SEND_VERIFY_LINK,
        payload: 'pending'
    });

    user.sendEmailVerification().then(() => {
        dispatch({
            type: SEND_VERIFY_LINK,
            payload: 'sent'
        });
    })
}

export const reloadUser = () => dispatch => {
    const user = firebase.auth().currentUser;
    user.reload().then(() => {
        dispatch({
            type: SEND_VERIFY_LINK,
            payload: 'reload'
        });
    });
}
