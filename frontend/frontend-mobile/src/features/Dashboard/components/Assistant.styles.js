import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    screenStyle: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#252525',
        padding: 10,
    },
    headlineStyle: {
        fontSize: 16,
        color: '#ffffff',
        fontFamily: 'Inter-Regular',
        marginTop: 50,
        padding: 10,
    },
    sublineStyle: {
        color: '#A5A5A5',
        fontSize: 14,
        fontFamily: 'Inter-Light',
        marginVertical: 10,
        marginHorizontal: 10,
    },
    animationStyle: {
        width: 75,
        height: 75,
        marginHorizontal: 10,
    },
    howToTextStyle: {
        color: '#ffffff',
        fontSize: 14,
        fontFamily: 'Inter-Light',
        alignSelf: 'center',
        marginVertical: 10,
        marginHorizontal: 20,
    },
    howToContainerStyle: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 55,
        marginTop: 10,
    },
    chatContainerStyle: {
        flex: 1,
        justifyContent: 'flex-end',
        width: '100%',
        height: 300,
        backgroundColor: '#0D0D0D',
        marginVertical: 25,
        borderRadius: 20,
        padding: 20,
    },
    messageResultWrapper: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        paddingBottom: 20,
    },
    messageResultStyle: {
        color: '#FFFFFF',
    },
    messageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#303030',
        width: '100%',
        height: 50,
        paddingHorizontal: 10,
        borderRadius: 20,
        marginVertical: 10,
    },
    inputStyle: {
        flex: 1,
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'Inter-Regular',
        padding: 5,
    },
    inputFocusedStyle: {
        borderWidth: 1,
        borderColor: '#16c72e',
    },
    attachementIcon: {
        marginHorizontal: 5,
    },
    microIcon: {
        marginHorizontal: 10,
    },
    sendIcon: {
        marginHorizontal: 10,
    },
    legalTextStyle: {
        fontSize: 12,
        color: '#A5A5A5',
        textAlign: 'center',
    },
    icon: {
        padding: 5,
        borderRadius: 10,
    },
    iconPressed: {
        padding: 5,
        borderRadius: 10,
        backgroundColor: '#e0e0e0',
    },
});

export default styles;