import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    screenStyle: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#141515',
    },
    screenContainerStyle: {
        width: '90%',
        padding: 10,
        flex: 1,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 50,
        marginVertical: 20,
        width: '100%',
    },
    headlineStyle: {
        color: '#FFFFFF',
        fontFamily: 'Inter-Regular',
        fontSize: 30,
    },
    uploadContainerStyle: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    sublineStyle: {
        color: '#FFFFFF',
        fontFamily: 'Inter-Regular',
        fontSize: 24,
        textAlign: 'center',
        paddingTop: 25,
        marginLeft: 5,
        marginBottom: 10,
    },
    uploadButtonStyle: {
        backgroundColor: '#16c72e',
        justifyContent: 'center',
        width: '100%',
        height: 50,
        borderRadius: 5,
        marginHorizontal: 10,
        marginVertical: 10,
    },
    uploadButtonTextStyle: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'Inter-Medium',
    },
    userIcon: {
        padding: 5,
    },
    fileIcon: {
        padding: 5,
    },
    settingsIcon: {
        padding: 5,
    },
    stickyContainer: {
        position: 'sticky',
        top: 0,
        zIndex: 1,
        width: '100%',
        backgroundColor: '#141515',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
        backgroundColor: '#303030',
        borderRadius: 5,
        width: '100%',
        height: 50,
        paddingHorizontal: 10,
    },
    inputStyle: {
        flex: 1,
        color: '#FFFFFF',
        fontSize: 18,
        fontFamily: 'Inter-Light',
        padding: 5,
    },
    inputFocusedStyle: {
        borderWidth: 1,
        borderColor: '#16c72e',
    },
    microIcon: {
        marginHorizontal: 15,
    },
    searchIcon: {
        marginHorizontal: 5,
    },
    boxContainer: {
        width: '100%',
        marginVertical: 10,
        marginBottom: 50,
    },
    boxStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#303030',
        borderRadius: 10,
        padding: 20,
        marginVertical: 10,
    },
    documentInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    boxHeadlineStyle: {
        color: '#D9D9D9',
        fontFamily: 'Inter-Medium',
        fontSize: 12,
        textAlign: 'center',
        flex: 1,
    },
    trashIcon: {
        padding: 5,
    },
    scrollViewContent: {
        flexGrow: 1,
        paddingBottom: 20,
    },
});

export default styles;