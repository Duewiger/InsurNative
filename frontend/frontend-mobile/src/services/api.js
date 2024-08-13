import axios from 'axios';

const API_BASE_URL = "http://192.168.2.130:8000/accounts/api/";

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 5000,
});

// Login-Funktion
export const login = async (credentials) => {
    try {
        const response = await api.post('login/', credentials);
        return response.data;
    } catch (error) {
        if (error.response) {
            // Serverantwort vorhanden
            console.error('Server responded with:', error.response.data);
        } else if (error.request) {
            // Anfrage wurde gesendet, aber keine Antwort erhalten
            console.error('No response received:', error.request);
        } else {
            // Fehler beim Einrichten der Anfrage
            console.error('Error setting up the request:', error.message);
        }
        throw error;
    }
};


// Weitere API-Aufrufe ...

export default api;