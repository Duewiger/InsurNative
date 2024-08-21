import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "http://192.168.2.130:8000/accounts/api/";

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 5000,
});

// Login function
export const login = async (credentials) => {
    try {
        const response = await api.post('login/', credentials);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Server responded with:', error.response.data);
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Error setting up the request:', error.message);
        }
        throw error;
    }
};

// Logout function
export const logout = async (refreshToken) => {
    try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        const response = await api.post(
            'logout/',
            { refresh_token: refreshToken },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

// SignUp function
export const signup = async (values) => {
    try {
        const response = await api.post('signup/', values);
        return response.data
    } catch (error) {
        if (error.response) {
            console.error('Server responded with:', error.response.data);
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Error setting up the request:', error.message);
        }
        throw error;
    }
};

// Edit profile text data function
export const editProfileData = async (data) => {
    try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        const response = await api.put(
            'account/edit/',
            data, // JSON-Daten
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Server responded with:', error.response.data);
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Error setting up the request:', error.message);
        }
        throw error;
    }
};

// Edit profile image function
export const editProfileImage = async (imageUri) => {
    try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        const formData = new FormData();
        formData.append("profile_picture", {
            uri: imageUri,
            name: "profile_picture.jpg",
            type: "image/jpeg",
        });

        const response = await api.put(
            'account/edit/',
            formData, // FormData für das Bild
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Server responded with:', error.response.data);
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Error setting up the request:', error.message);
        }
        throw error;
    }
};

// Fetch user settings
export const fetchUserSettings = async () => {
    try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        const response = await api.get('user-settings/', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Server responded with:', error.response.data);
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Error setting up the request:', error.message);
        }
        throw error;
    }
};

// Edit user settings
export const editUserSettings = async (settings) => {
    try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        const response = await api.put('user-settings/', settings, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Server responded with:', error.response.data);
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Error setting up the request:', error.message);
        }
        throw error;
    }
};

// Delete account function
export const deleteAccount = async () => {
    try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        const response = await api.delete('account/delete/', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Server responded with:', error.response.data);
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Error setting up the request:', error.message);
        }
        throw error;
    }
};

export default api;