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

//|> VALIDACIÓN

function validacionClinics(infoClinic) {
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
  } = infoClinic; // req.body

  if (name) {
    if (
      // revisar la validacion de nombre
      !(
        typeof name === 'string' &&
        /[^0-9\.\,\"\?\!\;\:\#\$\%\&\(\)\*\+\-\/\<\>\=\@\[\]\\\^\_\{\}\|\~]+/.test(
          name
        )
      )
    )
      throw new Error('"name" must be a valid name.');
  }

  if (street) {
    if (
      // revisar validacion
      !(
        typeof street === 'string' &&
        /[^\.\,\"\?\!\;\:\#\$\%\&\(\)\*\+\-\/\<\>\=\@\[\]\\\^\_\{\}\|\~]+/.test(
          street
        )
      )
    )
      throw new Error('"street" must be a valid street name.');
  }

  if (number) {
    if (!(typeof number === 'number'))
      throw new Error('"number" must be a street number.');
  }

  if (city) {
    if (
      !(
        typeof city === 'string' &&
        /[^0-9\.\,\"\?\!\;\:\#\$\%\&\(\)\*\+\-\/\<\>\=\@\[\]\\\^\_\{\}\|\~]+/.test(
          city
        )
      )
    )
      throw new Error('"city" must be a valid city name.');
  }

  if (postalcode) {
    if (!(typeof postalcode === 'number'))
      throw new Error('"postalCode" must be a number.');
  }

  if (telephone) {
    if (
      // revisar validacion
      !(
        typeof telephone === 'string' &&
        /(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})/g.test(
          telephone
        )
      )
    )
      throw new Error(
        '"telephone" must be a valid format of telephone number.'
      );
  }
  if (email) {
    if (
      !(
        typeof email === 'string' &&
        /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi.test(email)
      )
    )
      throw new Error('"email" must be a valid email.');
  }

  if (imgLogo) {
    if (
      // revisar validacion
      !(
        typeof imgLogo === 'string' &&
        /((\w+:\/\/)[-a-zA-Z0-9:@;?&=\/%\+\.\*!'\(\),\$_\{\}\^~\[\]`#|]+)/g.test(
          imgLogo
        )
      )
    )
      throw new Error('"imgLogo" must be a valid URL.');
  }
}

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
        where: {
          name: name,
          /* .toLowerCase() */
        },
      });

      if (clinicDB) {
        //* Crea un error si existe  una Clinica con ese nombre en el DB
        throw new Error(
          'There is already a clinic with that name, please choose another name!'
        );
      }
      //* VALIDACION DE DATOS
      /*  validacionClinics(req.body); */
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

      if (!clinicById) {
        //* Crea un error si no existe  la clinica en la DB
        throw new Error('There is no clinic with that ID!');
      }

      //* VALIDACION DE DATOS
      validacionClinics(req.body);

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
