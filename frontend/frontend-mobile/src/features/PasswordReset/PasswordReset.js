import React, { useState } from "react";
import { SafeAreaView, View, Image, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import styles from "./PasswordReset.styles";
import SliderSmall from '../../components/SliderSmall';
import { useNavigation } from "@react-navigation/native";

const PasswordReset = () => {
    const [focusedInput, setFocusedInput] = useState(null);
    const navigation = useNavigation();

    const handleBackButtonPress = () => {
        navigation.replace('Login');
    };

    const handlePasswordResetPress = () => {
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
                    <Text style={styles.headlineStyle}>Passwort zurücksetzen</Text>
                    <Text style={styles.sublineStyle}>Bitte geben Sie die E-Mail-Adresse Ihres Accounts zum Zurücksetzen Ihres Passworts ein. Sie erhalten in Kürze einen Bestätigungslink zum Zurücksetzen des Passworts.</Text>
                    <View style={styles.inputRow}>
                        {['E-Mail-Adresse'].map((label, index) => (
                            <View key={index}>
                                <Text style={styles.passwordResetLabelStyle}>{label}</Text>
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
                        style={styles.passwordResetButtonStyle}
                        onPress={handlePasswordResetPress}
                    >
                        <Text style={styles.passwordResetButtonTextStyle}>Bestätigen</Text>
                    </TouchableOpacity>
                </ScrollView>
                <View style={styles.dataProtectionLinkViewStyle}>
                    <Text
                        style={styles.dataProtectionTextStyle}
                    >Impressum</Text>
                    <Text
                        style={styles.dataProtectionTextStyle}
                    >Datenschutzerklärung</Text>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default PasswordReset;