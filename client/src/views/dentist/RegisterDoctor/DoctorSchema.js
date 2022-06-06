import * as yup from 'yup';

export const DoctorSchema = yup.object({
  userDocument: yup.number('Just numbers').max(99999999, 'Invalid ID').required('Field is required'),
  userName: yup.string().required('Field is required'),
  userLastName: yup.string().required('Field is required'),
  userBirthDay: yup.string().required('Field is required'),
  userTelephone: yup.number().required('Phone number is required'),
  userCellphone: yup.number().required('Cellphone number is required'),
  userStreet: yup.string().required('Field is required'),
  userNumber: yup.string().required('Adress number is required'),
  userCity: yup.string().required('Field is required'),
  userPostalCode: yup.number().positive().integer().required('Field is required'),
  userEmail: yup.string().email('Insert a valid email').required('Field is required'),
  userPassword: yup.string('Invalid password').required('Password is required'),
  // userImgProfile: yup.file().required('la fotografía es requerida'),

  doctorTitle: yup.string().required('Field is required'),
  doctorSpecialization: yup.string().required('Field is required'),
  doctorTuitionDate: yup.string().required('Field is required'),
  doctorTuitionNumber: yup.string().required('Field is required'),

  clinicName: yup.string().required('Field is required'),
  clinicStreet: yup.string().required('Field is required'),
  clinicNumber: yup.string().required('Adress number is required'),
  clinicCity: yup.string().required('Field is required'),
  clinicPostalCode: yup.number().positive().integer().required('Field is required'),
  clinicTelephone: yup.number().required('Phone number is required'),
  clinicEmail: yup.string().email('Insert a valid email').required('Email is required'),
  clinicHours: yup.string().required('Field is required'),
  clinicLogo: yup.string().required('Logo is required'),
});
