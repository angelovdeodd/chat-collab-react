import { SET_BASE_NAME } from './typesProfile';
import firebase from 'firebase/app';
import 'firebase/auth';

export const setBaseName = username => dispatch => {

    const user = firebase.auth().currentUser;
    console.log('new name', username);
    
    user.updateProfile({ displayName: username }).then(() => {
        dispatch({
            type: SET_BASE_NAME,
            payload: user
        });
    });
}