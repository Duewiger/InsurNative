import React from "react";
import { View, Text, Image } from 'react-native';
import styles from "./CarouselItem3.styles";
import Slider from '../../../components/Slider';

const CarouselItem3 = () => {

    return (
        <View style={styles.screenStyle}>
            <Image
                source={require('../../../../assets/images/InsurNative-Logo-Text.png')}
                style={styles.logoStyle}
                resizeMode="contain"
            />
            <Text style={styles.sublineStyle}>Anmelden und Loslegen</Text>
            <View style={styles.sliderViewStyle}>
                <Slider />
            </View>
            <Image
                source={require('../../../../assets/images/wave4.png')}
                style={styles.waveStyle}
            />
            <Text style={styles.descriptionStyle}>Registrieren Sie sich jetzt oder loggen Sie sich mit Ihrem bestehenden Account ein.</Text>
        </View>
    );
};

export default CarouselItem3;