import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./Profile.styles";
// import axios from "axios";

const Profile = () => {
    const navigation = useNavigation();

    const handleBackButtonPress = () => {
        navigation.replace('DashboardTabs');
    };

    const handleLogout = () => {
        navigation.replace('Login');
    };

    // const [userData, setUserData] = useState(null);

    // useEffect(() => {
    //     axios.get('user')
    //         .then(response => setUserData(response.data))
    //         .catch(error => console.error("Fehler beim Abrufen der Nutzerdaten", error));
    // }, []);

    return (

        <SafeAreaView style={styles.profileContainerStyle}>
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
                        <Image
                            source={require('../../../../assets/images/profile-placeholder.png')}
                            style={styles.profileImageStyle}
                        />
                        <Image
                            source={require('../../../../assets/icons/camera-icon.gif')}
                            style={styles.cameraIconStyle}
                        />
                    </View>
                </View>
                <View style={styles.profileDataContainerStyle}>
                    <Text style={styles.profileDataHeadingStyle}>Personenbezogene Daten</Text>
                    {['Sprache', 'E-Mail', 'Vorname', 'Nachname', 
                    'Straße', 'Hausnummer', 'Postleitzahl', 'Ort', 'Land', 'Geburtsdatum' ].map((label, index) => (
                        <View key={index} style={styles.profileBoxStyle}>
                            <Text style={styles.profileBoxTextStyle}>
                                {label}
                            </Text>
                            <Text style={styles.profileDataTextStyle}>
                                Kilian Düwiger
                            </Text>
                        </View>
                    ))}
                </View>
                <View style={styles.dataProtectionLinkViewStyle}>
                    <Text
                        style={styles.dataProtectionTextStyle}
                    >Impressum</Text>
                    <Text
                        style={styles.dataProtectionTextStyle}
                    >Datenschutzerklärung</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
        /* {userData && (
            <View>
                <Text
                    style={styles.profileTextStyle}
                >Deine Daten</Text>
                <Text
                    style={styles.profileTextStyle}
                >ID: {userData.id}</Text>
                <Text
                    style={styles.profileTextStyle}
                >Vorname: {userData.first_name}</Text>
                <Text
                    style={styles.profileTextStyle}
                >Nachname: {userData.last_name}</Text>
                <Text
                    style={styles.profileTextStyle}
                >Email: {userData.email}</Text>
            </View>
        )} */
    );
};

export default Profile;