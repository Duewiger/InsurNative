import React, { useState } from "react";
import { Dimensions, SafeAreaView, View } from 'react-native';
import styles from "./Highlights.styles";
import CarouselItem1 from './components/CarouselItem1';
import CarouselItem2 from './components/CarouselItem2';
import CarouselItem3 from './components/CarouselItem3';
import Carousel from 'react-native-reanimated-carousel';
import Pagination from './components/Pagination';

const { width, height } = Dimensions.get('screen');

const carouselItems = [
    { key: '1', component: <CarouselItem1 /> },
    { key: '2', component: <CarouselItem2 /> },
    { key: '3', component: <CarouselItem3 /> },
];

const Highlights = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const renderItem = ({ item }) => {
        return <View style={styles.screenStyle}>{item.component}</View>;
    };

    return (
        <SafeAreaView style={styles.screenStyle}>
            <Pagination
                currentIndex={currentIndex} 
                items={carouselItems} 
            />
            <Carousel
                data={carouselItems}
                renderItem={renderItem}
                width={width}
                height={height}
                scrollAnimationDuration={0}
                onSnapToItem={(index) => setCurrentIndex(index)}
            />
        </SafeAreaView>
    );
};

export default Highlights;