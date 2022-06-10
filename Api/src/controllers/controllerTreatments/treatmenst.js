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
      return res.status(400).json([true, { error: { msg: error.message } }]);
    }
  },
  getTreatmentById: async function (req, res) {
    try {
      const id = req.params.id;
      const TreatmentById = await Treatment.findByPk(id);

      res.status(200).json(TreatmentById);
    } catch (error) {
      return res.status(400).json([true, { error: { msg: error.message } }]);
    }
  },

  createTreatment: async function (req, res) {
    try {
      const { ClinicID, ID, treatmentType, description, price } = req.body;
      //*se crea el nuevo tratamiento
      let newTreatment = {
        ID,
        treatmentType,
        description,
        price,
      };
      const CreateTreatment = await Treatment.create(newTreatment);

      CreateTreatment.setClinic(ClinicID);

      res.status(201).json({ msg: 'successfully created Treatment' });
    } catch (error) {
      res.status(404).json([true, { error: { msg: error.message } }]);
    }
  },
  putTreatment: async function (req, res) {
    try {
      const { ID, price } = req.body;
      const TreatmentById = await Treatment.findByPk(ID);

      const updateTreatment = await TreatmentById.update({ price: price });

      res.status(201).json({ msg: 'Successfully updated treatment' });
    } catch (error) {
      res.status(404).json([true, { error: { msg: error.message } }]);
    }
  },
  deleteTreatment: async function (req, res) {
    try {
      const { ID } = req.params;

      const deleteTreatmentById = await Treatment.destroy({
        where: {
          ID: ID,
        },
      });

      res.status(201).json({ msg: 'Successfully removed treatment' });
    } catch (error) {
      res.status(404).json([true, { error: { msg: error.message } }]);
    }
  },
};
