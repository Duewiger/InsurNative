import React, { useState } from "react";
import { SafeAreaView, View, Text, TextInput, ScrollView, KeyboardAvoidingView, Platform, Touchable, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from "./Dashboard.styles";
import { useNavigation } from "@react-navigation/native";

const Dashboard = () => {
    const [focusedInput, setFocusedInput] = useState(null);

    const handleFocus = () => {
        setFocusedInput(true);
    };

    const handleBlur = () => {
        setFocusedInput(false);
    };

    const navigation = useNavigation();

    const openProfile = () => {
        navigation.replace('Profile');
    }

    const openSettings = () => {
        navigation.replace('Settings');
    }

    return (
        <SafeAreaView style={styles.screenStyle}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.screenContainerStyle}
            >
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={openProfile}>
                        <Icon name="user" size={32} color="#16c72e" style={styles.userIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={openSettings}>
                        <Icon name="gear" size={32} color="#16c72e" style={styles.settingsIcon} />
                    </TouchableOpacity>
                </View>
                <View style={styles.stickyContainer}>
                    <View style={[
                        styles.searchContainer, 
                        focusedInput && styles.inputFocusedStyle]}>
                        <Icon name="search" size={24} color="#16c72e" style={styles.searchIcon} />
                        <TextInput
                            style={[
                                styles.inputStyle,
                            ]}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            placeholder="Wonach suchen Sie?"
                            placeholderTextColor="#D9D9D9"
                            selectionColor="#16c72e"
                            underlineColorAndroid="transparent"
                        />
                        <Icon name="microphone" size={24} color="#16c72e" style={styles.microIcon} />
                    </View>
                </View>
                <ScrollView 
                    contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}
                    bounces={true}
                >
                    <Text style={styles.sublineStyle}>
                        Ihre Dokumente
                    </Text>
                    <View style={styles.boxContainer}>
                        {['Dokument', 'Dokument', 'Dokument', 'Dokument', 'Dokument', 'Dokument', 'Dokument', 'Dokument', ].map((label, index) => (
                            <View key={index} style={styles.boxStyle}>
                                <Text style={styles.boxHeadlineStyle}>{label}</Text>
                                <Icon name="file" size={32} color="#16c72e" style={styles.fileIcon} />
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default Dashboard;