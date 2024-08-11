import React, { useEffect } from "react";
import { View, Text, Image } from 'react-native';
import styles from "./CarouselItem2.styles";

const CarouselItem2 = () => {

    return (
        <View style={styles.screenStyle}>
            <Image
                source={require('../../../../assets/images/InsurNative-Logo-Text.png')}
                style={styles.logoStyle}
                resizeMode="contain"
            />
            <Text style={styles.sublineStyle}>Lassen Sie den Assistenten alles für Sie übersetzen</Text>
            <Image
                source={require('../../../../assets/icons/computer-chat-light.gif')}
                style={styles.animationStyle}
            />
            <Image
                source={require('../../../../assets/images/wave3.png')}
                style={styles.waveStyle}
            />
            <Text style={styles.descriptionStyle}>Sie können einfach Fotos von Ihrer Post oder ganze Dateien übersetzen lassen.</Text>
        </View>
    );
};

export default CarouselItem2;