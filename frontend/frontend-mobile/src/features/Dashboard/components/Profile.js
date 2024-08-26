import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View, Text, Image, TouchableOpacity, TextInput, Alert, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./Profile.styles";
import { logout, editProfileData, editProfileImage } from "../../../services/api";
import * as ImagePicker from "expo-image-picker";
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = () => {
    const navigation = useNavigation();
    const [profileData, setProfileData] = useState({
        email: '',
        first_name: '',
        last_name: '',
        birth_date: '',
        street: '',
        house_number: '',
        postal_code: '',
        city: '',
    });
    const [profileImage, setProfileImage] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    const fetchProfileData = async () => {
        try {
            const accessToken = await AsyncStorage.getItem('accessToken');
            const response = await axios.get('http://192.168.2.130:8000/accounts/api/account/', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            setProfileData(response.data);
            if (response.data.profile_picture) {
                setProfileImage(response.data.profile_picture);
            }
        } catch (error) {
            console.error("Error fetching profile data:", error);
        }
    };

    useEffect(() => {
        fetchProfileData();
    }, []);

    const handleBackButtonPress = () => {
        navigation.replace('DashboardTabs');
    };

    const handleLogout = async () => {
        try {
            const refreshToken = await AsyncStorage.getItem('refreshToken');
            const data = await logout(refreshToken);

            if (data) {
                await AsyncStorage.removeItem('accessToken');
                await AsyncStorage.removeItem('refreshToken');
                navigation.replace('Login');
            } else {
                console.error('No response data found during logout');
                Alert.alert('Logout fehlgeschlagen', 'Fehler bei der Abmeldung.');
            }
        } catch (error) {
            console.error('Logout failed:', error);
            Alert.alert('Logout fehlgeschlagen', 'Bitte überprüfen Sie Ihre Daten.');
        }
    };

    const handleEdit = async () => {
        setIsUploading(true);
        try {
            const data = { ...profileData };
            delete data.profile_picture;
    
            const response = await editProfileData(data); 
            if (response) {
                alert('Die Daten wurden erfolgreich geändert');
            }
        } catch (error) {
            console.error('Edit failed:', error);
            Alert.alert('Fehler', 'Die Daten konnten nicht geändert werden.');
        } finally {
            setIsUploading(false);
        }
    };

    const handleProfileImageChange = async () => {
        try {
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (!permissionResult.granted) {
                alert("Berechtigung zum Zugriff auf die Kamera benötigt.");
                return;
            }

            const pickerResult = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });

            if (!pickerResult.canceled) {
                const newProfileImage = pickerResult.assets[0].uri;
                setProfileImage(newProfileImage);

                const response = await editProfileImage(newProfileImage);
                if (response) {
                    alert('Das Profilbild wurde erfolgreich geändert');
                }
            }
        } catch (error) {
            console.error('Error updating profile image:', error);
            Alert.alert('Fehler', 'Das Profilbild konnte nicht geändert werden.');
        }
    };

    const handleChange = (field, value) => {
        setProfileData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    return (
        <SafeAreaView style={styles.profileContainerStyle}>
            <ScrollView
                contentContainerStyle={styles.scrollViewContentStyle} showsVerticalScrollIndicator={false} 
                bounces={true}
            >
                <View style={styles.headerStyle}>
                    <View style={styles.backButtonContainerStyle}>
                        <TouchableOpacity onPress={handleBackButtonPress}>
                            <Image 
                                style={styles.backButtonStyle} 
                                source={require('../../../../assets/icons/arrow_left_48px.gif')}
                            />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.headerTitleStyle}>Ihr Profil</Text>
                </View>
                <View style={styles.profileImageContainerStyle}>
                    <View style={styles.profileSubWrapperStyle}>
                        <Text style={styles.profileImageTextStyle}>Profildaten bearbeiten</Text>
                        <TouchableOpacity
                            style={styles.logoutButtonStyle}
                            onPress={handleLogout}
                        >
                            <Text style={styles.logoutButtonTextStyle}>Abmelden</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.profileImageWrapperStyle}>
                        <TouchableOpacity onPress={handleProfileImageChange}>
                            <Image
                                source={profileImage ? { uri: profileImage } : require('../../../../assets/images/profile-placeholder.png')}
                                style={styles.profileImageStyle}
                            />
                            <Image
                                source={require('../../../../assets/icons/camera-icon.gif')}
                                style={styles.cameraIconStyle}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.profileDataContainerStyle}>
                    <Text style={styles.profileDataHeadingStyle}>Personenbezogene Daten</Text>
                    {[
                        { label: 'E-Mail', field: 'email' },
                        { label: 'Vorname', field: 'first_name' },
                        { label: 'Nachname', field: 'last_name' },
                        { label: 'Geburtsdatum', field: 'birth_date' },
                        { label: 'Straße', field: 'street' },
                        { label: 'Hausnummer', field: 'house_number' },
                        { label: 'Postleitzahl', field: 'postal_code' },
                        { label: 'Ort', field: 'city' },
                    ].map((item, index) => (
                        <View key={index} style={styles.profileBoxStyle}>
                            <Text style={styles.profileBoxTextStyle}>{item.label}</Text>
                            <TextInput
                                style={styles.profileDataTextStyle}
                                value={profileData[item.field] || ''}
                                onChangeText={(value) => handleChange(item.field, value)}
                                selectionColor="#16c72e"
                            />
                        </View>
                    ))}
                </View>
                <TouchableOpacity
                    style={styles.saveButtonStyle}
                    onPress={handleEdit}
                    disabled={isUploading}
                >
                    <Text style={styles.saveButtonTextStyle}>Speichern</Text>
                </TouchableOpacity>
                {isUploading && (
                    <ActivityIndicator 
                        size="large" 
                        color="#16c72e" 
                        style={styles.loadingIndicator} 
                    />
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default Profile;