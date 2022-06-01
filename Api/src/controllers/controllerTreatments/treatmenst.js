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
  getAllTreatments: async function (req, res) {
    try {
      const allTreatments = await Treatment.findAll();

      if (!allTreatments.length) throw new Error('no added treatments!');

      return res.status(200).json(allTreatments);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
  getTreatmentById: async function (req, res) {
    try {
      const id = req.params.id;
      const TreatmentById = await Treatment.findByPk(id);

      if (!TreatmentById) {
        throw new Error('there is no treatment with that ID!');
      }

      res.status(200).json(TreatmentById);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  createTreatment: async function (req, res) {
    try {
      const { ClinicID, ID, treatmentType, description, price } = req.body;

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

      res.status(201).json({ msg: 'successfully created Treatment' });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },
  putTreatment: async function (req, res) {
    try {
      const { ID, newPrice } = req.body;
      const TreatmentById = await Treatment.findByPk(ID);
      if (!TreatmentById) {
        //* Crea un error si no existe  el tratamiento en la DB
        throw new Error('There are no Treatment with that id!');
      }
      const updateTreatment = await TreatmentById.update({ price: newPrice });

      res.status(201).json({ msg: 'Successfully updated treatment' });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },
  deleteTreatment: async function (req, res) {
    try {
      const id = req.params.id;

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

      res.status(201).json({ msg: 'Successfully removed treatment' });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },
};
