import * as yup from 'yup';

export const patientSchema = yup.object({
  name: yup.string().required('Field is required'),
  lastName: yup.string().required('Field is required'),
  document: yup
    .number()
    .positive()
    .integer()
    .min(1000000, 'Invalid ID')
    .max(99999999, 'Invalid ID')
    .required('Field is required'), //deberia poner un min y un max, consulta a los chicos esto
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Field is required'),
  street: yup.string().required('Field is required'),
  city: yup.string().required('Field is required'),
  postalCode: yup.number().positive().integer().required('Field is required'),
  birth: yup.date().required('Field is required'),
  cellphone: yup.string().min(9).required('Field is required'),
  password: yup
    .string()
    .min(8, 'Password must had at least 8 characters')
    .required('Field is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null]),
});
