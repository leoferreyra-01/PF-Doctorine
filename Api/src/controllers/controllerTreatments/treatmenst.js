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
  getAllTreatments: async function () {
    const allTreatments = await Treatment.findAll();

    if (!allTreatments.length) throw new Error('no added treatments!');

    return allTreatments;
  },
  getTreatmentById: async function (id) {
    const TreatmentById = await Treatment.findByPk(id);

    if (!TreatmentById) {
      throw new Error('there is no treatment with that ID!');
    }

    return TreatmentById;
  },

  createTreatment: async function (infoTreatment) {
    const { ClinicID, ID, treatmentType, description, price } = infoTreatment;

    const ClinicDB = await Clinic.findByPk(ClinicID);
    if (!ClinicDB) {
      //* Crea un error si no existe  la clinica en la DB
      throw new Error('There are no clinic with that id!');
    }

    const TreatmentDB = await Treatment.findByPk(ID);

    if (TreatmentDB) {
      //* Crea un error si existe  un tratamiento con  con ese ID en el DB
      throw new Error(
        'There is already a treatment with that ID, please choose another name!'
      );
    }

    //*se crea el nuevo tratamiento
    let newTreatment = {
      ID /* : name.toLowerCase() */,
      treatmentType,
      description,
      price,
    };
    const CreateTreatment = await Treatment.create(newTreatment);

    CreateTreatment.setClinic(ClinicID);
  },
  putTreatment: async function (infoUpdateTreatment) {
    const { ID, newPrice } = infoUpdateTreatment;

    const TreatmentById = await Treatment.findByPk(ID);
    if (!TreatmentById) {
      //* Crea un error si no existe  el tratamiento en la DB
      throw new Error('There are no Treatment with that id!');
    }

    const updateTreatment = await TreatmentById.update({ price: newPrice });
    return updateTreatment;
  },
  deleteTreatment: async function (id) {
    const TreatmentById = await Treatment.findByPk(id);
    if (!TreatmentById) {
      //* Crea un error si no existe  el tratamiento en la DB
      throw new Error('There are no Treatment with that id!');
    }
    const deleteTreatmentById = await Treatment.destroy({
      where: {
        ID: id,
      },
    });
    return deleteTreatmentById;
  },
};
