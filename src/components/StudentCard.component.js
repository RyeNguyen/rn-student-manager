import React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';

import Colors from '../constants/Colors.constant';
import Sizes from '../constants/Sizes.constant';
import TextStyles from '../styles/Text.style';
import LayoutStyles from '../styles/Layout.style';

const StudentCard = ({data, handlePress}) => {
  const {id, name, age, email, avatar} = data;

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[LayoutStyles.layoutShadow, styles.card]}>
      <View style={LayoutStyles.layoutStretch}>
        <View style={styles.info}>
          <View style={styles.infoItem}>
            <Text
              style={[
                TextStyles.textSmall,
                TextStyles.textUppercase,
                styles.label,
              ]}>
              student's name
            </Text>
            <Text numberOfLines={1} style={TextStyles.textMain}>
              {name}
            </Text>
          </View>

          <View style={styles.infoItem}>
            <Text
              style={[
                TextStyles.textSmall,
                TextStyles.textUppercase,
                styles.label,
              ]}>
              student's ID
            </Text>
            <Text numberOfLines={1} style={TextStyles.textMain}>
              #{id}
            </Text>
          </View>
        </View>

        <Image source={{uri: avatar}} style={styles.avatar} />
      </View>

      <View style={LayoutStyles.layoutStretch}>
        <View style={styles.infoItem}>
          <Text
            style={[
              TextStyles.textSmall,
              TextStyles.textUppercase,
              styles.label,
            ]}>
            age
          </Text>
          <Text numberOfLines={1} style={TextStyles.textMain}>
            {age}
          </Text>
        </View>

        <View style={styles.infoItem}>
          <Text
            style={[
              TextStyles.textSmall,
              TextStyles.textUppercase,
              styles.label,
            ]}>
            email
          </Text>
          <Text numberOfLines={1} style={TextStyles.textMain}>
            {email}
          </Text>
        </View>
      </View>
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
  info: {
    flex: 1,
  },
  infoItem: {
    marginBottom: Sizes.medium,
  },
  label: {
    marginBottom: Sizes.smallestH,
  },
  avatar: {
    borderRadius: Sizes.mediumLarge,
    borderWidth: 2,
    borderColor: Colors.white,
    width: Sizes.massive * 2,
    height: Sizes.massive * 2,
    marginLeft: Sizes.mediumLarge,
  },
});

export default StudentCard;
