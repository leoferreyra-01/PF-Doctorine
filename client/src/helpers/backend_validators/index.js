'use strict';

import Medic from './Medic';
import Patient from './Patient';

const bk_validate = {
  Medic,
  Patient,
};

export default bk_validate;

/* -NOTE- 
|*| README

|> 1. Import the validator.
  import bk_validate from './backend_validators';

|> 2. Call the validator on your component.
  bk_validate.Patient(patient, PatientID);

  * patient: object = { infoUser, infoPatient }
  * PatientID: default null. Is optional. Use it for PUT validations (default: POST validation).

|> 3. The validator will return an array of two values.
  const [patient_fail, patient_errors] = bk_validate.Patient('post', patient);

  * patient_fail: boolean. If true, the validator failed.
  * patient_errors: object. If fail is false, the errors will be null.

|> 4. If the validator fails, you can access the errors object. Render them on React.
  Example. validate the infoUser.name:
  { patient_fail ? <div>{ patient_errors['infoUser.name'].msg }</div> : null }

  |*| by Alfonso.M0 🤗
*/

//|?| IMPORTANT: Testing pending...
