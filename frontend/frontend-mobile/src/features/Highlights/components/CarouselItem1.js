import React, { useEffect } from "react";
import { View, Text, Image } from 'react-native';
import styles from "./CarouselItem1.styles";

const CarouselItem1 = () => {

    return (
        <View style={styles.screenStyle}>
            <Image
                source={require('../../../../assets/images/InsurNative-Logo-Text.png')}
                style={styles.logoStyle}
                resizeMode="contain"
            />
            <Text style={styles.sublineStyle}>Wählen Sie Ihre bevorzugte Sprache aus</Text>
            <Image
                source={require('../../../../assets/icons/foreign-language-light.gif')}
                style={styles.animationStyle}
            />
            <Image
                source={require('../../../../assets/images/wave2.png')}
                style={styles.waveStyle}
            />
            <Text style={styles.descriptionStyle}>Sie können die Sprache jederzeit in den Einstellungen ändern.</Text>
        </View>
    );
};

export default CarouselItem1;