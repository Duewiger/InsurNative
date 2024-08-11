import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    screenStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#252525',
    },
    cardStyle: {
        marginTop: 50,
        width: '80%',
        height: '80%',
        alignSelf: 'center',
        backgroundColor: '#303030',
        borderRadius: 20,
        elevation: 5,
        padding: 30,
        justifyContent: 'space-between',
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    headingStyle: {
        color: '#FFFFFF',
        fontSize: 18,
        fontFamily: 'Inter-Regular',
        marginVertical: 10,
    },
    textStyle: {
        color: '#D9D9D9',
        fontSize: 14,
        fontFamily: 'Inter-ExtraLight',
        marginVertical: 5,
    },
    cookieButtonViewStyle: {
        justifyContent: 'flex-end',
        marginVertical: 20,
    },
    cookieSubmitTextStyle: {
        color: '#FFFFFF',
        textAlign: 'center',
        width: '100%',
        fontSize: 16,
        fontFamily: 'Inter-Medium',
    },
    cookieSubmitButtonStyle: {
        backgroundColor: '#16c72e',
        justifyContent: 'center',
        width: '100%',
        height: 40,
        borderRadius: 5,
        marginVertical: 5,
    },
    cookieDisableInfoTextStyle: {
        color: '#FFFFFF',
        textAlign: 'center',
        width: '100%',
        fontSize: 16,
        fontFamily: 'Inter-Medium',
    },
    cookieDisableInfoButtonStyle: {
        backgroundColor: '#1E1E1E',
        justifyContent: 'center',
        width: '100%',
        height: 40,
        borderRadius: 5,
        marginVertical: 5,
    },
    dataProtectionLinkViewStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dataProtectionTextStyle: {
        color: '#FFFFFF',
        fontSize: 12,
        fontFamily: 'Inter-Medium',
    },
});

export default styles;