import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

import LayoutStyles from '../styles/Layout.style';
import TextStyles from '../styles/Text.style';
import Sizes from '../constants/Sizes.constant';
import Colors from '../constants/Colors.constant';

const Button = ({text, handlePress}) => {
  return (
    <TouchableOpacity
      style={[styles.button, LayoutStyles.layoutCenter]}
      onPress={handlePress}>
      <Text style={[TextStyles.textMain, TextStyles.textDark]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: Sizes.mediumH,
    paddingHorizontal: Sizes.medium,
    borderRadius: Sizes.mediumLarge,
    backgroundColor: Colors.tertiary,
  },
});

export default Button;
