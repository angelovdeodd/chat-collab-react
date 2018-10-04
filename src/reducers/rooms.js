// ROOMS reducer
import { FETCH_ROOMS,
        STOP_ROOMS,
        NEW_ROOM,
        NEW_MESSAGE,
        ENABLE_INPUT,
        DISABLE_INPUT,
        SEND_MESSAGE,
        OPEN_ROOM,
        CLOSE_ROOM,
        ACTIVATE_ROOM,
        STOP_MESSAGES,
        USER_ENTERS, USER_LEAVES, STOP_USERS } from '../actions/typesRoom';

const initialState = {
    inputEnabled: true,
    rooms: [],
    openRooms: [],
    roomUsers: [],
    activeRoomKey: null,
    messages: []
};

export default function(state = initialState, action) {
    console.log("ACTION: ", action.type, "PAYLOAD", action.payload);
    
    switch (action.type) {
        case NEW_ROOM:
            const rooms = state.rooms;
            rooms.push(action.payload);
            return { ...state, rooms: rooms };
        case FETCH_ROOMS:
            const keys = Object.keys(action.payload.data);
            const list = keys.map((key) => {
                return { key: key, id: action.payload.data[key].channelId, name: action.payload.data[key].channelName };
            });
            return {...state, rooms: list};
        case STOP_ROOMS: 
            return { ...state, rooms: [] };
        case DISABLE_INPUT:
            return { ...state, inputEnabled: false };
        case ENABLE_INPUT:
            return { ...state, inputEnabled: true };
        case SEND_MESSAGE:
            return { ...state, messages: [...state.messages, action.payload]};
        case NEW_MESSAGE:
            if (!state.messages[action.payload.roomKey]) {
                const msgs = [];
                msgs.push(action.payload.message);
                state.messages[action.payload.roomKey] = msgs;
            } else {
                state.messages[action.payload.roomKey].push(action.payload.message);
            }
            return { ...state };
        //case CREATE_ROOM:
            
        case OPEN_ROOM:
            if (state.openRooms.find(el => el.key === action.payload.key)) {
                // room already open
                return { ...state, activeRoomKey: action.payload.key};
            } else {
                // add room to open rooms array
                return { ...state, activeRoomKey: action.payload.key, openRooms: [...state.openRooms, action.payload]};
            }
        case ACTIVATE_ROOM:
            return { ...state, activeRoomKey: action.payload };
        case CLOSE_ROOM:
            const openRooms = [...state.openRooms];
            const index = state.openRooms.findIndex(el => el.key === action.payload);
            let newActiveKey;
            openRooms.splice(index, 1);
            if (action.payload === state.activeRoomKey) {
                if (openRooms.length === 1) newActiveKey = openRooms[0].key;
                if (openRooms.length > 1 && index !== 0) newActiveKey = state.openRooms[index - 1].key;
                if (openRooms.length > 1 && index === 0) newActiveKey = openRooms[0].key;
            } else {
                if (openRooms.length > 0) newActiveKey = state.activeRoomKey;
                if (openRooms.length === 0) newActiveKey = null;
            }
            return { ...state, openRooms: openRooms, activeRoomKey: newActiveKey };
        case STOP_MESSAGES:
            const messages = state.messages;
            if (messages[action.payload]) messages[action.payload] = null;
            return { ...state, messages: messages };
        case USER_ENTERS:
            const roomUsers = state.roomUsers;
            roomUsers[action.payload.roomKey] ? 
                roomUsers[action.payload.roomKey].push(action.payload.data)
                :
                roomUsers[action.payload.roomKey] = [action.payload.data];
                return { ...state, roomUsers: roomUsers };
        case USER_LEAVES:
            const currentRoomUsers = state.roomUsers;
            const removeIndex = currentRoomUsers[action.payload.roomKey]
                .findIndex(el => el.userId === action.payload.data.userId);
            
            currentRoomUsers[action.payload.roomKey].splice(removeIndex, 1);
            return { ...state, roomUsers: currentRoomUsers };
        case STOP_USERS:
            const allUsers = state.roomUsers;
            allUsers[action.payload] = null;
            return { ...state, roomUsers: allUsers };
        default:
            return state;
    }
}

