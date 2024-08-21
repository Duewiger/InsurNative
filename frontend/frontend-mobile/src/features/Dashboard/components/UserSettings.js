import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View, Text, Image, TouchableOpacity, Switch, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import RNPickerSelect from "react-native-picker-select";
import styles from "./UserSettings.styles";
import { fetchUserSettings, editUserSettings, deleteAccount } from "../../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserSettings = () => {
    const navigation = useNavigation();
    const [userSettings, setUserSettings] = useState({
        language: "de",
        notifications_enabled: true,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const loadUserSettings = async () => {
        try {
            const accessToken = await AsyncStorage.getItem('accessToken');
            const response = await fetchUserSettings(); // Die API zum Abrufen der Benutzereinstellungen wird aufgerufen
            if (response) {
                setUserSettings(response); // Die Benutzereinstellungen werden im State gesetzt
            }
        } catch (error) {
            console.error("Error fetching user settings:", error);
        }
    };

    useEffect(() => {
        loadUserSettings();
    }, []);

    const handleBackButtonPress = () => {
        navigation.replace('DashboardTabs');
    };

    const handleLanguageChange = (value) => {
        setUserSettings((prevSettings) => ({
            ...prevSettings,
            language: value,
        }));
    };

    const handleNotificationsToggle = (value) => {
        setUserSettings((prevSettings) => ({
            ...prevSettings,
            notifications_enabled: value,
        }));
        Alert.alert("Hinweis", "Die Funktion zum Aktivieren der Benachrichtigungen ist in Arbeit und noch inaktiv.");
    };

    const handleSaveSettings = async () => {
        setIsSubmitting(true);
        try {
            const response = await editUserSettings(userSettings); // Die geänderten Einstellungen werden gespeichert
            if (response) {
                Alert.alert("Erfolg", "Die Einstellungen wurden erfolgreich gespeichert.");
            }
        } catch (error) {
            console.error("Failed to save settings:", error);
            Alert.alert("Fehler", "Die Einstellungen konnten nicht gespeichert werden.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleAccountDeletion = async () => {
        Alert.alert(
            "Konto löschen",
            "Sind Sie sicher, dass Sie Ihr Konto löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.",
            [
                { text: "Abbrechen", style: "cancel" },
                { text: "Löschen", onPress: async () => {
                    try {
                        await deleteAccount();
                        await AsyncStorage.clear();
                        navigation.replace("Login");
                    } catch (error) {
                        console.error("Failed to delete account:", error);
                        Alert.alert("Fehler", "Das Konto konnte nicht gelöscht werden.");
                    }
                }},
            ]
        );
    };

    const handlePasswordChange = async () => {
        Alert.alert("Hinweis", "Diese Funktion zum Ändern des Passworts ist in Arbeit.");
    };

    return (
        <SafeAreaView style={styles.settingsContainerStyle}>
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
                    <Text style={styles.headerTitleStyle}>Einstellungen</Text>
                </View>

                <View style={styles.settingsDataContainerStyle}>
                    <View style={styles.settingsBoxStyle}>
                        <Text style={styles.settingsBoxTextStyle}>Sprache der App</Text>
                        <RNPickerSelect
                            onValueChange={handleLanguageChange}
                            items={[
                                { label: "Deutsch", value: "de" },
                            ]}
                            value={userSettings.language}
                            style={{
                                inputIOS: {
                                    color: '#FFFFFF',
                                },
                                inputAndroid: {
                                    color: '#FFFFFF',
                                },
                                placeholder: {
                                    color: '#FFFFFF',
                                },
                            }}
                        />
                    </View>

                    <View style={styles.settingsBoxStyle}>
                        <Text style={styles.settingsBoxTextStyle}>Benachrichtigungen</Text>
                        <Switch
                            value={userSettings.notifications_enabled}
                            onValueChange={handleNotificationsToggle}
                            thumbColor={userSettings.notifications_enabled ? "#16c72e" : "#f4f3f4"}
                            trackColor={{ false: "#767577", true: "#16c72e" }}
                        />
                    </View>

                    <View style={styles.settingsBoxStyle}>
                        <TouchableOpacity onPress={() => {/* Link zu Datenschutz */}}>
                            <Text style={styles.settingsBoxTextStyle}>Datenschutz</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.settingsBoxStyle}>
                        <TouchableOpacity onPress={() => {/* Link zu Impressum */}}>
                            <Text style={styles.settingsBoxTextStyle}>Impressum</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.settingsBoxStyle}>
                        <TouchableOpacity onPress={handlePasswordChange}>
                            <Text style={styles.settingsBoxTextStyle}>Passwort ändern</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.settingsBoxStyle}>
                        <TouchableOpacity onPress={handleAccountDeletion}>
                            <Text style={[styles.settingsBoxTextStyle, { color: "red" }]}>Konto löschen</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.saveButtonStyle}
                    onPress={handleSaveSettings}
                    disabled={isSubmitting}
                >
                    <Text style={styles.saveButtonTextStyle}>Speichern</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

export default UserSettings;