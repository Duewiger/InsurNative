import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./UserSettings.styles";

const UserSettings = () => {
    const navigation = useNavigation();

    const handleBackButtonPress = () => {
        navigation.replace('DashboardTabs');
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
                    {/* <Text style={styles.settingsDataHeadingStyle}>Personenbezogene Daten</Text> */}
                    {['Sprache der App', 'Passwort ändern', 'Datenschutz', 'Infos', 'Konto löschen' ].map((label, index) => (
                        <View key={index} style={styles.settingsBoxStyle}>
                            <Text style={styles.settingsBoxTextStyle}>
                                {label}
                            </Text>
                            <Text style={styles.settingsDataTextStyle}>
                                Legt die Standardsprache für die InsurNative App fest.
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
    );
};

export default UserSettings;