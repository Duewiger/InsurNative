import React, { useState } from "react";
import { SafeAreaView, View, Image, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Link } from "@react-navigation/native";
import styles from "./SignUp.styles";
import SliderSmall from '../../components/SliderSmall';
import { signup } from "../../services/api";
import { useNavigation } from "@react-navigation/native";


const SignUp = () => {
    const [focusedInput, setFocusedInput] = useState(null);
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const handleBackButtonPress = () => {
        navigation.replace('Highlights');
    };

    const handleFocus = (inputName) => {
        setFocusedInput(inputName);
    };

    const handleBlur = () => {
        setFocusedInput(false);
    };

    const handleSignUpPress = async () => {
        try {
            const values = { first_name, last_name, email, password };
            const data = await signup(values);
            if (data) {
                navigation.replace('Login');
            } else {
                Alert.alert('Registrierung fehlgeschlagen');
            }
        } catch (error) {
            console.error('SignUp failed:', error);
            Alert.alert('Login fehlgeschlagen', 'Bitte überprüfen Sie Ihre Anmeldedaten.');
        }
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
                        {[
                            { label: 'Vorname', value: first_name, onChangeText: setFirstName },
                            { label: 'Nachname', value: last_name, onChangeText: setLastName },
                            { label: 'E-Mail', value: email, onChangeText: setEmail },
                            { label: 'Passwort', value: password, onChangeText: setPassword },
                        ].map((input, index) => (
                            <View key={index}>
                                <Text style={styles.signUpLabelStyle}>{input.label}</Text>
                                <TextInput
                                    style={[
                                        styles.inputStyle,
                                        focusedInput === input.label && styles.inputFocusedStyle
                                    ]}
                                    onFocus={() => handleFocus(input.label)}
                                    onBlur={handleBlur}
                                    value={input.value}
                                    onChangeText={input.onChangeText}
                                    inputMode={input.label === 'E-Mail' ? 'email' : 'text'}
                                    secureTextEntry={input.label === 'Passwort'}
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