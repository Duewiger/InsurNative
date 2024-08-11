import React, { useEffect } from "react";
import { SafeAreaView, Text, Image } from "react-native";
import { useNavigation } from '@react-navigation/native';
import styles from './StartUp.styles.js';

const StartUp = () => {

    const navigation = useNavigation();

    useEffect(() => {
        const timeout = setTimeout(() => {
            navigation.replace('Highlights');
        }, 5000);

        return () => clearTimeout(timeout);
    }, [navigation]);

    return (
        <SafeAreaView style={styles.screenStyle}>
            <Image
                source={require('../../../assets/images/InsurNative-Logo-Text.png')}
                style={styles.logoStyle}
                resizeMode="contain"
            />
            <Text style={styles.sublineStyle}>
                Versicherungen in Ihrer Sprache
            </Text>
            <Image 
                source={require('../../../assets/icons/privacy-policy-light.gif')}
                style={styles.animationStyle}
            />
            <Image 
                source={require('../../../assets/images/wave1.png')}
                style={styles.waveStyle}
            />
        </SafeAreaView>
    );
};

export default StartUp;