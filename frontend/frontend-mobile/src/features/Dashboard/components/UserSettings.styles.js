import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    settingsContainerStyle: {
        flex: 1,
        backgroundColor: '#141414',
        padding: 20,
    },
    scrollViewContentStyle: {
        flexGrow: 1,
        paddingBottom: 20,
    },
    headerStyle: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'left',
        marginTop: 40,
        borderBottomWidth: 0.2,
        borderColor: '#16c72e',
    },
    backButtonContainerStyle: {
        justifyContent: "center",
    },
    backButtonStyle: {
        width: 16,
        height: 16,
        padding: 10,
    },
    headerTitleStyle: {
        fontSize: 24,
        color: '#16c72e',
        fontFamily: 'Inter-Light',
        marginBottom: 5,
        marginHorizontal: 30,
    },
    settingsDataContainerStyle: {
        width: '100%',
        marginVertical: 25,
    },
    settingsDataHeadingStyle: {
        fontSize: 16,
        fontFamily: 'Inter-Medium',
        color: '#FFFFFF',
        padding: 5,
    },
    settingsBoxStyle: {
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#303030',
        borderRadius: 10,
        padding: 15,
        marginVertical: 10,
    },
    settingsBoxTextStyle: {
        color: '#A5A5A5',
        fontFamily: 'Inter-Medium',
        fontSize: 14,
    },
    settingsDataTextStyle: {
        color: '#FFFFFF',
        fontFamily: 'Inter-Medium',
        fontSize: 16,
    },
    dataProtectionLinkViewStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    dataProtectionTextStyle: {
        color: '#FFFFFF',
        fontSize: 12,
        fontFamily: 'Inter-Medium',
    },
    saveButtonStyle: {
        backgroundColor: '#16c72e',
        justifyContent: 'center',
        width: '100%',
        height: 50,
        borderRadius: 5,
        marginVertical: 10,
    },
    saveButtonTextStyle: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontSize: 18,
        fontFamily: 'Inter-Medium',
    },
});

export default styles;