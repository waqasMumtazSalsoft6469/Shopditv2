import {Dimensions, StyleSheet} from 'react-native';
import Shadows from '../../../helpers/Shadows';
import {colors} from '../../../utils/Colors';
import {family, size, vh, vw} from '../../../utils';
import {colors2} from '../../../theme/colors2';
const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  titleSection: {
    paddingHorizontal: 20,
    paddingVertical: 25,
    gap: 4,
  },
  item: {
    marginVertical: 6,
    width: '100%',
    flexDirection: 'row',
    flex: 1,
    gap: 5,
  },
  eventImg: {
    height: height * 0.215,
    width: '100%',
  },
  couponItems: {
    ...Shadows?.shadow5,
    backgroundColor: colors?.white,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    gap: 5,
  },
  secondContainerStyles: {
    width: '100%',
    height: height * 0.15,
    backgroundColor: colors?.white,
    ...Shadows?.shadow5,
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    paddingHorizontal: vw * 5,
    borderWidth: 1,
    borderColor: '#EFECEC',
  },
  deliverDetails: {
    width: '100%',
    backgroundColor: 'white',
    height: '20%',
    // marginTop: vh * 2,
    alignItems: 'center',
    borderRadius: 5,
    flexDirection: 'row',
    gap: 12,
    alignSelf: 'center',
    paddingHorizontal: 20,
    ...Shadows?.shadow3,
    height: height * 0.09,
    borderWidth: 1,
    borderColor: '#EFECEC',
  },
  summaryItem: {
    width: '100%',
    marginVertical: 10,
    paddingHorizontal: vw * 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  hr: {
    borderTopWidth: 1,
    borderColor: colors?.lightGrayLine,
    marginTop: 15,
    marginBottom: 15,
    width: '90%',
    alignSelf: 'center',
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
  cardDetails: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: vh*0.5,
    marginBottom: 20,
  },
  bottomContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    marginBottom: height * 0.155,
    backgroundColor: 'white',
  },
});

export default styles;
