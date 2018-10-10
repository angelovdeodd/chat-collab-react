import { CHANGE_AUTH, SIGNIN, SIGNIN_ERROR, SIGNOUT } from './../actions/types';
import { SET_BASE_NAME, SEND_VERIFY_LINK } from './../actions/typesProfile';

const initialState = {
    authenticated: false,
    user: {},
    signupErrorCode: '',
    signupErrorMessage: '',
    signinErrorCode: '',
    signinErrorMessage: '',
    emailVerificationPending: false
};

export default function(state = initialState, action) {
    switch(action.type) {
        default: 
            return state;
        case CHANGE_AUTH:
            return { ...state, authenticated: action.payload };
        case SIGNIN:
            return { ...state, authenticated: true, user: action.payload };
        case SIGNIN_ERROR:
            return { ...state, signinErrorCode: action.payload.code, signinErrorMessage: action.payload.message };
        case SIGNOUT:
            return { ...state, authenticated: false, user: {} };
        case SET_BASE_NAME:
            return { ...state, user: action.payload };
        case SEND_VERIFY_LINK:
            if(action.payload === 'pending' || action.payload === 'sent') {
                return { ...state, emailVerificationPending: true };
            }
            if(action.payload === 'reload') {
                return { ...state, emailVerificationPending: false };
            }
            return state;
    }
}
