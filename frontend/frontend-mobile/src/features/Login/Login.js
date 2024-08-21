import React, { useState } from "react";
import { SafeAreaView, View, Image, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Link } from "@react-navigation/native";
import styles from "./Login.styles";
import SliderSmall from '../../components/SliderSmall';
import { useNavigation } from "@react-navigation/native";
import { login } from "../../services/api";
import AsyncStorage from '@react-native-async-storage/async-storage';


const Login = () => {
    const [focusedInput, setFocusedInput] = useState(null);
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleBackButtonPress = () => {
        navigation.replace('Highlights');
    };

    const handleLoginPress = async () => {
        try {
            const credentials = { email, password };
            const data = await login(credentials);
            const accessToken = data.access;
            const refreshToken = data.refresh;
            if (accessToken && refreshToken) {
                await AsyncStorage.setItem('accessToken', accessToken);
                await AsyncStorage.setItem('refreshToken', refreshToken);
                navigation.replace('DashboardTabs');
            } else {
                console.error('Tokens not found in login response');
                Alert.alert('Login fehlgeschlagen', 'Token wurde nicht empfangen.');
            }
        } catch (error) {
            console.error('Login failed:', error);
            Alert.alert('Login fehlgeschlagen', 'Bitte überprüfen Sie Ihre Anmeldedaten.');
        }
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
                        <TouchableOpacity onPress={handleBackButtonPress}>
                            <Image style={styles.backButtonStyle} source={require('../../../assets/icons/arrow_left_48px.gif')}></Image>
                        </TouchableOpacity>
                        <SliderSmall />
                    </View>
                    <Text style={styles.headlineStyle}>Einloggen</Text>
                    <Text style={styles.sublineStyle}>Loggen Sie sich ein und lassen Sie Ihren persönlichen Assistenten Ihre Versicherungen übersetzen.<Link to="/Highlights" style={styles.linkStyle}> Wie das?</Link></Text>
                    <View style={styles.inputRow}>
                        <View>
                            <Text style={styles.loginLabelStyle}>E-Mail-Adresse</Text>
                            <TextInput
                                style={[
                                    styles.inputStyle,
                                    focusedInput === 'E-Mail-Adresse' && styles.inputFocusedStyle
                                ]}
                                onFocus={() => handleFocus('E-Mail-Adresse')}
                                onBlur={handleBlur}
                                inputMode="email"
                                value={email}
                                onChangeText={setEmail}
                                selectionColor="#16c72e"
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>
                        <View>
                            <Text style={styles.loginLabelStyle}>Passwort</Text>
                            <TextInput
                                style={[
                                    styles.inputStyle,
                                    focusedInput === 'Passwort' && styles.inputFocusedStyle
                                ]}
                                onFocus={() => handleFocus('Passwort')}
                                onBlur={handleBlur}
                                inputMode="text"
                                secureTextEntry
                                value={password}
                                onChangeText={setPassword}
                                selectionColor="#16c72e"
                            />
                        </View>
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
                    <Text style={styles.dataProtectionTextStyle}>Impressum</Text>
                    <Text style={styles.dataProtectionTextStyle}>Datenschutzerklärung</Text>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default Login;