import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  category: Yup.string().required('Category is required'),
  gallery: Yup.array()
    .min(1, 'At least one image is required')
    .required('At least one image is required'),
  image: Yup.object()
    .nullable()
    .test('is-valid-image', 'Image is required', value => value !== ''),
  brand: Yup.string().when('category', {
    is: category => category !== 'AUTOMOBILE',
    then: schema => schema.required('Brand is required'),
    otherwise: schema => schema.notRequired(),
  }),
  // condition: Yup.string().when('category', {
  //   is: category => category !== 'AUTOMOBILE',
  //   then: schema => schema.required('Condition is required'),
  //   otherwise: schema => schema.notRequired(),
  // }),
  make: Yup.string().when('category', {
    is: 'AUTOMOBILE',
    then: schema => schema.required('Car Make is required'),
    otherwise: schema => schema.notRequired(),
  }),
  model: Yup.string().when('category', {
    is: 'AUTOMOBILE',
    then: schema => schema.required('Car Model is required'),
    otherwise: schema => schema.notRequired(),
  }),
  transmission: Yup.string().when('category', {
    is: 'AUTOMOBILE',
    then: schema => schema.required('Transmission is required'),
    otherwise: schema => schema.notRequired(),
  }),
  bodyType: Yup.string().when('category', {
    is: 'AUTOMOBILE',
    then: schema => schema.required('Body Type is required'),
    otherwise: schema => schema.notRequired(),
  }),
  // color: Yup.string().when('category', {
  //   is: 'AUTOMOBILE',
  //   then: schema => schema.required('Color is required'),
  //   otherwise: schema => schema.notRequired(),
  // }),
  features: Yup.array().when('category', {
    is: 'AUTOMOBILE',
    then: schema =>
      schema
        .of(Yup.string().trim().required('Feature is required'))
        .min(1, 'At least one feature is required'),
    otherwise: schema => schema.notRequired(),
  }),
  title: Yup.string().required('Ad Title is required'),
  color: Yup.string().required('Color is required'),
  condition: Yup.string().required('Condition is required'),
  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, 'Phone number must contain only digits')
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number must be at most 15 digits')
    .required('Phone number is required')
    .test('isValid', 'Phone number is not valid', function (value) {
      return value ? true : false;
    }),
  description: Yup.string().required('Description is required'),
  location: Yup.object().shape({
    address: Yup.string().required('Location is required'),
  }),
  price: Yup.string().required('Price is required'),
});
