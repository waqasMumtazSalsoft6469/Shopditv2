import {Dimensions, Platform, StyleSheet} from 'react-native';
import Shadows from '../../../helpers/Shadows';
import {colors} from '../../../utils/Colors';
import {family, size, vh} from '../../../utils';
import { colors2 } from '../../../theme/colors2';

const {width, height} = Dimensions.get('screen');
const styles = StyleSheet.create({
  amountContainer: {
    width: '100%',
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: 'white',
    ...Shadows.shadow3,
  },
  bottomContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    marginBottom: height * 0.155,
    backgroundColor: 'white',
  },

  cardStyle: {
    borderWidth: 1.5,
    borderColor: '#EDEDED',
    padding: 10,
    paddingHorizontal: 12,
    borderRadius: 50,
    backgroundColor: colors?.placeholderColor,
    fontSize: size.medium,
    fontFamily: family?.Gilroy_Medium,
    textColor: colors?.headingText,
    placeholderColor: colors2?.text?.light,
  },
  cardField: {
    padding: vh * 3,
    color: 'black',
  },
  paymentdetail: {
    flexDirection: 'row',
    gap: 5,
    marginLeft: '5%',
    marginBottom: 5,
    alignItems: 'center',
  },
  // New styles
  container: {
    flex: 1,
    justifyContent: 'center',
  },

  cardDetails: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },

  disabledButton: {
    backgroundColor: colors.gray,
    opacity: 0.7,
  },
});

export default styles;
