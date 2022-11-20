import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

import LayoutStyles from '../styles/Layout.style';
import TextStyles from '../styles/Text.style';
import Sizes from '../constants/Sizes.constant';
import Colors from '../constants/Colors.constant';

const InputField = ({
  label,
  placeholder,
  value,
  keyboardType = 'default',
  maxLength = 20,
  handleChange,
}) => {
  return (
    <View style={styles.inputField}>
      <Text style={[TextStyles.textMain]}>{label}</Text>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="rgba(255, 255, 255, 0.5)"
        style={styles.input}
        autoCapitalize="words"
        autoCorrect={false}
        defaultValue={value}
        cursorColor={Colors.white}
        keyboardType={keyboardType}
        maxLength={maxLength}
        returnKeyType="done"
        selectionColor={Colors.tertiary}
        onChangeText={newText => handleChange(newText)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputField: {
    marginHorizontal: Sizes.huge,
    marginBottom: Sizes.hugerH * 2,
  },
  input: {
    borderBottomWidth: 2,
    borderColor: Colors.tertiary,
    borderStyle: 'dashed',
    color: Colors.white,
    fontFamily: 'Inconsolata-Medium',
    fontSize: Sizes.mediumLarge,
  },
});

export default InputField;
