import { 
        FETCH_ROOMS,
        FETCH_CHANNELS,
        STOP_ROOMS,
        NEW_ROOM,
        DISABLE_INPUT,
        ENABLE_INPUT,
        NEW_MESSAGE,
        STOP_MESSAGES,
        OPEN_ROOM,
        CLOSE_ROOM,
        CREATE_ROOM,
        ACTIVATE_ROOM,
        USER_ENTERS, USER_LEAVES, STOP_USERS } from './typesRoom';
import { SHOW_MODAL } from './types';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

export const fetchRooms = () => dispatch => {
    const dbRef = firebase.database().ref('channels/');
    // dbRef.on('child_added', (snapshot) => {
    //     const roomData = snapshot.val();
    //     dispatch({ type: NEW_ROOM, payload: { ...roomData, key: snapshot.key } });
        
    //     if (roomData.fromInvite && roomData.targetUid === firebase.auth().currentUser.uid) {
    //         dispatch(openRoom(snapshot.key));
    //         dispatch(setRoomUsersWatcher(snapshot.key));
    //         dispatch(setMessageWatcher(snapshot.key));
    //     }
    // });
    dbRef.once('value', (snapshot) => {
        const channels = snapshot.val();
        const keys = Object.keys(channels);
        const data = keys.map(key => {
            return { key: key, name: channels[key].name };
        });
        dispatch({ type: FETCH_CHANNELS, payload: data });
        let roomsList = [];
        
        snapshot.forEach(channel => {
            if (channel.hasChildren()) {
                channel.forEach(room => {
                    const roomData = room.val();
                    let list = [];
                    if (typeof roomData === 'object') {
                        const keys = Object.keys(roomData);
                        list = keys.map(key => {
                            return { ...roomData[key], key:key, channelKey: channel.key }
                        });
                        roomsList = roomsList.concat(list);
                    }
                });
            }
        });
        dispatch({ type: FETCH_ROOMS, payload: roomsList });
    });
}

export function unsetRoomsWatcher() {
    firebase.database().ref('rooms/').off('child_added');
    return { type: STOP_ROOMS, payload: false };
}

export const sendMessage = (roomKey, message) => dispatch => {
    dispatch({ type: DISABLE_INPUT, payload: true });
    
    const dbRef = firebase.database().ref('messages/' + roomKey);
    dbRef.push({
        userId: firebase.auth().currentUser.uid,
        userName: firebase.auth().currentUser.displayName,
        message: message
    }).then(() => {
        dispatch({ type: ENABLE_INPUT, payload: true });
    });
}

export const setMessageWatcher = roomKey => dispatch => {
    const dbRef = firebase.database().ref('messages/' + roomKey);
    dbRef.on(
        'child_added',
        (snapshot) => {
            dispatch({ type: NEW_MESSAGE, payload: { roomKey: roomKey, message: { ...snapshot.val(), key: snapshot.key } }});
        }
    );
}

export const setRoomUsersWatcher = roomKey => dispatch => {
    firebase.database().ref('visitors/' + roomKey).on(
        'child_added',
        (snapshot) => {
            dispatch({ type: USER_ENTERS, payload: { roomKey: roomKey, data: snapshot.val() } });
        }
    );
    firebase.database().ref('visitors/' + roomKey).on(
        'child_removed',
        (snapshot) => {
            dispatch({ type: USER_LEAVES, payload: { roomKey: roomKey, data: snapshot.val() } });
        }
    );
}

export function unsetMessageWatcher(roomKey) {
    firebase.database().ref('messages/' + roomKey).off('child_added');
    return { type: STOP_MESSAGES, payload: roomKey };
}

export function unsetRoomUsersWatcher(roomKey) {
    const visitorsRef = firebase.database().ref('visitors/' + roomKey);
    visitorsRef.off('child_added');
    visitorsRef.off('child_removed');
    return { type: STOP_USERS, payload: roomKey };
}

export const openRoom = (roomKey) => dispatch => {
    const dbRef = firebase.database().ref('rooms/' + roomKey);
    const visitorsRef = firebase.database().ref('visitors/' + roomKey);

    let roomData;
    dbRef.once('value', snapshot => {
        roomData = { ...snapshot.val(), key: roomKey };
     }).then(() => {
        dispatch({ type: OPEN_ROOM, payload: roomData });
        const userRef = visitorsRef.push({
            userId: firebase.auth().currentUser.uid,
            userName: firebase.auth().currentUser.displayName,
        });
        userRef.onDisconnect().remove();
    });
}

export function makeRoomActive(roomKey) {
    return {
        type: ACTIVATE_ROOM,
        payload: roomKey
    };
}

export function closeRoom(roomKey) {
    const uid = firebase.auth().currentUser.uid;
    const visitorsRef = firebase.database().ref('visitors/' + roomKey);
    visitorsRef.orderByChild('userId').equalTo(uid).once('value', (snap) => {
        snap.forEach((row) => {
            firebase.database().ref('visitors/'+roomKey+'/'+row.key).remove(); 
        });
    });
        
    return {
        type: CLOSE_ROOM,
        payload: roomKey
    };
}

const saveChannelRoom =  (channelKey, roomData) => dispatch => {
    const dbRef = firebase.database().ref(`channels/${channelKey}/rooms/`);
    const uid = firebase.auth().currentUser.uid;

    dbRef.push({
        name: roomData.roomName,
        description: roomData.roomDescription,
        public: roomData.roomPublic,
        visible: roomData.roomVisible,
        ownerId: uid,
        maxUsers: roomData.maxUsers
    }).then((resp) => {
        dispatch({ type: CREATE_ROOM, payload: resp.key });
        dispatch({ type: SHOW_MODAL, payload: 'create-room-result' });
    });
}

export const saveRoom = (roomData) => dispatch => {
    const uid = firebase.auth().currentUser.uid;
    const channelRef = firebase.database().ref('channels/');
    channelRef.orderByChild('name').equalTo(roomData.roomChannel).once('value', (snapshot) => {
        if (snapshot.hasChildren()) {
            let key = Object.keys(snapshot.val()).pop();
            dispatch(saveChannelRoom(key, roomData));
        } else {
            channelRef.push({
                name: roomData.roomChannel,
                owner: uid
            }).then((response) => {
                dispatch(saveChannelRoom(response.key, roomData));
            });
        }
    });
}