import { combineReducers } from 'redux';
import commentsReducer from './comments';
import roomsReducer from './rooms';
import authReducer from './auth';
import inviteReducer from './invites';
import modalReducer from './modal';
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
    comments: commentsReducer,
    rooms: roomsReducer,
    auth: authReducer,
    form: formReducer,
    invite: inviteReducer,
    modal: modalReducer
});