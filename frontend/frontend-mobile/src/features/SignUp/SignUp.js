import React, { useState } from "react";
import { SafeAreaView, View, Image, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Link } from "@react-navigation/native";
import styles from "./SignUp.styles";
import SliderSmall from '../../components/SliderSmall';
import { useNavigation } from "@react-navigation/native";

const SignUp = () => {
    const [focusedInput, setFocusedInput] = useState(null);
    const navigation = useNavigation();

    const handleBackButtonPress = () => {
        navigation.replace('Highlights');
    };

    const handleSignUpPress = () => {
        navigation.replace('Login');
    };

    const handleFocus = (inputName) => {
        setFocusedInput(inputName);
    };

    const handleBlur = () => {
        setFocusedInput(false);
    };

    return (
        <SafeAreaView style={styles.screenStyle}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.screenContainerStyle}
            >
                <ScrollView 
                    contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}
                    bounces={true}
                >
                    <View style={styles.sliderViewStyle}>
                        <TouchableOpacity onPress={handleBackButtonPress}><Image style={styles.backButtonStyle} source={require('../../../assets/icons/arrow_left_48px.gif')}></Image></TouchableOpacity>
                        <SliderSmall />
                    </View>
                    <Text style={styles.headlineStyle}>Konto erstellen</Text>
                    <Text style={styles.sublineStyle}>Die Registrierung und unser Service sind vollständig kostenlos.<Link to="/Highlights" style={styles.linkStyle}> Wie das?</Link></Text>
                    <View style={styles.inputRow}>
                        {['Vorname', 'Nachname', 'E-Mail-Adresse', 'Passwort'].map((label, index) => (
                            <View key={index}>
                                <Text style={styles.signUpLabelStyle}>{label}</Text>
                                <TextInput
                                    style={[
                                        styles.inputStyle,
                                        focusedInput === label && styles.inputFocusedStyle
                                    ]}
                                    onFocus={() => handleFocus(label)}
                                    onBlur={handleBlur}
                                    inputMode={label === 'E-Mail-Adresse' ? 'email' : 'text'}
                                    secureTextEntry={label === 'Passwort'}
                                    selectionColor="#16c72e"
                                />
                            </View>
                        ))}
                    </View>
                    <TouchableOpacity
                        style={styles.signUpButtonStyle}
                        onPress={handleSignUpPress}
                    >
                        <Text style={styles.signUpButtonTextStyle}>Registrieren</Text>
                    </TouchableOpacity>
                    <View style={styles.scrollViewWrapper}>
                        <ScrollView 
                            contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}
                            bounces={true}
                        >
                            <Text style={styles.dataProtectionTextStyle}>Es gelten unsere AGB. Hinweise zur Datenverarbeitung finden Sie in der Datenschutzerklärung. Wir verwenden Ihre E-Mail-Adresse, um Ihnen werbliche Angebote mit Bezug zu unseren Diensten zu schicken. Dieser Verwendung können Sie jederzeit mit einer E-Mail an datenschutz@duewiger.com widersprechen oder durch Klicken des Abbestellen-Links, der in jeder E-Mail hinterlegt ist, ohne dass Ihnen hierfür Zusatzkosten entstehen.</Text>
                        </ScrollView>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default SignUp;