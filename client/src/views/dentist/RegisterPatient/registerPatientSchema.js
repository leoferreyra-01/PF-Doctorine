import * as yup from 'yup';

export const registerPatientSchema = yup.object({
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
    .email('Insert a valid email')
    .required('Field is required'),
  street: yup.string().required('Field is required'),
  city: yup.string().required('Field is required'),
  postalCode: yup
    .number()
    .positive()
    .integer()
    .max(9999)
    .required('Field is required'),
  birth: yup.date().required('Field is required'),
  cellphone: yup.string().min(9).required('Field is required'),
  telephone: yup.string().min(9).required('Field is required'),
  number: yup
    .number()
    .positive()
    .integer()
    .max(9999)
    .required('Field is required'),
  medicalService: yup.string().required('Field is required'),
});
