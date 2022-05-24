import * as yup from 'yup';

export const patientSchema = yup.object({
  name: yup.string().required('Campo requerido'),
  lastName: yup.string().required('Campo requerido'),
  document: yup
    .number()
    .max(99999999, 'dni invalido')
    .required('Campo requerido'), //deberia poner un min y un max, consulta a los chicos esto
  email: yup
    .string()
    .email('Ingrese una direccion de email valida')
    .required('Campo requerido'),
  street: yup.string().required('Campo requerido'),
  city: yup.string().required('Campo requerido'),
  postalCode: yup.number().positive().integer().required('Campo requerido'),
  //birthDate: yup.string().required('Campo requerido'),
  cellphone: yup.number().required('Campo requerido'),
  password: yup
    .string()
    .min(5, 'La contraseña debe tener minimo 5 caracteres')
    .required('Campo requerido'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null]),
});