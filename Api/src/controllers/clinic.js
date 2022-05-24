'use strict';

//|> SEQUELIZE
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
} = require('../db');

//|> CONTROLLER

module.exports = {
  getAllClinics: async function () {
    const allClinics = await Clinic.findAll();

    return allClinics;
  },
  getClinicById: async function (id) {
    const clinicById = await Clinic.findByPk(id);
    return clinicById;
  },
  createClinic: async function (infoClinic) {
    const {
      name,
      street,
      number,
      city,
      postalcode,
      telephone,
      email,
      officeHours,
      imgLogo,
    } = infoClinic; // req.body

    if (
      !name ||
      !street ||
      !number ||
      !city ||
      !postalcode ||
      !telephone ||
      !email ||
      !officeHours
    ) {
      //*crea un error si no existe datos obligatorios
      throw new Error('mandatory data is missing to create the clinic!');
    }

    //* buscamos en el DB si existe una Clinica con ese nombre
    const clinicDB = await Clinic.findOne({
      where: { name /* : name.toLowerCase() */ },
    });

    if (clinicDB) {
      //* Crea un error si existe  una Clinica con ese nombre en el DB
      throw new Error(
        'There is already a clinic with that name, please choose another name!'
      );
    }

    //*se crea la nueva clinica
    let newClinic = {
      name /* : name.toLowerCase() */,
      street,
      number,
      city,
      postalcode,
      telephone,
      email,
      officeHours,
      imgLogo,
    };

    const CreateNewClinic = await Clinic.create(newClinic);
  },
};
