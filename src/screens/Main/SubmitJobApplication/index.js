import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
} from 'react-native';
import AppBackground from '../../../components/AppBackground';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {pick, types, isCancel} from '@react-native-documents/picker';
import {colors} from '../../../utils/Colors';
import {HEIGHT, WIDTH} from '../../../theme/units';
import {size} from '../../../utils';
import CustomButton from '../../../components/CustomButton';
import {LOG} from '../../../utils/helperFunction';
import {useUploadMutation} from '../../../Api/jobsApiSlice';
import {executeApiRequest} from '../../../Api/methods/method';
import NavService from '../../../helpers/NavService';
import ActivityLoader from '../../../components/ActivityLoader';
import {colors2} from '../../../theme/colors2';

const SubmitJobApplication = ({route}) => {
  const {item} = route?.params || {};
  LOG('Item: ', item);
  const [upload, {isLoading}] = useUploadMutation();
  // Pick PDF file using latest package
  const pickPdfDocument = async setFieldValue => {
    try {
      const [res] = await pick({
        type: [types.pdf],
      });

      const fileObj = {
        uri: res.uri,
        type: res.type,
        name: res.name,
      };

      setFieldValue('file', fileObj);
    } catch (err) {
      if (isCancel(err)) {
        console.log('User cancelled file picker');
      } else {
        console.error('Picker Error:', err);
      }
    }
  };

  // Yup validation schema
  const SignupSchema = Yup.object().shape({
    file: Yup.object().required('Please upload your resume (PDF only)'),
  });

  // Handle form submit
  const handleBook = async values => {
    console.log('PDF File Submitted:', values.file);
    let payload = {
      ...values,
      jobId: item,
    };
    LOG('PAyload: ', payload);
    const response = await executeApiRequest({
      apiCallFunction: upload,
      body: payload,
      formData: true,
      toast: true,
      timeout: 30000,
    });

    LOG('Job Application Success:', response);
    NavService?.navigate('Jobs');
  };

  return (
    <Formik
      initialValues={{file: null}}
      validationSchema={SignupSchema}
      onSubmit={handleBook}>
      {({handleSubmit, values, errors, touched, setFieldValue}) => (
        <AppBackground
          back={true}
          title={'JOB DETAILS'}
          notification
          description={'Upload Your Resume!'}>
          <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.innerContainer}>
              {/* PDF Upload Button */}
              <TouchableOpacity
                style={styles.uploadBtn}
                onPress={() => pickPdfDocument(setFieldValue)}>
                <Text style={styles.uploadBtnText}>
                  {values.file ? values.file.name : 'Upload Resume (PDF)'}
                </Text>
              </TouchableOpacity>

              {/* Error Message */}
              {errors.file && touched.file && (
                <Text style={styles.errorText}>{errors.file}</Text>
              )}

              {/* Submit Button */}
              <View
                style={{marginTop: HEIGHT * 0.04, marginBottom: HEIGHT * 0.11}}>
                {isLoading ? (
                  <ActivityLoader color={colors2.theme.secondary} />
                ) : (
                  <CustomButton
                    gradientColorArr={[colors.secondary, colors.secondary]}
                    title={'UPLOAD RESUME'}
                    customWidth={WIDTH - 55}
                    buttonStyle={{alignSelf: 'center', borderRadius: 50}}
                    textStyle={{fontSize: size.large}}
                    onPress={handleSubmit}
                  />
                )}
              </View>
            </View>
          </ScrollView>
        </AppBackground>
      )}
    </Formik>
  );
};

export default SubmitJobApplication;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: 5,
  },
  uploadBtn: {
    backgroundColor: '#eee',
    padding: 15,
    paddingVertical: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  uploadBtnText: {
    fontSize: size?.large,
    color: '#333',
  },
  errorText: {
    color: 'red',
    fontSize: size?.medium,
  },
  submitBtn: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
  },
});
