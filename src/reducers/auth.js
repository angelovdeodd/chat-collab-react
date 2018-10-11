import { CHANGE_AUTH, SIGNIN, SIGNOUT } from './../actions/types';
import { SET_BASE_NAME, SEND_VERIFY_LINK } from './../actions/typesProfile';

const initialState = {
    authenticated: false,
    user: {},
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
