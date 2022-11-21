import {StyleSheet} from 'react-native';

import Colors from '../constants/Colors.constant';
import Sizes from '../constants/Sizes.constant';

module.exports = StyleSheet.create({
  h1: {
    fontFamily: 'Inconsolata_Expanded-Black',
    fontSize: Sizes.huger,
    color: Colors.white,
  },
  h2: {
    fontFamily: 'Inconsolata_Expanded-Black',
    fontSize: Sizes.huge,
    color: Colors.white,
  },
  h3: {
    fontFamily: 'Inconsolata-Bold',
    fontSize: Sizes.larger,
    color: Colors.white,
  },
  h4: {
    fontFamily: 'Inconsolata-ExtraBold',
    fontSize: Sizes.large,
    color: Colors.white,
  },
  textMain: {
    fontFamily: 'Inconsolata-Medium',
    fontSize: Sizes.mediumLarge,
    color: Colors.white,
  },
  textSmall: {
    fontFamily: 'Inconsolata-Regular',
    fontSize: Sizes.mediumSmall,
    color: Colors.white,
  },
  textBold: {
    fontWeight: '900',
  },
  textUppercase: {
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  textDark: {
    color: Colors.primary,
  },
});
