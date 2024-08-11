import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    screenStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#252525',
    },
    screenContainerStyle: {
        width: '80%',
        padding: 10,
        flex: 1,
    },
    backButtonStyle: {
        width: 16,
        height: 16,
        padding: 10,
    },
    sliderViewStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 50,
        marginVertical: 10,
    },
    headlineStyle: {
        color: '#16c72e',
        fontFamily: 'Inter-Regular',
        fontSize: 30,
        alignSelf: 'center',
        textAlign: 'center',
        marginVertical: 10,
    },
    sublineStyle: {
        color: '#D9D9D9',
        fontFamily: 'Inter-ExtraLight',
        fontSize: 14,
        alignSelf: 'center',
        marginVertical: 10,
    },
    linkStyle: {
        color: '#16c72e',
    },
    signUpButtonStyle: {
        backgroundColor: '#16c72e',
        justifyContent: 'center',
        width: '100%',
        height: 50,
        borderRadius: 5,
        marginVertical: 10,
    },
    signUpButtonTextStyle: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontSize: 18,
        fontFamily: 'Inter-Medium',
    },
    inputRow: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginVertical: 5,
    },
    signUpLabelStyle: {
        color: '#D9D9D9',
        fontSize: 14,
        fontFamily: 'Inter-ExtraLight',
    },
    inputStyle: {
        width: '100%',
        height: 50,
        padding: 10,
        color: '#FFFFFF',
        fontSize: 16,
        borderRadius: 5,
        backgroundColor: '#303030',
        marginVertical: 10,
    },
    inputFocusedStyle: {
        borderWidth: 1,
        borderColor: '#16c72e',
    },
    dataProtectionTextStyle: {
        color: '#D9D9D9',
        fontFamily: 'Inter-ExtraLight',
        fontSize: 10,
        alignSelf: 'center',
    },
    scrollViewWrapper: {
        height: 50,
        marginBottom: 10,
    },
    scrollViewContent: {
        flexGrow: 1,
    },
});

export default styles;