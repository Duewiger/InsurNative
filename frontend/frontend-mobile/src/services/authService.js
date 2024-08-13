import { loginSuccess } from '../store/authSlice';
import api from './api';

export const login = (credentials) => async (dispatch) => {
    try {
        const data = await api.post('/login/', credentials);
        dispatch(loginSuccess({ user: data.user, token: data.token }));
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};