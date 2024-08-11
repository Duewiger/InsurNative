import React, { useState, useRef, useEffect } from 'react';
import { Text, View, TouchableOpacity, Animated, PanResponder } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from './SliderSmall.styles';

const SliderSmall = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const position = useRef(new Animated.Value(0)).current;
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    if (route.name === 'Login') {
      Animated.spring(position, {
        toValue: 100,
        useNativeDriver: false,
      }).start();
      setIsLogin(true);
    } else if (route.name === 'SignUp') {
      Animated.spring(position, {
        toValue: 0,
        useNativeDriver: false,
      }).start();
      setIsLogin(false);
    }
  }, [route.name, position]);

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
        if (gestureState.moveX > 75) {
          Animated.spring(position, {
            toValue: 100,
            useNativeDriver: false,
          }).start();
          setIsLogin(true);
        } else {
          Animated.spring(position, {
            toValue: 0,
            useNativeDriver: false,
          }).start();
          setIsLogin(false);
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
                inputRange: [0, 100],
                outputRange: [0, 100],
                extrapolate: 'clamp',
              })
            }]
          }
        ]}
        {...panResponder.panHandlers}
      />
      <TouchableOpacity style={styles.option} onPress={() => handlePress(0)}>
        <Text style={[styles.text, { color: isLogin ? '#8E8E8E' : '#FFFFFF' }]}>Registrieren</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={() => handlePress(100)}>
        <Text style={[styles.text, { color: isLogin ? '#FFFFFF' : '#8E8E8E' }]}>Einloggen</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SliderSmall;