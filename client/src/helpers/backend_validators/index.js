'use strict';

import Medic from './Medic';
import Patient from './Patient';

const bk_validate = {
  Medic,
  Patient,
};

export default bk_validate;

//|*| README
// See example of use on component: '../../views/dentist/UpdatePatient/UpdatePatient.jsx';

/* 
|> 1. Import validator functions
  import bk_validate from '../../../helpers/backend_validators';

|> 2. Create validation State
  const [validations, setValidations] = useState([false, null]);

|> 3. Create validation function
  async function validatePatient() {
    const data = await bk_validate.Patient(
      { infoUser, infoPatient },
      patientID
    );
    if (data[0]) {
      setValidations([true, data[1]]);
    } else {
      setValidations([false, data[1]]);
    }
  }

|> 4. Make a useEffect to validate patient, based on a handleChange data
  useEffect(() => {
    validatePatient();
  }, [data]);

|> 5. Create a frindly variable
  let [fail, err] = validations;

|> 6. Render the validation message
  {fail && err['infoUser.name'] && <p>{err['infoUser.name'].msg}</p>}

  |*| By Alfonso.M0 😀
*/
