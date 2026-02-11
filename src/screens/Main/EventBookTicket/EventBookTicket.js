import React, {useState} from 'react';
import {View, Text, Dimensions, ScrollView} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import CustomTextInput from '../../../components/CustomTextInput';
import {colors} from '../../../utils/Colors';
import {family, size} from '../../../utils';
import styles from '../EditProfile/styles';
import CustomButton from '../../../components/CustomButton';
import {appIcons} from '../../../assets';
import AppBackground from '../../../components/AppBackground';
import {SelectList} from 'react-native-dropdown-select-list';
import CustomText from '../../../components/CustomText';
import NavService from '../../../helpers/NavService';
import {LOG} from '../../../utils/helperFunction';
import {useBookMutation} from '../../../Api/EventsApiSlice';
import {executeApiRequest} from '../../../Api/methods/method';
import ActivityLoader from '../../../components/ActivityLoader';
import {colors2} from '../../../theme/colors2';

const {width, height} = Dimensions.get('screen');

const SignupSchema = Yup.object().shape({
  participantName: Yup.string().required('Participant Name is required'),
  participantAge: Yup.number()
    .typeError('Invalid age, enter a number')
    .min(1, 'Minimum age is 1')
    .max(130, 'Maximum age is 130')
    .required('Participant age is required'),
  participants: Yup.string().required('Participants is required'),
});

const data = [
  {key: '1', value: '1'},
  {key: '2', value: '2'},
  {key: '3', value: '3'},
];

const EventBookTicket = ({route}) => {
  const {eventDetails} = route.params;
  LOG('EventDetailss: ', eventDetails);
  const [focusedField, setFocusedField] = useState('');
  const [book, {isLoading}] = useBookMutation();

  const handleBook = async values => {
    LOG('Values: ', values);

    let payload = {
      ...values,
      eventId: eventDetails?._id,
    };

    // LOG('payload: ', payload);
    // const response = await executeApiRequest({
    //   apiCallFunction: book,
    //   body: payload,
    //   toast: true,
    //   timeout: 30000,
    // });
    // LOG('Event Book: ', response);
    NavService?.navigate('EventCheckout', {
      payload: payload,
      eventDetails: eventDetails,
    });
    // NavService.navigate('EventCheckout', { participants: values.participants, eventDetail });
  };

  return (
    <Formik
      initialValues={{
        participantName: '',
        participantAge: '',
        participants: '',
      }}
      validationSchema={SignupSchema}
      onSubmit={handleBook}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        setFieldValue,
      }) => (
        <AppBackground back={true} title={'EVENT BOOK TICKET'} notification>
          <View style={{paddingHorizontal: 15, marginTop: height * 0.03}}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{marginBottom: height * 0.03}}>
              <View style={styles.field}>
                <CustomTextInput
                  textInputTitle={true}
                  staric={true}
                  labelTitle={'Participant Name'}
                  onFocus={() => setFocusedField('participantName')}
                  onBlur={() => {
                    handleBlur('participantName');
                    setFocusedField('');
                  }}
                  onChangeText={handleChange('participantName')}
                  placeholder="Enter Participant Name"
                  placeholderTextColor={colors?.placeholderText}
                  autoCapitalize="none"
                  value={values.participantName}
                  leftIcon={appIcons?.gender}
                  containerStyle={[
                    styles.input,
                    focusedField === 'participantName' && styles.focusedInput,
                  ]}
                />
                {errors.participantName && touched.participantName && (
                  <Text style={styles.error}>{errors.participantName}</Text>
                )}
              </View>

              <View style={styles.field}>
                <CustomTextInput
                  textInputTitle={true}
                  staric={true}
                  labelTitle={'Participant Age'}
                  onFocus={() => setFocusedField('participantAge')}
                  onBlur={() => {
                    handleBlur('participantAge');
                    setFocusedField('');
                  }}
                  onChangeText={handleChange('participantAge')}
                  placeholder="Enter Participant Age"
                  placeholderTextColor={colors?.placeholderText}
                  autoCapitalize="none"
                  keyboardType="numeric"
                  value={values.participantAge}
                  leftIcon={appIcons?.gender}
                  containerStyle={[
                    styles.input,
                    focusedField === 'participantAge' && styles.focusedInput,
                  ]}
                />
                {errors.participantAge && touched.participantAge && (
                  <Text style={styles.error}>{errors.participantAge}</Text>
                )}
              </View>

              <View style={styles.field}>
                <View style={{paddingHorizontal: 20, flexDirection: 'row'}}>
                  <CustomText
                    text={'Participants'}
                    font={family?.Questrial_Regular}
                    size={size?.large}
                  />
                  <CustomText
                    text={'*'}
                    font={family?.Questrial_Regular}
                    size={size?.h5}
                    color={colors?.red}
                  />
                </View>
                <SelectList
                  leftIcon={appIcons?.gender}
                  setSelected={value => setFieldValue('participants', value)}
                  search={false}
                  placeholder="Select"
                  data={data}
                  save="value"
                  dropdownTextStyles={{color: colors?.text}}
                  dropdownStyles={{
                    borderWidth: 1,
                    borderColor: colors?.primary,
                  }}
                  boxStyles={[
                    styles?.input,
                    focusedField === 'participants' && styles.focusedInput,
                    {paddingVertical: 15, paddingHorizontal: 18},
                  ]}
                  inputStyles={{
                    color: colors?.placeholderText,
                    fontSize: size?.medium,
                    fontFamily: family?.Questrial_Regular,
                  }}
                />
                {errors.participants && touched.participants && (
                  <Text style={styles.error}>{errors.participants}</Text>
                )}
              </View>

              <View style={{marginTop: height * 0.04}}>
                {isLoading ? (
                  <ActivityLoader color={colors2.theme.secondary} />
                ) : (
                  <CustomButton
                    gradientColorArr={[colors.secondary, colors.secondary]}
                    title={'CHECKOUT'}
                    customWidth={width - 55}
                    buttonStyle={{alignSelf: 'center', borderRadius: 50}}
                    textStyle={{fontSize: size.large}}
                    onPress={handleSubmit}
                  />
                )}
              </View>
            </ScrollView>
          </View>
        </AppBackground>
      )}
    </Formik>
  );
};

export default EventBookTicket;
