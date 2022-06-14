import * as yup from 'yup';

export const initialConfigSchema = yup.object({
  name: yup.string().required('Field is required'),
  street: yup.string().required('Field is required'),
  number: yup.number().positive().integer().required('Field is required'),
  city: yup.string().required('Field is required'),
  postalcode: yup.number().positive().integer().required('Field is required'),
  telephone: yup.string().min(9).required('Field is required'),
  email: yup
    .string()
    .email('Insert a valid email')
    .required('Field is required'),
  imgLogo: yup
    .string()
    .url('Insert a valid image url')
    .required('Field is required'),
  turnStandardDuration: yup.number().positive().required('Field is required'),
});
