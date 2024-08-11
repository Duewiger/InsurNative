import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, Image, TextInput, TouchableOpacity, ScrollView, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";
import styles from "./Compass.styles";

const Compass = () => {
    const navigation = useNavigation();

    const handleBackButtonPress = () => {
        navigation.replace('DashboardTabs');
    };
    
    const hotline = '+491727452773';

    const handleHotlineCall = () => {
        const hotlineURL = `tel:${hotline}`;
        Linking.openURL(hotlineURL);
    };

    return (
        <SafeAreaView style={styles.compassScreenStyle}>
            <ScrollView 
                contentContainerStyle={styles.scrollViewContentStyle} showsVerticalScrollIndicator={false} 
                bounces={true}
            >
                <View style={styles.headerStyle}>
                    <View style={styles.backButtonContainerStyle}>
                        <TouchableOpacity 
                            onPress={handleBackButtonPress}
                        >
                            <Image 
                                style={styles.backButtonStyle} 
                                source={require('../../../../assets/icons/arrow_left_48px.gif')}
                            />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.headerTitleStyle}>Ihr Berater</Text>
                </View>
                <View style={styles.compassContainerStyle}>
                    <Text style={styles.sublineStyle}>Hinterlegen Sie mit Google Maps Ihren Makler, Versicherungsverteter oder Berater. Sie können ihn auch ganz einfach über unsere App kontaktieren.</Text>
                    <View style={styles.representativeBoxStyle}>
                        <View style={styles.representativeTextWrapper}>
                            <Text style={styles.representativeBoxTextStyle}>
                                Ihr Versicherungsberater
                            </Text>
                            <Text style={styles.representativeDataTextStyle}>
                                Kilian Düwiger {"\n"}
                                Rissener Dorfstraße 51 {"\n"}
                                22559 Hamburg {"\n"}
                                +49 172 745 27 73
                            </Text>
                        </View>
                        <View style={styles.representativeImageWrapper}>
                            <Image
                                source={require('../../../../assets/images/kd-profile.png')}
                                style={styles.representativeImageStyle}
                            />
                        </View>
                    </View>
                    <TouchableOpacity
                    onPress={handleHotlineCall}
                    style={styles.hotlineButtonStyle}
                    >
                        <Text
                            style={styles.hotlineButtonTextStyle}
                        >Versicherungsberater anrufen</Text>
                    </TouchableOpacity>
                    <Image
                        source={require('../../../../assets/images/google-maps-placeholder.png')}
                        style={styles.googleMapsMapStyle}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Compass;