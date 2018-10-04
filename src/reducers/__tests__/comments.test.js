import commentsReducer from './../../reducers/comments';
import { SAVE_COMMENT } from './../../actions/types';

it('handles SAVE_COMMENT action', () => {
    const action = {
        type: SAVE_COMMENT,
        payload: 'new comment'
    };

    const newState = commentsReducer([], action);
    expect(newState).toEqual(['new comment']);
});

it('handles action with unknown type without crash', () => {
    const newState = commentsReducer([], { type: 'UNKNOWN' });
    expect(newState).toEqual([]);
});