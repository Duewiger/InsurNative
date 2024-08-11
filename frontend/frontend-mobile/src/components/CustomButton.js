import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import IconWrapper from './IconWrapper';
import styles from './CustomButton.styles';

const CustomButton = ({ onPress, iconLibrary, iconName, iconSize, iconColor, textStyle, children }) => (
  <TouchableOpacity onPress={onPress} style={styles.button}>
    <IconWrapper library={iconLibrary} name={iconName} size={iconSize} color={iconColor} style={styles.icon} />
    <Text style={textStyle}>{children}</Text>
  </TouchableOpacity>
);

export default CustomButton;