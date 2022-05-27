import * as yup from 'yup';

export const registerPatientSchema = yup.object({
  name: yup.string().required('Campo requerido'),
  lastName: yup.string().required('Campo requerido'),
  document: yup
    .string()
    .min(7, 'dni invalido')
    .max(8, 'dni invalido')
    .required('Campo requerido'), //deberia poner un min y un max, consulta a los chicos esto
  email: yup
    .string()
    .email('Ingrese una direccion de email valida')
    .required('Campo requerido'),
  street: yup.string().required('Campo requerido'),
  city: yup.string().required('Campo requerido'),
  postalCode: yup.string().required('Campo requerido'),
  birthDate: yup.date().required('Campo requerido'),
  cellphone: yup.string().required('Campo requerido'),
});
