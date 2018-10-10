import { SET_BASE_NAME, SEND_VERIFY_LINK } from './typesProfile';
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
