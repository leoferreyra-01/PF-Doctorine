'use strict';
const { Op } = require('sequelize');
const {
  User,
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
  Teeth_Treatment,
} = require('../src/db');
const { treatments } = require('./treatmentsList');

async function preload_db() {
  addClinic();
  addUserMedic();
  addUserPatient();
  addTeeths();
  addTreatments();
  addTurn();
  addBudget();
  addClinicalHistory();
  addStudy();
  addEvolution();
}

async function addClinic() {
  const officeHours = JSON.stringify([
    [],
    [
      { min: 8.5, max: 12.75 },
      { min: 17, max: 21 },
    ],
    [
      { min: 8.5, max: 12.75 },
      { min: 17, max: 21 },
    ],
    [
      { min: 8.5, max: 12.75 },
      { min: 17, max: 21 },
    ],
    [
      { min: 8.5, max: 12.75 },
      { min: 17, max: 21 },
    ],
    [
      { min: 8.5, max: 12.75 },
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
    email: 'clinicadeprueba1@dalequeva.com',
    officeHours,
    imgLogo: null,
  };

  const newClinic = Clinic.create(infoClinic);
}

async function addUserMedic() {
  const infoUser = {
    userType: 'Medic',
    document: 30500700,
    name: 'Doctor',
    lastName: 'DePrueba1',
    birth: '1992-05-22',
    telephone: 385444332,
    cellphone: 385444333,
    street: 'Belgrano',
    number: '553',
    city: 'San Salvador',
    postalCode: 5800,
    email: 'medicodeprueba1@dalequeva.com',
    password: '123456',
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
}

async function addUserPatient() {
  const infoUser = {
    userType: 'Patient',
    document: 30500702,
    name: 'Patient',
    lastName: 'DePrueba1',
    birth: '1992-05-22',
    telephone: 385444332,
    cellphone: 385444333,
    street: 'Alsina',
    number: '553',
    city: 'San Salvador',
    postalCode: 5800,
    email: 'pacientedeprueba1@dalequeva.com',
    password: '123456',
    imageProfile: null,
  };

  const infoPatient = {
    medicalService: 'Sancor Salud',
    showClinicalHistory: false,
    tutor: null,
  };

  const newUser = await User.create(infoUser);

  newUser.createPatient(infoPatient);
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
}

async function addTurn() {
  const infoTurn = {
    date: '2022-06-17',
    time: 9.5,
    duration: 1,
    description: 'Primer turno!',
  };

  const newTurn = await Turn.create(infoTurn);

  newTurn.setMedic(1);
  newTurn.setPatient(1);
}

async function addBudget() {
  const treatments = JSON.stringify([
    {
      ID: '0201',
      treatmentType: 'operatoria',
      description: 'Obturación con Amalgama Cavidad Simple.',
      price: 1950,
      quantity: 2,
      subTotalPrice: 1950 * 2,
    },
    {
      ID: '0202',
      treatmentType: 'operatoria',
      description: 'Obturación con Amalgama Cavidad Compuesta.',
      price: 2340,
      quantity: 1,
      subTotalPrice: 2340,
    },
  ]);

  const infoBudget = {
    date: '2022-05-22',
    treatments,
    discount: null,
    totalPrice: 1950 * 2 + 2340,
  };

  const newBudget = await Budget.create(infoBudget);

  newBudget.setPatient(1);
}

async function addClinicalHistory() {
  // All defaultValue
  const newClinicalHistory = await ClinicalHistory.create();

  newClinicalHistory.setPatient(1);
}

async function addStudy() {
  const infoStudy = {
    studyType: 'laboratory',
    description: null,
    attach: null,
  };

  const newStudy = await Study.create(infoStudy);

  newStudy.setClinicalHistory(1);
}

async function addEvolution() {
  const infoEvolution = {
    date: '2022-05-23',
    observations: 'El diente le quedó muy lindo',
  };

  const newEvolution = await Evolution.create(infoEvolution);

  newEvolution.setClinicalHistory(1);
  newEvolution.setMedic(1);
  newEvolution.setTreatment('0201');
  newEvolution.setTooth(11);
}

module.exports = {
  preload_db,
};
