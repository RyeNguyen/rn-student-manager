import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';

import Colors from '../constants/Colors.constant';
import Sizes from '../constants/Sizes.constant';
import TextStyles from '../styles/Text.style';
import LayoutStyles from '../styles/Layout.style';

const SubjectCard = ({data, handlePress}) => {
  const {id, name, classroom, teacher} = data;

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[LayoutStyles.layoutShadow, styles.card]}>
      <Text style={TextStyles.textSmall}>Subject #{id}</Text>
      <Text style={TextStyles.h3}>{name}</Text>
      <Text style={TextStyles.textMain}>
        <Text style={TextStyles.textSmall}>Classroom: </Text>
        {classroom}
      </Text>
      <Text style={TextStyles.textMain}>
        <Text style={TextStyles.textSmall}>Teacher: </Text>
        {teacher}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: Sizes.hugerH,
    marginHorizontal: Sizes.huge,
    paddingVertical: Sizes.mediumLargeH,
    paddingHorizontal: Sizes.medium,
    borderWidth: 2,
    borderRadius: Sizes.mediumLarge,
    borderColor: Colors.tertiary,
    borderStyle: 'dashed',
    backgroundColor: Colors.primary,
  },
});

export default SubjectCard;
