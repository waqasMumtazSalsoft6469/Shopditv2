import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomBackground from '../../../components/CustomBackground';
import CustomButton from '../../../components/CustomButton';
import {family, size, vh, vw} from '../../../utils';
import {colors} from '../../../utils/Colors';
import CustomText from '../../../components/CustomText';
import CustomCheckbox from '../../../components/CustomCheckbox';
import {WIDTH} from '../../../theme/units';
import {colors2} from '../../../theme/colors2';
import NavService from '../../../helpers/NavService';
import {preferenceData} from '../../../utils/dummyData';
import {LOG} from '../../../utils/helperFunction';
import {showToast} from '../../../utils/toast';

const categoryTitles = {
  vibe: 'How would you describe yourself?',
  freeTime: 'What do you enjoy in your free time?',
  food: 'What food do you love the most?',
};

const AuthPreference = ({route}) => {
  const item = route?.params;
  console.log('ITEM: ', item);
  const [selectedPreferences, setSelectedPreferences] = useState({
    vibe: [],
    freeTime: [],
    food: [],
  });

  const togglePreference = (category, value) => {
    setSelectedPreferences(prev => {
      const isSelected = prev[category]?.includes(value);
      const updated = isSelected
        ? prev[category].filter(item => item !== value)
        : [...(prev[category] || []), value];
      return {...prev, [category]: updated};
    });
  };

  const handleSubmit = () => {
    const flattened = Object.values(selectedPreferences).flat(); // Merge all arrays

    const payload = {
      preferences: flattened,
    };

    if (payload.preferences.length === 0) {
      showToast('Please select at least one preference or skip for now');
      return;
    } else {
      NavService.navigate('authpreferencesTwo', {
        preferencesStepOne: payload,
        signupItem: item?.signupItem,
      });
    }
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
    <CustomBackground
      back={true}
      titleText={'PREFERENCES'}
      descriptionText={`Let's personalize your experience`}>
      <View style={{marginHorizontal: 20, paddingTop: 30}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{paddingBottom: 10}}>
          {renderOptions('vibe', preferenceData.vibe)}
          {renderOptions('freeTime', preferenceData.freeTime)}
          {renderOptions('food', preferenceData.food)}

          <CustomButton
            gradientColorArr={[colors.secondary, colors.secondary]}
            title={'CONTINUE'}
            customWidth={WIDTH - 65}
            buttonStyle={{alignSelf: 'center', borderRadius: 50, marginTop: 20}}
            textStyle={{fontSize: size.large}}
            onPress={handleSubmit}
          />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: '5%',
            }}>
            <CustomText
              text={'No time? '}
              font={family?.Gilroy_SemiBold}
              size={size?.medium}
              color={colors?.blackShade}
            />
            <TouchableOpacity
              activeOpacity={0.6}
              style={{padding: 2}}
              onPress={() => {
                NavService.navigate('preferencesTwo', {
                  signupItem: item?.signupItem,
                });
              }}>
              <CustomText
                text={'SKIP FOR NOW'}
                font={family?.Gilroy_SemiBold}
                size={size?.medium}
                color={colors?.secondary}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </CustomBackground>
  );
};

export default AuthPreference;

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
