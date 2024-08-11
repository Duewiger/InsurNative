import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    dot: {
        width: 30,
        height: 5,
        borderRadius: 5,
        backgroundColor: '#FFFFFF',
        marginHorizontal: 5,
        marginTop: 100,
    },
    activeDot: {
        backgroundColor: '#16c72e',
    },
});

export default styles;