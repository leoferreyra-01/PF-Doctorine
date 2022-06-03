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
} = require('../../db');

//|> CONTROLLER

module.exports = {
  getAllClinics: async function (req, res) {
    try {
      const allClinics = await Clinic.findAll();
      if (!allClinics.length) {
        throw new Error('No clinics added!');
      }
      return res.status(200).json(allClinics);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
  getClinicById: async function (req, res) {
    try {
      const id = req.params.id;
      const clinicById = await Clinic.findByPk(id);

      if (!clinicById) {
        throw new Error('There is no clinic with that ID!');
      }

      res.status(200).json(clinicById);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
  createClinic: async function (req, res) {
    try {
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
      } = req.body;

      //*se crea la nueva clinica
      let newClinic = {
        name /* : name.toLowerCase() */,
        street,
        number,
        city,
        postalcode,
        telephone,
        email,
        officeHours, // falta validacion para los horarios
        imgLogo,
      };

      const CreateNewClinic = await Clinic.create(newClinic);

      res.status(201).json({ msg: 'successfully created clinic' });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },
  putClinic: async function (req, res) {
    try {
      const {
        ID,
        name,
        street,
        number,
        city,
        postalcode,
        telephone,
        email,
        officeHours,
        imgLogo,
      } = req.body;

      const clinicById = await Clinic.findByPk(ID);

      let infoClinicUpdate = {
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

      const updateClinic = await clinicById.update(infoClinicUpdate);

      res.status(201).send({ msg: 'successfully modified clinic.' });
    } catch (error) {
      console.log(error);
      res.status(404).send({ error: error.message });
    }
  },
};
