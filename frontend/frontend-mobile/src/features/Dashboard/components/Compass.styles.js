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
        marginVertical: 25,
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
    representativeBoxTextStyle: {
        color: '#A5A5A5',
        fontFamily: 'Inter-Medium',
        fontSize: 12,
    },
    representativeDataTextStyle: {
        color: '#FFFFFF',
        fontFamily: 'Inter-Medium',
        fontSize: 14,
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
    hotlineButtonStyle: {
        width: '100%',
        borderRadius: 10,
        backgroundColor: '#16c72e',
        padding: 10,
        marginVertical: 10,
    },
    hotlineButtonTextStyle: {
        fontSize: 16,
        color: '#ffffff',
        textAlign: 'center',
    },
    googleMapsMapStyle: {
        width: "100%",
        height: 200,
        marginVertical: 25,
        borderRadius: 10,
    },
});

export default styles;