import { SHOW_MODAL, HIDE_MODAL } from './types';

export function showModal(name) {
    return {
        type: SHOW_MODAL,
        payload: name
    };
};

export function hideModal() {
    return {
        type: HIDE_MODAL
    };
};
