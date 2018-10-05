import { SHOW_MODAL, HIDE_MODAL } from './../actions/types';

const initialState = {
    activeModal: null
};

export default function(state = initialState, action) {

        switch(action.type) {
            case SHOW_MODAL:
                return { ...state, activeModal: action.payload };

            case HIDE_MODAL:
                return { ...state, activeModal: null };
            
            default:
                return state;
        }
};
