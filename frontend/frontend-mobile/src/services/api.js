import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "https://www.duewiger-projects.com/accounts/api/";

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 5000,
});

export const login = async (credentials) => {
    try {
        const response = await api.post('login/', credentials);
        return response.data;
    } catch (error) {
        handleApiError(error, 'Login failed');
        throw error;
    }
};

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
        handleApiError(error, 'Logout failed');
        throw error;
    }
};

export const signup = async (values) => {
    try {
        const response = await api.post('signup/', values);
        return response.data;
    } catch (error) {
        handleApiError(error, 'Signup failed');
        throw error;
    }
};

export const editProfileData = async (data) => {
    try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        const response = await api.put(
            'account/edit/',
            data,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data;
    } catch (error) {
        handleApiError(error, 'Profile update failed');
        throw error;
    }
};

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
            formData,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        return response.data;
    } catch (error) {
        handleApiError(error, 'Profile image update failed');
        throw error;
    }
};

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
        handleApiError(error, 'Fetching user settings failed');
        throw error;
    }
};

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
        handleApiError(error, 'Saving user settings failed');
        throw error;
    }
};

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
        handleApiError(error, 'Account deletion failed');
        throw error;
    }
};

export const editRepresentativeProfileData = async (data) => {
    try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        const response = await api.put(
            'representative/edit/',
            data,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data;
    } catch (error) {
        handleApiError(error, 'Representative profile update failed');
        throw error;
    }
};

const handleApiError = (error, message) => {
    if (error.response) {
        console.error(`${message}:`, error.response.data);
    } else if (error.request) {
        console.error(`${message}: No response received`, error.request);
    } else {
        console.error(`${message}:`, error.message);
    }
};

export default api;