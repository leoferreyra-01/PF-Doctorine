import * as yup from 'yup';

export const updateConfigSchema = yup.object({
  name: yup.string(),
  street: yup.string(),
  number: yup.number().positive().integer(),
  city: yup.string(),
  postalcode: yup.number().positive().integer(),
  telephone: yup.string().min(9),
  email: yup.string().email('Insert a valid email'),
  imgLogo: yup.string().url('Insert a valid image url'),
  turnStandardDuration: yup.number().positive(),
});
