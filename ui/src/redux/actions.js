import axios from 'axios';
import { LOG_OUT, UPDATE_USER } from './action-types';

export const logIn = (user) => async (dispatch, getState) => {
    try {
        console.log('about to send request');
        const response = await axios.post('login', user);
        console.log('res is:', response);
        const token = response.data.accessToken;
        localStorage.setItem('token', token);
        dispatch(updateUser(user));
    } catch (e) {
        console.error(e);
    }
};

export const logOut = () => (dispatch, getState) => {
    console.log('removing token...')
    localStorage.removeItem('token');
    dispatch({
        type: LOG_OUT,
    });
};

export const updateUser = (user) => ({
    type: UPDATE_USER,
    payload: user,
});
