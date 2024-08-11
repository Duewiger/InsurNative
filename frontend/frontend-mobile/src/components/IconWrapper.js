import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const IconWrapper = ({ library, name, size, color, style }) => {
  let IconComponent;

  switch (library) {
    case 'FontAwesome':
      IconComponent = FontAwesome;
      break;
    case 'MaterialIcons':
      IconComponent = MaterialIcons;
      break;
    default:
      throw new Error('Invalid icon library');
  }

  return <IconComponent name={name} size={size} color={color} style={style} />;
};

export default IconWrapper;