import React, { useEffect } from "react";
import { View } from 'react-native';
import styles from "./Pagination.styles";

const Pagination = ({ currentIndex, items }) => {
    return (
        <View style={styles.container}>
            {items.map((_, index) => (
                <View
                    key={index}
                    style={[
                        styles.dot,
                        currentIndex === index && styles.activeDot,
                    ]}
                />
            ))}
        </View>
    );
};

export default Pagination;