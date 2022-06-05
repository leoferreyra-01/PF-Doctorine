'use strict';

const {
  User, // Medic/Patient.createUser(...)
  Medic,
  Patient,
  Turn,
  Budget,
  Clinic,
  ClinicalHistory,
  Treatment,
  Teeth,
  Study,
  Evolution,
} = require('../src/db');

const validate = require('../src/controllers/validators');

const { treatments } = require('./treatmentsList');

async function preload_db() {
  console.log('\x1b[33m%s\x1b[0m', '<>----- PRELOADING -----<>');
  console.log(`-`);

  //|> Basic info.
  await addClinic();
  await addUserMedic();
  await addTeeths();
  await addTreatments();

  //|> User-Patients pre-gen-examples
  const patients = 20;
  for (let n = 1; n <= patients; n++) {
    await addUserPatient(n);
    await addClinicalHistory(n);
    await addEvolution(n);
    await addStudy(n);
    await addTurn(n);
    await addBudget(n);
    if (n % 2 === 0) {
      await updateBudget(n);
    }
  }
  // await addTurn(1);
  await updateTurn(1, 9);

  console.log('\x1b[34m%s\x1b[0m', 'Patients: ', patients);

  console.log(`-`);
  console.log('\x1b[32m%s\x1b[0m', `<>----- PRELOAD SUCCESSFULL-----<>`);
  console.log(`-`);
}

async function addClinic() {
  const officeHours = JSON.stringify([
    [],
    [
      { min: 9, max: 13 },
      { min: 17, max: 21 },
    ],
    [
      { min: 9, max: 13 },
      { min: 17, max: 21 },
    ],
    [
      { min: 9, max: 13 },
      { min: 17, max: 21 },
    ],
    [
      { min: 9, max: 13 },
      { min: 17, max: 21 },
    ],
    [
      { min: 9, max: 13 },
      { min: 17, max: 21 },
    ],
    [],
  ]);

  const infoClinic = {
    name: 'Clínica Henry',
    street: 'Online',
    number: 4,
    city: 'San Salvador',
    postalcode: 5800,
    telephone: 385444332,
    email: 'clinicatest1@dalequeva.com',
    officeHours,
    imgLogo: null,
  };

  Clinic.create(infoClinic);

  console.log('\x1b[34m%s\x1b[0m', 'Clinic: ', infoClinic.name);
}

async function addUserMedic() {
  const infoUser = {
    userType: 'Medic',
    document: 30500700,
    name: 'Doctor',
    lastName: 'test1',
    birth: '1992-05-22',
    telephone: '543854449323',
    cellphone: '543854449332',
    street: 'Belgrano',
    number: 553,
    city: 'San Salvador',
    postalCode: 5800,
    email: 'medicotest1@dalequeva.com',
    password: 'Aa123456',
    imageProfile: null,
  };

  const infoMedic = {
    title: 'Medico',
    specialization: 'Odontologo',
    tuition_date: '2022-05-22',
    tuition_number: 33354,
  };

  const newMedic = await Medic.create(infoMedic);

  newMedic.createUser(infoUser);
  newMedic.setClinic(1);

  console.log('\x1b[36m%s\x1b[0m', 'UserMedic-email: ', infoUser.email);
  console.log('\x1b[36m%s\x1b[0m', 'UserMedic-password: ', infoUser.password);
}

async function addUserPatient(n) {
  const infoUser = {
    userType: 'Patient',
    document: 30500700 + n,
    name: 'Patient',
    lastName: 'test' + n,
    birth: '1992-05-22',
    telephone: '54385444330' + n,
    cellphone: '54385555220' + n,
    street: 'Calle',
    number: n,
    city: 'Santiago del Estero',
    postalCode: 4200,
    email: 'pacientetest' + n + '@dalequeva.com',
    password: 'Aa123456',
    imageProfile:
      'https://pngimage.net/wp-content/uploads/2018/06/happy-customer-icon-png-5.png',
  };

  const infoPatient = {
    medicalService: 'Sancor Salud - Plan: ' + n,
    showClinicalHistory: Math.random() < 0.5 ? false : true,
    tutor: null,
  };

  const newPatient = await Patient.create(infoPatient);

  newPatient.createUser(infoUser);
}

async function addTeeths() {
  for (let zone = 1; zone <= 4; zone++) {
    for (let position = 1; position <= 8; position++) {
      let ID = parseInt(`${zone}` + `${position}`);

      Teeth.create({
        ID,
        zone,
        position,
      });
    }
  }

  for (let zone = 5; zone <= 8; zone++) {
    for (let position = 1; position <= 5; position++) {
      let ID = parseInt(`${zone}` + `${position}`);

      Teeth.create({
        ID,
        zone,
        position,
      });
    }
  }

  console.log('\x1b[34m%s\x1b[0m', 'Teeth: ', 4 * 8 + 4 * 5);
}

async function addTreatments() {
  treatments.forEach(async treatment => {
    const newTreatment = await Treatment.create({
      ID: treatment.ID,
      treatmentType: treatment.treatmentType,
      description: treatment.description,
      price: treatment.price,
    });

    newTreatment.setClinic(1);
  });

  console.log('\x1b[34m%s\x1b[0m', 'Treatments: ', treatments.length);
}

async function addTurn(n) {
  const randomDay = Math.ceil(Math.random() * 5);
  const randomHour = Math.ceil(Math.random() * 14);
  const randomDuration = Math.ceil(Math.random() * 1) / 2;

  const infoTurn = {
    date: '2022-05-' + (26 + randomDay),
    time: 8 + randomHour,
    duration: 1,
    description: 'Iteration n° ' + n,
    MedicID: 1, // -NOTE- required for TurnCollisions validation.
  };

  const [validation1, infoTurn_Errors] = await validate.TurnCollisions(
    infoTurn
  );

  const Errors = [infoTurn_Errors];

  try {
    if (!validation1) throw new Error(`Turn collision error`);

    const newTurn = await Turn.create(infoTurn);

    newTurn.setMedic(1);
    newTurn.setPatient(n);
  } catch (error) {
    // console.log(error);
    // console.log(Errors); // -FIX-
  }
}

async function updateTurn(TurnID, time) {
  const infoTurn = {
    time,
  };

  const [validation1, infoTurn_Errors] = await validate.TurnCollisions(
    infoTurn,
    TurnID
  );

  const Errors = [infoTurn_Errors];

  try {
    if (!validation1) throw new Error(`Turn collision error`);

    await Turn.update(infoTurn, {
      where: {
        ID: TurnID,
      },
    });
  } catch (error) {
    // console.log(error);
    // console.log(Errors); // -FIX-
  }
}

async function addBudget(n) {
  const treatments = JSON.stringify([
    {
      ID: '0201',
      treatmentType: 'operatoria',
      description: 'Obturación con Amalgama Cavidad Simple.',
      price: 1950 + n,
      quantity: 2,
      subTotalPrice: (1950 + n) * 2,
    },
    {
      ID: '0202',
      treatmentType: 'operatoria',
      description: 'Obturación con Amalgama Cavidad Compuesta.',
      price: 2340 + n,
      quantity: 1,
      subTotalPrice: 2340,
    },
  ]);

  const infoBudget = {
    date: '2022-05-22',
    treatments,
    discount: null,
    totalPrice: (1950 + n) * 2 + 2340 + n,
  };

  const newBudget = await Budget.create(infoBudget);

  newBudget.setPatient(n);
}

async function updateBudget(n) {
  Budget.update(
    {
      paid: true,
    },
    {
      where: {
        ID: n,
      },
    }
  );
}

async function addStudy(n) {
  const infoStudy = {
    studyType: 'laboratory',
    description: null,
    attach: null,
  };

  const newStudy = await Study.create(infoStudy);

  newStudy.setPatient(n);
}

async function addEvolution(n) {
  const infoEvolution = {
    date: '2022-05-23',
    observations: 'El diente le quedó muy lindo.',
  };

  const newEvolution = await Evolution.create(infoEvolution);

  newEvolution.setPatient(n);
  newEvolution.setMedic(1);
  newEvolution.setTreatment('0201');
  newEvolution.setTooth(11);
}

async function addClinicalHistory(n) {
  const infoClinicalHistory = {
    // BACKGROUND
    b_smoker: Math.random() < 0.9 ? false : true,
    b_useDrugs: Math.random() < 0.9 ? false : true,
    b_pregnant: Math.random() < 0.9 ? false : true,
    b_takeMedicine: Math.random() < 0.9 ? false : true,
    b_sufferedFromIllness: Math.random() < 0.9 ? false : true,
    b_alergicToMedicine: Math.random() < 0.9 ? false : true,
    b_normalWoundHealing: Math.random() < 0.9 ? false : true,
    b_other: Math.random() < 0.9 ? null : '"A new illness!"',
    // INFECTION, CARDIOVASCULAR
    ic_anginaPectoris: Math.random() < 0.9 ? false : true,
    ic_myocardialInfarction: Math.random() < 0.9 ? false : true,
    ic_hypertension: Math.random() < 0.9 ? false : true,
    ic_vascularAffections: Math.random() < 0.9 ? false : true,
    ic_other: Math.random() < 0.9 ? null : '"A new illness!"',
    // INFECTION, HEMATOLOGICAL
    ih_anemia: Math.random() < 0.9 ? false : true,
    ih_leukemia: Math.random() < 0.9 ? false : true,
    ih_haemophilia: Math.random() < 0.9 ? false : true,
    ih_alterationWhiteSerie: Math.random() < 0.9 ? false : true,
    ih_other: Math.random() < 0.9 ? null : '"A new illness!"',
    // INFECTION, RESPIRATORY
    ir_asthma: Math.random() < 0.9 ? false : true,
    ir_pulmonaryEdema: Math.random() < 0.9 ? false : true,
    ir_ephysemia: Math.random() < 0.9 ? false : true,
    ir_tuberculosis: Math.random() < 0.9 ? false : true,
    ir_chronicBronchitis: Math.random() < 0.9 ? false : true,
    ir_other: Math.random() < 0.9 ? null : '"A new illness!"',
    // INFECTION, GASTROINTESTINAL
    ig_ulcer: Math.random() < 0.9 ? false : true,
    ig_hepatitis: Math.random() < 0.9 ? false : true,
    ig_cirrohsis: Math.random() < 0.9 ? false : true,
    ig_other: Math.random() < 0.9 ? null : '"A new illness!"',
    // INFECTION, NERVOUS
    in_epilepsy: Math.random() < 0.9 ? false : true,
    in_useOfTranquilizers: Math.random() < 0.9 ? false : true,
    in_seizures: Math.random() < 0.9 ? false : true,
    in_other: Math.random() < 0.9 ? null : '"A new illness!"',
    // INFECTION, BONES
    ib_osteoporosis: Math.random() < 0.9 ? false : true,
    ib_paget: Math.random() < 0.9 ? false : true,
    ib_rickets: Math.random() < 0.9 ? false : true,
    ib_osteomalacia: Math.random() < 0.9 ? false : true,
    ib_other: Math.random() < 0.9 ? null : '"A new illness!"',
  };

  const newClinicalHistory = await ClinicalHistory.create(infoClinicalHistory);

  newClinicalHistory.setPatient(n);
}

module.exports = {
  preload_db,
};
