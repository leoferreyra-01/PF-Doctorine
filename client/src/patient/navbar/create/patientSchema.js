import * as yup from 'yup';

export const patientSchema = yup.object({
  name: yup.string().required('Campo requerido'),
  lastName: yup.string().required('Campo requerido'),
  document: yup
    .number()
    .positive()
    .integer()
    .min(1111111, 'dni invalido')
    .max(99999999, 'dni invalido')
    .required('Campo requerido'), //deberia poner un min y un max, consulta a los chicos esto
  email: yup
    .string()
    .email('Ingrese una direccion de email valida')
    .required('Campo requerido'),
  street: yup.string().required('Campo requerido'),
  city: yup.string().required('Campo requerido'),
  postalCode: yup.number().positive().integer().required('Campo requerido'),
  birth: yup.date().required('Campo requerido'),
  cellphone: yup.string().min(9).required('Campo requerido'),
  password: yup
    .string()
    .min(8, 'La contraseña debe tener minimo 8 caracteres')
    .required('Campo requerido'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null]),
});
