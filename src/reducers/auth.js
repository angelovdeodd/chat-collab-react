import { CHANGE_AUTH, SIGNUP, SIGNUP_ERROR, SIGNIN, SIGNIN_ERROR, SIGNOUT } from './../actions/types';
import { SET_BASE_NAME } from './../actions/typesProfile';

const initialState = {
    signedUp: false,
    authenticated: false,
    user: {},
    signupErrorCode: '',
    signupErrorMessage: '',
    signinErrorCode: '',
    signinErrorMessage: ''
};

export default function(state = initialState, action) {
    switch(action.type) {
        default: 
            return state;
        case CHANGE_AUTH:
            return { ...state, authenticated: action.payload };
        case SIGNUP:
            return { ...state, signedUp: true };
        case SIGNUP_ERROR:
            return { ...state, signupErrorCode: action.payload.code, signupErrorMessage: action.payload.message };
        case SIGNIN:
            return { ...state, authenticated: true, user: action.payload };
        case SIGNIN_ERROR:
            return { ...state, signinErrorCode: action.payload.code, signinErrorMessage: action.payload.message };
        case SIGNOUT:
            return { ...state, authenticated: false, user: {} };
        case SET_BASE_NAME:
            return { ...state, user: action.payload };
    }
}
