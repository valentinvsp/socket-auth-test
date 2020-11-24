import { LOG_IN, LOG_OUT } from './action-types';

export const logIn = (user) => ({
    // TODO -> add thunk and do some async call

    type: LOG_IN,
    payload: user,
});

export const logOut = () => ({
    // TODO -> add thunk and delete token from local storage
    type: LOG_OUT,
});
