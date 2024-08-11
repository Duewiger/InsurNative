import React, { useState } from "react";
import { SafeAreaView, View, Image, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Link } from "@react-navigation/native";
import styles from "./Login.styles";
import SliderSmall from '../../components/SliderSmall';
import { useNavigation } from "@react-navigation/native";

const Login = () => {
    const [focusedInput, setFocusedInput] = useState(null);
    const navigation = useNavigation();

    const handleBackButtonPress = () => {
        navigation.replace('Highlights');
    };

    const handleLoginPress = () => {
        navigation.replace('DashboardTabs');
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
                    <Text style={styles.headlineStyle}>Einloggen</Text>
                    <Text style={styles.sublineStyle}>Loggen Sie sich ein und lassen Sie Ihren persönlichen Assistenten Ihre Versicherungen übersetzen.<Link to="/Highlights" style={styles.linkStyle}> Wie das?</Link></Text>
                    <View style={styles.inputRow}>
                        {['E-Mail-Adresse', 'Passwort'].map((label, index) => (
                            <View key={index}>
                                <Text style={styles.loginLabelStyle}>{label}</Text>
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
                        style={styles.loginButtonStyle}
                        onPress={handleLoginPress}
                    >
                        <Text style={styles.loginButtonTextStyle}>Einloggen</Text>
                    </TouchableOpacity>
                    <Text style={styles.sublineStyle}>Sie haben Ihr <Link to="/PasswordReset" style={styles.linkStyle}>Passwort vergessen?</Link></Text>
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

export default Login;