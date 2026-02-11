import React, {useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import CustomBackground from '../../../components/CustomBackground';
import CustomButton from '../../../components/CustomButton';
import {family, size, vw} from '../../../utils';
import {colors} from '../../../utils/Colors';
import CustomText from '../../../components/CustomText';
import CustomCheckbox from '../../../components/CustomCheckbox';
import {WIDTH} from '../../../theme/units';
import {useRoute} from '@react-navigation/native';
import {colors2} from '../../../theme/colors2';
import {preferenceData} from '../../../utils/dummyData';
import {LOG} from '../../../utils/helperFunction';
import {useRegisterMutation} from '../../../Api/authApiSlice';
import {executeApiRequest} from '../../../Api/methods/method';
import NavService from '../../../helpers/NavService';
import ActivityLoader from '../../../components/ActivityLoader';
import AppBackground from '../../../components/AppBackground';
import {useSelector} from 'react-redux';
import {useUpdatePreferencesMutation} from '../../../Api/profileApiSlice';

const categoryTitles = {
  diet: 'Do you follow any specific dietary lifestyle?',
  drinks: 'Pick your favorite drinks',
  interests: 'Which activities excite you the most?',
};

const PreferencesStepTwo = () => {
  const route = useRoute();
  const {preferencesStepOne} = route.params || {};

  const [updatePreferences, {isLoading}] = useUpdatePreferencesMutation();
  const userDetails = useSelector(state => state?.auth?.user || {});
  LOG('userDetails: ', userDetails);

  const initializePreferences = () => {
    const existing = userDetails?.preferences || [];
    const matchPrefs = category =>
      preferenceData[category].filter(item => existing.includes(item));

    return {
      diet: matchPrefs('diet'),
      drinks: matchPrefs('drinks'),
      interests: matchPrefs('interests'),
    };
  };

  const [selectedPreferences, setSelectedPreferences] = useState(
    initializePreferences,
  );

  const togglePreference = (category, value) => {
    setSelectedPreferences(prev => {
      const isSelected = prev[category]?.includes(value);
      const updated = isSelected
        ? prev[category].filter(item => item !== value)
        : [...(prev[category] || []), value];
      return {...prev, [category]: updated};
    });
  };

  const handleSubmit = async () => {
    const flattened = Object.values(selectedPreferences).flat(); // merge step 2

    const combinedPreferences = [
      ...(preferencesStepOne?.preferences || []),
      ...(flattened || []),
    ];

    const finalPayload = {
      preferences: combinedPreferences,
    };

    console.log('Final Payload: ', finalPayload);

    const response = await executeApiRequest({
      apiCallFunction: updatePreferences,
      body: finalPayload,
      toast: true,
      timeout: 30000,
    });
    console.log('RESPONSE: ', response);
    NavService?.navigate('editProfile');
  };

  const renderOptions = (category, options) => (
    <View style={styles.sectionContainer}>
      <CustomText
        text={categoryTitles[category]}
        size={size?.h6}
        font={family?.Gilroy_SemiBold}
        color={colors2?.text?.primary}
        style={{padding: 10, marginBottom: 10}}
      />
      <View style={styles.optionsContainer}>
        {options.map((option, index) => {
          const checked = selectedPreferences[category]?.includes(option);
          return (
            <View key={index} style={styles.optionRow}>
              <CustomCheckbox
                checked={checked}
                onChange={() => togglePreference(category, option)}
              />
              <CustomText
                text={option}
                size={size?.xxlarge}
                style={styles.optionText}
                color={colors?.headingText}
                font={family?.Questrial_Regular}
              />
            </View>
          );
        })}
      </View>
    </View>
  );
  return (
    <AppBackground
      back={true}
      title={'MORE ABOUT YOU'}
      description={`Just a few more preferences`}>
      <View style={{marginHorizontal: 20, paddingTop: 30}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{paddingBottom: 30}}>
          {renderOptions('diet', preferenceData.diet)}
          {renderOptions('drinks', preferenceData.drinks)}
          {renderOptions('interests', preferenceData.interests)}

          {isLoading ? (
            <ActivityLoader color={colors2.theme.secondary} />
          ) : (
            <CustomButton
              title="SUBMIT"
              customWidth={WIDTH - 55}
              buttonStyle={{
                alignSelf: 'center',
                borderRadius: 50,
                marginTop: 20,
              }}
              textStyle={{fontSize: size.large}}
              gradientColorArr={[colors.secondary, colors.secondary]}
              onPress={handleSubmit}
            />
          )}
        </ScrollView>
      </View>
    </AppBackground>
  );
};

export default PreferencesStepTwo;

const styles = StyleSheet.create({
  sectionContainer: {
    marginBottom: 24,
    // paddingHorizontal: 10,
  },

  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    marginBottom: 14,
  },
  optionText: {
    marginLeft: vw * 2,
  },
});
