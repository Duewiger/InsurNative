import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    compassScreenStyle: {
        flex: 1,
        backgroundColor: '#141414',
        padding: 20,
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
    compassContainerStyle: {
        width: '100%',
        flexDirection: "column",
        justifyContent: "center",
        marginVertical: 10,
        marginBottom: 100,
    },
    sublineStyle: {
        color: '#A5A5A5',
        fontSize: 14,
        fontFamily: 'Inter-Light',
        marginHorizontal: 10,
        marginBottom: 25,
    },
    representativeBoxStyle: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: '#303030',
        borderRadius: 10,
        padding: 10,
        marginVertical: 5,
    },
    representativeHeadingStyle: {
        fontSize: 16,
        fontFamily: 'Inter-Medium',
        color: '#FFFFFF',
        padding: 5,
    },
    representativeDataTextStyle: {
        color: '#FFFFFF',
        fontFamily: 'Inter-Medium',
        fontSize: 14,
    },
    representativeProfileBoxStyle: {
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#303030',
        borderRadius: 10,
        padding: 10,
        marginVertical: 5,
    },
    representativeProfileBoxTextStyle: {
        color: '#A5A5A5',
        fontFamily: 'Inter-Medium',
        fontSize: 10,
    },
    representativeProfileDataTextStyle: {
        color: '#FFFFFF',
        fontFamily: 'Inter-Medium',
        fontSize: 16,
    },
    representativeTextWrapper: {
        flexDirection: "column",
    },
    representativeImageWrapper: {
        flexDirection: "column",
    },
    representativeImageStyle: {
        width: 75,
        height: 75,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#66ee78',
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
        fontSize: 16,
        fontFamily: 'Inter-Medium',
    },
    emailButtonStyle: {
        width: '100%',
        borderRadius: 10,
        backgroundColor: '#16c72e',
        padding: 10,
        marginVertical: 10,
    },
    emailButtonTextStyle: {
        fontSize: 16,
        color: '#ffffff',
        textAlign: 'center',
        fontFamily: 'Inter-Medium',
    },
    compassEmailTextInputStyle: {
        width: "100%",
        height: 250,
        marginVertical: 10,
        borderRadius: 10,
        padding: 25,
        color: "#000000",
        fontFamily: 'Inter-Medium',
        fontSize: 16,
        backgroundColor: '#F9F9F9',
        textAlign: 'left',
        textAlignVertical: 'top',
    },
});

export default styles;