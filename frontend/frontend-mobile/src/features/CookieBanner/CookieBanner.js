import React, { useState, useEffect } from "react";
import { 
    SafeAreaView, 
    View, 
    Text, 
    TouchableOpacity, 
    ScrollView 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from "./CookieBanner.styles";

const CookieBanner = () => {
    const navigation = useNavigation();

    const handleLinkPress = () => {
        navigation.replace('SignUp');
    }

    return (
        <SafeAreaView style={styles.screenStyle}>
            <View style={styles.cardStyle}>
                <Text style={styles.headingStyle}>
                    Einstellungen zum Datenschutz
                </Text>
                <ScrollView
                    contentContainerStyle={styles.scrollViewContent}
                    showsVerticalScrollIndicator={true}
                    bounces={true}
                >
                    <Text style={styles.textStyle}>
                        InsurNative verwendet Cookies und andere Technologien für Folgendes:{'\n'}- Auslesen/Speichern von Informationen auf Ihrem Endgerät{'\n'}- Verarbeitung personenbezogener Daten
                    </Text>
                    <Text style={styles.textStyle}>
                        Sofern Sie uns Ihre Zustimmung erteilen, verarbeiten wir Ihre Daten {'('}teilweise auch durch Weitergabe an Dienstleister, auch in Nicht-EU-Ländern{')'} für folgende Zwecke:{'\n'}- Einbindung externer Medien{'\n'}- Nutzungsanalyse und Personalisierung von Angebot und Werbung{'\n'}- Auswertung von Werbekampagnen
                    </Text>
                    <Text style={styles.textStyle}>
                        Mit einem Klick auf “Alle Cookies akzeptieren“ willigen Sie in den Zugriff auf/die Speicherung von Informationen im Endgerät, die Verarbeitung Ihrer personenbezogenen Daten zu den genannten Zwecken sowie die Übermittlung Ihrer Daten an Dienstleister und Drittländer ausdrücklich ein. Ihre Einwilligung ist jederzeit widerrufbar.
                    </Text>
                </ScrollView>
                <View style={styles.cookieButtonViewStyle} >
                        <TouchableOpacity 
                            style={styles.cookieSubmitButtonStyle} 
                            onPress={handleLinkPress} 
                        >
                            <Text style={styles.cookieSubmitTextStyle}>
                                Alle Cookies akzeptieren
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.cookieDisableInfoButtonStyle}onPress={handleLinkPress} 
                        >
                            <Text style={styles.cookieDisableInfoTextStyle}>
                                Ablehnen
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.cookieDisableInfoButtonStyle}onPress={handleLinkPress} 
                        >
                            <Text style={styles.cookieDisableInfoTextStyle}>
                                Mehr Informationen
                            </Text>
                        </TouchableOpacity>
                    </View>
                <View style={styles.dataProtectionLinkViewStyle}>
                    <Text
                        style={styles.dataProtectionTextStyle}
                    >Impressum</Text>
                    <Text
                        style={styles.dataProtectionTextStyle}
                    >Datenschutzerklärung</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default CookieBanner;