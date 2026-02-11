import {Dimensions, StyleSheet} from 'react-native';
import {colors} from '../../../utils/Colors';
import {family, size, vh, vw} from '../../../utils';

const {width, height} = Dimensions.get('screen');
export const styles = StyleSheet.create({
  input: {
    borderWidth: 1.5,
    borderColor: '#EDEDED',
    padding: 10,
    paddingHorizontal: 12,
    borderRadius: 50,
    marginBottom: 10,
    backgroundColor: colors?.placeholderColor,
    fontSize: size.medium,
    fontFamily: family?.Gilroy_SemiBold,
  },
  focusedInput: {
    borderColor: colors?.iconColor,
  },
  titleSection: {
    paddingHorizontal: 20,
    gap: 3,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  item: {
    marginVertical: 5,
    // height: height * 0.18,
    padding: 10,
    borderRadius: 10,
  },
  hr: {
    borderTopWidth: 1,
    borderColor: colors?.lightGrayLine,
    marginTop: 15,
    marginBottom: 15,
    width: '90%',
    alignSelf: 'center',
  },
  workItems: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  imageContainer: {
    width: width / 3 - 23,
    height: width / 3 - 23,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    margin: 5,
  },
  galleryRow: {
    // justifyContent: 'space-between',
  },
  galleryList: {
    marginTop: height * 0.015,
  },
  nameContainer: {
    zIndex: 1,
    padding: 10,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: vw * 2,
    marginBottom: vh * 2,
  },
  iconContainer: {
    width: '22%',
    height: vh * 10,
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: 'center',
  },
  submitButton: {
    paddingHorizontal: vw * 8,
    paddingVertical: vh * 2,
    borderRadius: vw * 2,
    alignItems: 'center',
    minWidth: vw * 40,
  },
});
