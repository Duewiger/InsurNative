import React, { useState, useRef, useEffect } from 'react';
import { Text, View, TouchableOpacity, Animated, PanResponder } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './Slider.styles';

const Slider = () => {
  const navigation = useNavigation();
  const position = useRef(new Animated.Value(0)).current;
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    position.addListener(({ value }) => {
      setIsLogin(value < 75);
    });

    return () => {
      position.removeAllListeners();
    };
  }, []);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderMove: (e, gestureState) => {
        position.setValue(gestureState.dx);
      },
      onPanResponderRelease: (e, gestureState) => {
        if (gestureState.dx > 75) {
          Animated.spring(position, {
            toValue: 150,
            useNativeDriver: false,
          }).start();
          setIsLogin(false);
        } else {
          Animated.spring(position, {
            toValue: 0,
            useNativeDriver: false,
          }).start();
          setIsLogin(true);
        }
      },
    })
  ).current;

  const handlePress = (targetPosition) => {
    Animated.spring(position, {
      toValue: targetPosition,
      useNativeDriver: false,
    }).start(() => {
      if (targetPosition === 0) {
        navigation.replace('SignUp');
      } else {
        navigation.replace('Login');
      }
    });
  };

  return (
    <View style={styles.switchContainer}>
      <View style={styles.innerShadow} />
      <Animated.View
        style={[
          styles.slider,
          {
            transform: [{
              translateX: position.interpolate({
                inputRange: [0, 125],
                outputRange: [0, 125],
                extrapolate: 'clamp',
              })
            }]
          }
        ]}
        {...panResponder.panHandlers}
      />
      <TouchableOpacity style={styles.option} onPress={() => handlePress(0)}>
        <Text style={[styles.text, { color: isLogin ? '#FFFFFF' : '#C0C0C0' }]}>Registrieren</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={() => handlePress(150)}>
        <Text style={[styles.text, { color: isLogin ? '#C0C0C0' : '#FFFFFF' }]}>Einloggen</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Slider;