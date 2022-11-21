import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Sizes from '../constants/Sizes.constant';
import Colors from '../constants/Colors.constant';

const SubjectListScreen = () => {
  return <Text>Subjects here</Text>;
};

const styles = StyleSheet.create({
  header: {
    paddingVertical: Sizes.hugerH,
    paddingHorizontal: Sizes.huge,
  },
  loader: {
    width: '100%',
    marginBottom: Sizes.mediumLarge,
    flex: 1,
    position: 'absolute',
    bottom: 0,
  },
  loaderInner: {
    backgroundColor: Colors.tertiary,
    padding: Sizes.small,
    borderRadius: 1000,
  },
});

export default SubjectListScreen;
