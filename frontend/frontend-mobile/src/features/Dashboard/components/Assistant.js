import React, { useEffect, useState, useRef } from "react";
import { SafeAreaView, View, Text, TextInput, Image, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as DocumentPicker from 'react-native-document-picker';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import styles from "./Assistant.styles";
import AsyncStorage from '@react-native-async-storage/async-storage';


const Assistant = () => {
    const [focusedInput, setFocusedInput] = useState(null);
    const [message, setMessage] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [response, setResponse] = useState('');
    const [isPressed, setIsPressed] = useState({ paperclip: false, camera: false, send: false });
    const [displayedText, setDisplayedText] = useState('');
    const [typingIndex, setTypingIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const typingTimeout = useRef(null);

    useEffect(() => {
        if (isTyping && response.length > 0 && typingIndex < response.length) {
            typingTimeout.current = setTimeout(() => {
                setDisplayedText((prev) => prev + response.charAt(typingIndex));
                setTypingIndex((prev) => prev + 1);
            }, 10);
            return () => clearTimeout(typingTimeout.current);
        }
    }, [typingIndex, response, isTyping]);

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
                alert('Entschuldigung, wir benötigen Kamera-Berechtigungen, um diese Funktion nutzen zu können!');
            }
        })();
    }, []);
    

    const handleFocus = () => {
        setFocusedInput(true);
    };

    const handleBlur = () => {
        setFocusedInput(false);
    };

    const handleFilePick = async () => {
        try {
            const result = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });
    
            console.log('Selected file:', result);
    
            if (result[0].type.startsWith('image/')) {
                setSelectedFile({
                    uri: result[0].uri,
                    name: result[0].name,
                    type: result[0].type,
                });
            } else if (result[0].type === 'application/pdf') {
                setSelectedFile({
                    uri: result[0].uri,
                    name: result[0].name,
                    type: result[0].type,
                });
            } else {
                alert('Dieser Dateityp wird nicht unterstützt.');
            }
        } catch (error) {
            if (DocumentPicker.isCancel(error)) {
                console.log('Auswahl abgebrochen.');
            } else {
                console.error('Fehler bei der Dokumentenauswahl:', error);
            }
        }
    };
    
    const handleTakePhoto = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
    
        console.log(result);
    
        if (!result.canceled && result.assets && result.assets.length > 0) {
            setSelectedFile({
                uri: result.assets[0].uri,
                name: `photo-${new Date().getTime()}.jpg`,
                type: 'image/jpeg',
            });
        }
    };    

    const handleSend = async () => {
        clearTimeout(typingTimeout.current);
        setDisplayedText('');
        setResponse('');
        setTypingIndex(0);
        setIsTyping(true);
        setIsLoading(true);

        let formData = new FormData();
        formData.append('message', message);

        console.log(selectedFile);

        if (selectedFile) {
            formData.append('file', {
                uri: selectedFile.uri,
                name: selectedFile.name,
                type: selectedFile.type,
            });
        }

        try {
            const accessToken = await AsyncStorage.getItem('accessToken');
            const response = await axios.post('http://192.168.2.130:8000/assistant/upload/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${accessToken}`,
                },
            });
            setResponse(response.data.response);
        } catch (error) {
            console.error('Error during the request:', error);
        } finally {
            setIsLoading(false);
            if (!isTyping) {
                setIsPressed({ paperclip: false, camera: false, send: false });
            }
        }
    };

    const handleStop = () => {
        clearTimeout(typingTimeout.current);
        setIsTyping(false);
        setDisplayedText('');
        setTypingIndex(0);
        setIsLoading(false);
        setSelectedFile(null);
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
                        {isLoading ? (
                            <ActivityIndicator size="large" color="#16c72e" />
                        ) : (
                            <Text style={styles.messageResultStyle}>{displayedText}</Text>
                        )}
                    </ScrollView>
                    <View style={[styles.messageContainer, focusedInput && styles.inputFocusedStyle]}>
                        <TouchableOpacity
                            style={isPressed.paperclip ? styles.iconPressed : styles.icon}
                            onPressIn={() => setIsPressed({ ...isPressed, paperclip: true })}
                            onPressOut={() => setIsPressed({ ...isPressed, paperclip: false })}
                            onPress={handleFilePick}
                        >
                            <Icon name="paperclip" size={20} color="#16c72e" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={isPressed.camera ? styles.iconPressed : styles.icon}
                            onPressIn={() => setIsPressed({ ...isPressed, camera: true })}
                            onPressOut={() => setIsPressed({ ...isPressed, camera: false })}
                            onPress={handleTakePhoto}
                        >
                            <Icon name="camera" size={20} color="#16c72e" />
                        </TouchableOpacity>
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
                        <TouchableOpacity
                            style={isPressed.send ? styles.iconPressed : styles.icon}
                            onPressIn={() => setIsPressed({ ...isPressed, send: true })}
                            onPressOut={() => setIsPressed({ ...isPressed, send: false })}
                            onPress={isLoading || isTyping ? handleStop : handleSend}
                        >
                            <Icon name={isLoading || isTyping ? "stop" : "paper-plane"} size={20} color="#16c72e" />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.legalTextStyle}>Unsere Übersetzungen können keine ausreichende Rechtssicherheit gewährleisten.</Text>
                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Assistant;