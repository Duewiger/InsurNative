import React, { useState } from "react";
import { SafeAreaView, View, Text, TextInput, Image, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import styles from "./Assistant.styles";
import AsyncStorage from '@react-native-async-storage/async-storage';


const Assistant = () => {
    const [focusedInput, setFocusedInput] = useState(null);
    const [message, setMessage] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [response, setResponse] = useState('');

    const handleFocus = () => {
        setFocusedInput(true);
    };

    const handleBlur = () => {
        setFocusedInput(false);
    };

    const handleFilePick = async () => {
        let result = await DocumentPicker.getDocumentAsync({});
        if (result.type === 'success') {
            setSelectedFile(result);
        }
    };

    const handleTakePhoto = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.cancelled) {
            setSelectedFile({
                uri: result.uri,
                name: `photo-${new Date().getTime()}.jpg`,
                type: 'image/jpeg',
            });
        }
    };

    const handleSend = async () => {
        let formData = new FormData();
        formData.append('message', message);
    
        if (selectedFile) {
            formData.append('file', {
                uri: selectedFile.uri,
                name: selectedFile.name,
                type: selectedFile.type,
            });
        }
    
        try {
            const token = await AsyncStorage.getItem('token'); // Token aus dem Speicher abrufen
            const response = await axios.post('http://192.168.2.130:8000/assistant/upload/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`, // Token im Authorization-Header senden
                },
            });
            setResponse(response.data.response);
        } catch (error) {
            if (error.response) {
                console.error('Server responded with:', error.response.data);
            } else if (error.request) {
                console.error('No response received:', error.request);
            } else {
                console.error('Error setting up the request:', error.message);
            }
        }
    };

    return (
        <SafeAreaView style={styles.screenStyle}>
            <ScrollView
                contentContainerStyle={styles.scrollViewContentStyle}
                showsVerticalScrollIndicator={false} 
                bounces={true}
            >
                <Text style={styles.headlineStyle}>Willkommen, ich bin Ihr persönlicher <Text style={{ color: '#16c72e' }}>Versicherungsassistent</Text></Text>
                <Text style={styles.sublineStyle}>Stellen Sie mir allgemeine Versicherungsfragen oder laden Sie Ihre Dokumente zum Übersetzen hoch.</Text>
                <View style={styles.howToContainerStyle}>
                    <Image
                        source={require('../../../../assets/icons/smartphone-camera.gif')}
                        style={styles.animationStyle}
                    />
                    <Text style={styles.howToTextStyle}>Sie können auch einfach ein Foto mit Ihrem Smartphone vom jeweiligen Dokument machen.</Text>
                </View>
                <KeyboardAvoidingView
                    style={styles.chatContainerStyle}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 50}
                >
                    <ScrollView contentContainerStyle={styles.messageResultWrapper} keyboardShouldPersistTaps="handled">
                        <Text style={styles.messageResultStyle}>{response}</Text>
                    </ScrollView>
                    <View style={[styles.messageContainer, 
                        focusedInput && styles.inputFocusedStyle]}>
                        <Icon name="paperclip" size={20} color="#16c72e" style={styles.attachementIcon} onPress={handleFilePick}/>
                        <Icon name="camera" size={20} color="#16c72e" style={styles.attachementIcon} onPress={handleTakePhoto}/>
                        <TextInput
                            style={styles.inputStyle}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            onChangeText={setMessage}
                            value={message}
                            placeholder="Sende eine Nachricht"
                            placeholderTextColor="#D9D9D9"
                            selectionColor="#16c72e"
                            underlineColorAndroid="transparent"
                        />
                        <Icon name="paper-plane" size={20} color="#16c72e" style={styles.sendIcon} onPress={handleSend}/>
                    </View>
                    <Text style={styles.legalTextStyle}>Unsere Übersetzungen können keine ausreichende Rechtssicherheit gewährleisten.</Text>
                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Assistant;