import { OPEN_MODAL_NEW, CLOSE_MODAL_NEW,
        SEND_INVITE, INVITE_RECEIVED, STOP_INVITES,
        REJECT_INVITE, REJECT_RECEIVED, ACCEPT_INVITE, ACCEPT_RECEIVED } from './typesInvite';

import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

import * as actionsRoom from './actionsRoom';

export function openModalNew(uid) {
    return {
        type: OPEN_MODAL_NEW,
        payload: uid
    };
}

export function closeModalNew() {
    return {
        type: CLOSE_MODAL_NEW,
        payload: false
    };
}

export const sendInvite = (targetUid, formData) => dispatch => {
    const dbRef = firebase.database().ref('/invitations');
    const invitationRef = dbRef.push({
        originName: firebase.auth().currentUser.displayName,
        originUid:  firebase.auth().currentUser.uid,
        targetUid: targetUid,
        roomName: formData.title,
        visibility: formData.convVisibl,
        type: formData.convType,
        stage: 'waiting'
    });
    invitationRef.onDisconnect().remove();
    
    invitationRef.on('value', (snapshot) => {
        const invitationData = snapshot.val();

        switch (invitationData.stage) {
            case 'rejected':
                dispatch({ type: REJECT_RECEIVED, payload: snapshot.key });
                return;
             case 'accepted':
                dispatch({ type: ACCEPT_RECEIVED, payload: snapshot.key });
                // Create new room
                const roomsRef = firebase.database().ref('/channels');
                const roomData = snapshot.val();

                const newRoomRef = roomsRef.push({
                    targetUid: invitationData.targetUid,
                    fromInvite: true,
                    channelName: roomData.roomName,
                    type: roomData.type,
                    visibility: invitationData.visibility,
                    maxUsers: 10
                });
                newRoomRef.onDisconnect().remove();

                // Change status from accepted to opening
                firebase.database().ref('/invitations/'+invitationRef.key).child('stage').set('opening');
                // Save new room key to invitation entry
                firebase.database().ref('/invitations/'+invitationRef.key).child('roomKey').set(newRoomRef.key);
                
                dispatch(actionsRoom.openRoom(newRoomRef.key));
                dispatch(actionsRoom.setRoomUsersWatcher(newRoomRef.key));
                dispatch(actionsRoom.setMessageWatcher(newRoomRef.key));
                return;
            case 'opening':
                return;
            case 'waiting':
                dispatch({ type: SEND_INVITE, payload: { ...snapshot.val(), key: snapshot.key } });
                return;
            default:
                dispatch({ type: SEND_INVITE, payload: false });
        }
    });
}

export const setInvitesWatcher = () => dispatch => {
    const p = new Promise(
        (resolve, reject) => {
            window.setTimeout(() => {
                if (!firebase.auth().currentUser) {
                    reject();
                }
            }, 5000);
            const interv = window.setInterval(() => {
                if (firebase.auth().currentUser) {
                    clearInterval(interv);
                    resolve(firebase.auth().currentUser.uid);
                }
            }, 100);
        }
    ).then((uid) => {
        firebase.database().ref('/invitations')
        .orderByChild('targetUid')
        .equalTo(uid)
        .on('child_added', (snapshot) => {
            dispatch({
                type: INVITE_RECEIVED,
                payload: { data: snapshot.val(), key: snapshot.key }
            });
        });
    });
}

export function unsetInvitesWatcher() {
    firebase.database().ref('/invitations').off('child_added');
    return {
        type: STOP_INVITES,
        payload: true
    };
}

export function rejectInvitation(key) {
    firebase.database().ref('/invitations/'+key).child('stage').set('rejected');
    return {
        type: REJECT_INVITE,
        payload: key
    };
}

export function acceptInvitation(key) {
    firebase.database().ref('/invitations/'+key).child('stage').set('accepted');
    return {
        type: ACCEPT_INVITE,
        payload: key
    };
}