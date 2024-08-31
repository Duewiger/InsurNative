import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, Image, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import styles from "./Compass.styles";
import { editRepresentativeProfileData } from "../../../services/api"; 
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Compass = () => {
    const navigation = useNavigation();
    const [isUploading, setIsUploading] = useState(false);
    const [emailMessage, setEmailMessage] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [representativeProfileData, setRepresentativeProfileData] = useState({
        name: '',
        address: '',
        email: '',
        // phone: '',
    });

    const handleBackButtonPress = () => {
        navigation.replace('DashboardTabs');
    };

    const fetchRepresentativeProfileData = async () => {
        try {
            const accessToken = await AsyncStorage.getItem('accessToken');
            const response = await axios.get('https://www.duewiger-projects.com/accounts/api/representative/', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const { phone, ...filteredData } = response.data;
            setRepresentativeProfileData(filteredData);
        } catch (error) {
            console.error("Error fetching profile data:", error);
        }
    };

    useEffect(() => {
        fetchRepresentativeProfileData();
    }, []);

    const handleChange = (field, value) => {
        setRepresentativeProfileData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const handleEdit = async () => {
        setIsUploading(true);
        try {
            const data = { ...representativeProfileData };
            const response = await editRepresentativeProfileData(data);
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

    const handleSendEmail = async () => {
        setIsSending(true);
        try {
            const accessToken = await AsyncStorage.getItem('accessToken');
            const response = await axios.post(
                'https://www.duewiger-projects.com/accounts/api/representative/sendmail/',
                {
                    message: emailMessage,
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            if (response.status === 200) {
                Alert.alert("Erfolg", response.data.message);
            } else {
                Alert.alert("Fehler", response.data.error || "E-Mail konnte nicht gesendet werden.");
            }
        } catch (error) {
            console.error('Fehler beim Senden der E-Mail:', error);
            Alert.alert("Fehler", "Es gab ein Problem beim Senden der E-Mail.");
        } finally {
            setIsSending(false);
        }
    };

    return (
        <SafeAreaView style={styles.compassScreenStyle}>
            <ScrollView 
                contentContainerStyle={styles.scrollViewContentStyle} showsVerticalScrollIndicator={false} 
                bounces={true}
            >
                <View style={styles.headerStyle}>
                    <View style={styles.backButtonContainerStyle}>
                        <TouchableOpacity 
                            onPress={handleBackButtonPress}
                        >
                            <Image 
                                style={styles.backButtonStyle} 
                                source={require('../../../../assets/icons/arrow_left_48px.gif')}
                            />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.headerTitleStyle}>Ihr Berater</Text>
                </View>
                <View style={styles.compassContainerStyle}>
                    <Text style={styles.sublineStyle}>Hinterlegen Sie Ihren Makler, Versicherungsverteter oder Berater. Sie können ihn auch ganz einfach über unsere App per Mail kontaktieren.</Text>
                    <View style={styles.profileDataContainerStyle}>
                        <View style={styles.representativeBoxStyle}>
                            <Text style={styles.representativeHeadingStyle}>Ihr Versicherungsberater</Text>
                            <View style={styles.representativeImageWrapper}>
                                <Image
                                    source={require('../../../../assets/images/kd-profile.png')}
                                    style={styles.representativeImageStyle}
                                />
                            </View>
                        </View>
                        {[
                            { label: 'Name', field: 'name' },
                            { label: 'Anschrift', field: 'address' },
                            { label: 'E-Mail-Adresse', field: 'email' },
                            // { label: 'Telefonnummer', field: 'phone' },
                        ].map((item, index) => (
                            <View key={index} style={styles.representativeProfileBoxStyle}>
                                <Text style={styles.representativeProfileBoxTextStyle}>{item.label}</Text>
                                <TextInput
                                    style={styles.representativeProfileDataTextStyle}
                                    value={representativeProfileData[item.field] || ''}
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
                    <TextInput
                        style={styles.compassEmailTextInputStyle}
                        placeholder="Sende eine Nachricht per Mail an deinen Berater."
                        placeholderTextColor={"#A5A5A5"}
                        selectionColor="#16c72e"
                        multiline={true}
                        textAlignVertical="top"
                        value={emailMessage}
                        onChangeText={setEmailMessage}
                    >
                    </TextInput>
                    <TouchableOpacity
                        style={styles.emailButtonStyle}
                        onPress={handleSendEmail}
                        disabled={isSending}
                    >
                        <Text
                            style={styles.emailButtonTextStyle}
                        >E-Mail Senden</Text>
                    </TouchableOpacity>
                    {isSending && (
                    <ActivityIndicator 
                        size="large" 
                        color="#16c72e" 
                        style={styles.loadingIndicator} 
                        />
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Compass;