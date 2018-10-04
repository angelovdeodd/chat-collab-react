import { OPEN_MODAL_NEW, CLOSE_MODAL_NEW,
         SEND_INVITE, INVITE_RECEIVED, STOP_INVITES,
         REJECT_INVITE, REJECT_RECEIVED, ACCEPT_INVITE, ACCEPT_RECEIVED } from './../actions/typesInvite';

const initialState = {
    modalNewVisible: false,
    targetUid: null,
    invitationsSent: [],
    invitationsReceived: []
};

export default function(state = initialState, action) {
    let invSent, invRec, index;

    switch(action.type) {
        case OPEN_MODAL_NEW:
            return { ...state, modalNewVisible: true, targetUid: action.payload };
        case CLOSE_MODAL_NEW:
            return { ...state, modalNewVisible: false };
        case SEND_INVITE:
            invSent = state.invitationsSent;
            if (action.payload) {
                invSent.push(action.payload);
            }
            return { ...state, invitationsSent: invSent, modalNewVisible: false };
        case INVITE_RECEIVED:
            invRec = { ...action.payload.data, key: action.payload.key };
            return { ...state, invitationsReceived: [...state.invitationsReceived, invRec]};
        case STOP_INVITES:
            return { ...state, invitationsReceived: [] };
        case REJECT_INVITE:
            invRec = state.invitationsReceived;
            const ind = invRec.findIndex(el => el.key === action.payload);
            invRec.splice(ind, 1);
            return { ...state, invitationsReceived: invRec };
        case ACCEPT_INVITE:
            invRec = state.invitationsReceived;
            index = invRec.findIndex(el => el.key === action.payload);
            invRec[index]['accepted'] = true;
            invRec[index]['roomKey'] = action.payload;
            return { ...state, invitationsReceived: invRec };
        case REJECT_RECEIVED:
            invSent = state.invitationsSent;
            index = invSent.findIndex(el => el.key === action.payload);
            invSent.splice(ind, 1);
            return { ...state, invitationsSent: invSent };
        case ACCEPT_RECEIVED:
            invSent = state.invitationsSent;
            index = invSent.findIndex(el => el.key === action.payload);
            invSent[index]['accepted'] = true;
            return { ...state, invitationsSent: invSent };
        default:
            return state;
    }
}
