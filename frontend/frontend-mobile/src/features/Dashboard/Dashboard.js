import React, { useEffect, useState } from "react";
import { Alert, SafeAreaView, View, Text, TextInput, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from "./Dashboard.styles";
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as DocumentPicker from 'expo-document-picker';

const Dashboard = () => {
    const navigation = useNavigation();
    const [focusedInput, setFocusedInput] = useState(null);
    const [documents, setDocuments] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isUploading, setIsUploading] = useState(false);

    const fetchDocuments = async (query = "") => {
        try {
            const accessToken = await AsyncStorage.getItem('accessToken');
            const response = await axios.get('http://192.168.2.130:8000/accounts/api/document/search/', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                params: {
                    q: query,
                },
            });
            setDocuments(response.data);
        } catch (error) {
            console.error("Error fetching documents:", error);
        }
    };

    useEffect(() => {
        fetchDocuments();
    }, []);

    const handleFocus = () => {
        setFocusedInput(true);
    };

    const handleBlur = () => {
        setFocusedInput(false);
    };

    const handleSearchChange = (query) => {
        setSearchQuery(query);
        fetchDocuments(query);
    };

    const openProfile = () => {
        navigation.replace('Profile');
    };

    const openSettings = () => {
        navigation.replace('Settings');
    };

    const openDocument = async (document) => {
        try {
            const accessToken = await AsyncStorage.getItem('accessToken');
            const downloadPath = `${FileSystem.documentDirectory}${document.file.split('/').pop()}`;
    
            const response = await axios.get(`http://192.168.2.130:8000/accounts/api/document/download/${document.id}/`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                responseType: 'blob',
            });
    
            const fileUri = downloadPath;
            const reader = new FileReader();
    
            reader.onloadend = async () => {
                const base64data = reader.result.split(',')[1];
                await FileSystem.writeAsStringAsync(fileUri, base64data, {
                    encoding: FileSystem.EncodingType.Base64,
                });
    
                if (await Sharing.isAvailableAsync()) {
                    await Sharing.shareAsync(fileUri);
                } else {
                    alert('Teilen ist auf diesem Gerät nicht verfügbar.');
                }
            };
    
            reader.readAsDataURL(response.data);
        } catch (error) {
            alert('Das Dokument konnte nicht geöffnet werden.');
            console.error('Error opening document:', error);
        }
    };

    const uploadDocument = async () => {
        setIsUploading(true);
        try {
            const result = await DocumentPicker.getDocumentAsync({});
            
            if (!result.canceled && result.assets && result.assets.length > 0) {
                const selectedFile = result.assets[0];
                const formData = new FormData();
                formData.append('file', {
                    uri: selectedFile.uri,
                    name: selectedFile.name,
                    type: selectedFile.mimeType || 'application/octet-stream',
                });
    
                const accessToken = await AsyncStorage.getItem('accessToken');
    
                const response = await axios.post('http://192.168.2.130:8000/accounts/api/document/upload/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
    
                if (response.status === 201) {
                    alert('Dokument erfolgreich hochgeladen.');
                    fetchDocuments();
                }
            }
        } catch (error) {
            alert('Das Dokument konnte nicht hochgeladen werden.');
            console.error('Error uploading document:', error);
        } finally {
            setIsUploading(false);
        }
    };

    const deleteDocument = (documentId) => {
        Alert.alert(
            "Dokument löschen",
            "Bist du sicher, dass du dieses Dokument löschen möchtest?",
            [
                {
                    text: "Abbrechen",
                    style: "cancel"
                },
                {
                    text: "Löschen",
                    onPress: async () => {
                        try {
                            const accessToken = await AsyncStorage.getItem('accessToken');
        
                            const response = await axios.delete(`http://192.168.2.130:8000/accounts/api/document/delete/${documentId}/`, {
                                headers: {
                                    Authorization: `Bearer ${accessToken}`,
                                },
                            });
        
                            if (response.status === 204) {
                                alert('Dokument erfolgreich gelöscht.');
                                fetchDocuments();
                            }
                        } catch (error) {
                            alert('Das Dokument konnte nicht gelöscht werden.');
                            console.error('Error deleting document:', error);
                        }
                    },
                    style: "destructive"
                }
            ],
            { cancelable: true }
        );
    };

    return (
        <SafeAreaView style={styles.screenStyle}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.screenContainerStyle}
            >
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={openProfile}>
                        <Icon name="user" size={32} color="#16c72e" style={styles.userIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={openSettings}>
                        <Icon name="gear" size={32} color="#16c72e" style={styles.settingsIcon} />
                    </TouchableOpacity>
                </View>
                <View style={styles.stickyContainer}>
                    <View style={[
                        styles.searchContainer, 
                        focusedInput && styles.inputFocusedStyle]}>
                        <Icon name="search" size={24} color="#16c72e" style={styles.searchIcon} />
                        <TextInput
                            style={styles.inputStyle}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            placeholder="Wonach suchen Sie?"
                            placeholderTextColor="#D9D9D9"
                            selectionColor="#16c72e"
                            underlineColorAndroid="transparent"
                            value={searchQuery}
                            onChangeText={handleSearchChange}
                        />
                    </View>
                </View>
                <ScrollView 
                    contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}
                    bounces={true}
                >
                    <View style={styles.uploadContainerStyle}>
                        <Text style={styles.sublineStyle}>
                            Ihre Dokumente
                        </Text>
                        <TouchableOpacity
                            style={styles.uploadButtonStyle}
                            onPress={uploadDocument}
                            disabled={isUploading}
                        >
                            <Text style={styles.uploadButtonTextStyle}>Dokument hochladen</Text>
                        </TouchableOpacity>
                        {isUploading && (
                            <ActivityIndicator 
                                size="large" 
                                color="#16c72e" 
                                style={styles.loadingIndicator}
                            />
                        )}
                    </View>
                    <View style={styles.boxContainer}>
                        {documents.map((document, index) => (
                            <View key={index} style={styles.boxStyle}>
                                <TouchableOpacity style={styles.documentInfo} onPress={() => openDocument(document)}>
                                    <Text style={styles.boxHeadlineStyle}>{document.file ? document.file.split('/').pop() : 'Ihr Dokument'}</Text>
                                    <Icon name="file" size={20} color="#16c72e" style={styles.fileIcon} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => deleteDocument(document.id)}>
                                    <Icon name="trash" size={20} color="red" style={styles.trashIcon} />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default Dashboard;