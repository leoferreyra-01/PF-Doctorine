'use strict';

import Patient from './Patient';

export default bk_validate = {
  Patient,
};

/* -NOTE- 
|*| README

|> 1. Import the validator.
  import bk_validate from './backend_validators';

|> 2. Call the validator on your component.
  bk_validate.Patient(patient);

|> 3. The validator will return an array of two values.
  const [patient_fail, patient_errors] = bk_validate.Patient(patient);

  patient_fail: boolean. If true, the validator failed.
  patient_errors: object. If fail is false, the errors object will be empty.

|> 4. If the validator fails, you can access the errors object. Render them on React.
  { patient_fail ? <div>{ patient_errors.name.msg }</div> : null }

  |*| by Alfonso.M0 🤗
*/

//|?| IMPORTANT: Testing pending...
