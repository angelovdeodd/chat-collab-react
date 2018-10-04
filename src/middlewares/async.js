export default ({ dispatch }) => next => action => {

    if (!action.payload || !action.payload.then) {
        // Proceed to next middleware
        return next(action);
    }

    action.payload.then(function(response) {
        const newAction = { ...action, payload: response };
        dispatch(newAction);
    });
}
