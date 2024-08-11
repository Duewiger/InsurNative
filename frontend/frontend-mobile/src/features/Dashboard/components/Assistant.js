import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, Image, TextInput, Button, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from "./Assistant.styles";

const Assistant = () => {
    const [focusedInput, setFocusedInput] = useState(null);

    const handleFocus = () => {
        setFocusedInput(true);
    };

    const handleBlur = () => {
        setFocusedInput(true);
    };

    return (
        <SafeAreaView style={styles.screenStyle}>
            <ScrollView
                contentContainerStyle={styles.scrollViewContentStyle} showsVerticalScrollIndicator={false} 
                bounces={true}
            >
                <Text style={styles.headlineStyle}>Willkommen, ich bin Ihr persönlicher <Text style={{ color: '#16c72e' }}>Versicherungsassistent</Text></Text>
                <Text style={styles.sublineStyle}>Stellen Sie mir allgemeine Versicherungsfragen oder laden Sie Ihre Dokumente zum Übersetzen hoch.</Text>
                <View style={styles.howToContainerStyle}>
                    <Image
                        source={require('../../../../assets/icons/smartphone-camera.gif')}
                        style={styles.animationStyle}
                    />
                    <Text style={styles.howToTextStyle}>Sie können auch einfach ein Foto mit Ihrem Smartphone vom jeweiligen Dokument machen.</Text>
                </View>
                <KeyboardAvoidingView
                    style={styles.chatContainerStyle}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 50}
                >
                    <ScrollView contentContainerStyle={styles.messageResultWrapper} keyboardShouldPersistTaps="handled">
                        <Text style={styles.messageResultStyle}>Hier kommt Ihre Antwort</Text>
                    </ScrollView>
                    <View style={[styles.messageContainer, 
                        focusedInput && styles.inputFocusedStyle]}>
                        <Icon name="paperclip" size={20} color="#16c72e" style={styles.attachementIcon}/>
                        <TextInput
                            style={[
                                styles.inputStyle,
                            ]}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            placeholder="Sende eine Nachricht"
                            placeholderTextColor="#D9D9D9"
                            selectionColor="#16c72e"
                            underlineColorAndroid="transparent"
                        />
                        <Icon name="microphone" size={20} color="#16c72e" style={styles.microIcon} />
                        <Icon name="paper-plane" size={20} color="#16c72e" style={styles.sendIcon}/>
                    </View>
                    <Text style={styles.legalTextStyle}>Unsere Übersetzungen können keine ausreichende Rechtssicherheit gewährleisten.</Text>
                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Assistant;