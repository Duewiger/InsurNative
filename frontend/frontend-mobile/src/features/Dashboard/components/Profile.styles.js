import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
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
    profileContainerStyle: {
        flex: 1,
        backgroundColor: '#141414',
        padding: 20,
    },
    scrollViewContentStyle: {
        flexGrow: 1,
        paddingBottom: 20,
    },
    profileImageContainerStyle: {
        flexDirection: "row",
        marginVertical: 25,
        justifyContent: "space-around",
    },
    profileSubWrapperStyle: {
        flexDirection: "column",
        justifyContent: "center",
    },
    logoutButtonStyle: {
        justifyContent: 'center',
        width: 100,
        height: 25,
        borderWidth: 1,
        borderColor: '#16c72e',
        borderRadius: 5,
        marginTop: 25,
    },
    logoutButtonTextStyle: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontSize: 14,
        fontFamily: 'Inter-Medium',
    },
    profileImageTextStyle: {
        fontSize: 16,
        fontFamily: 'Inter-Medium',
        color: '#FFFFFF',
        marginTop: 10,
    },
    profileImageWrapperStyle: {
        position: 'relative',
        width: 75,
        height: 75,
    },
    profileImageStyle: {
        width: 75,
        height: 75,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#66ee78',
    },
    cameraIconStyle: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        width: 30,
        height: 30,
    },
    profileDataContainerStyle: {
        width: '100%',
        marginVertical: 25,
        marginBottom: 50,
    },
    profileDataHeadingStyle: {
        fontSize: 16,
        fontFamily: 'Inter-Medium',
        color: '#FFFFFF',
        padding: 5,
    },
    profileBoxStyle: {
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#303030',
        borderRadius: 10,
        padding: 10,
        marginVertical: 10,
    },
    profileBoxTextStyle: {
        color: '#A5A5A5',
        fontFamily: 'Inter-Medium',
        fontSize: 12,
    },
    profileDataTextStyle: {
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
});

export default styles;