import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    switchContainer: {
        flexDirection: 'row',
        width: 250,
        height: 50,
        backgroundColor: '#303030',
        borderRadius: 25,
        borderWidth: 0.2,
        borderColor: '#66ee78',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        overflow: 'hidden',
        marginVertical: 20,
    },
    innerShadow: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 25,
        shadowColor: '#000000',
        shadowOffset: { width: -5, height: -5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
    },
    slider: {
        position: 'absolute',
        width: 125,
        height: '100%',
        backgroundColor: '#16c72e',
        borderRadius: 20,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
    },
    option: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontFamily: 'Inter-Regular',
        fontSize: 18,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 0.2,
    }
});

export default styles;