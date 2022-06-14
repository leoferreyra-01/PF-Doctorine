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
  getAllBudgets: async function (req, res) {
    try {
      // se puede recibir por query
      let { PatientID, DNI } = req.query;

      if (DNI) {
        const UserID = await User.findOne({
          where: { document: DNI },
          include: [Patient],
        });
        if (UserID) {
          PatientID = UserID.Patient.ID;
        } else {
          throw new Error('There is no budget with that patient!');
        }
      }

      if (PatientID) {
        const BudgetByPatient = await Budget.findAll({
          where: {
            PatientID: PatientID,
          },
        });
        if (BudgetByPatient.length === 0) {
          throw new Error('There is no budget with that patient!');
        }
        return res.status(200).json(BudgetByPatient);
      }
      const allBudget = await Budget.findAll();

      if (!allBudget.length) {
        throw new Error('No budgets added!');
      }
      return res.status(200).json(allBudget);
    } catch (error) {
      return res.status(400).json([true, { error: { msg: error.message } }]);
    }
  },
  getBudgetById: async function (req, res) {
    try {
      const id = req.params.id;

      const BudgetById = await Budget.findByPk(id);

      res.status(200).json(BudgetById);
    } catch (error) {
      return res.status(400).json([true, { error: { msg: error.message } }]);
    }
  },
  createBudget: async function (req, res) {
    try {
      const { PatientID, treatments, discount, totalPrice } = req.body;
      //*se crea el nuevo presupuesto
      let newBudget = {
        treatments,
        discount,
        totalPrice,
      };
      const CreateBudget = await Budget.create(newBudget);
      //*se vincula con el ID del paciente
      CreateBudget.setPatient(PatientID);

      res.status(201).json(CreateBudget);
    } catch (error) {
      res.status(404).json([true, { error: { msg: error.message } }]);
    }
  },
  putBudget: async function (req, res) {
    try {
      const { ID, linkPayment, idPayment } = req.body;
      if (linkPayment) {
        const BudgetByPatient = await Budget.findByPk(ID);
        const updatePatient = await BudgetByPatient.update({
          idPayment: idPayment,
          linkPayment: linkPayment,
        });
        return res.status(201).json({ msg: 'URL paid successfully' });
      }
      // const BudgetByPatient = await Budget.findByPk(ID);
      // const updatePatient = await BudgetByPatient.update({ paid: paid });
      const BudgetByPatient = await Budget.findOne({
        where: {
          idPayment: idPayment,
        },
      });
      const updatePatient = await BudgetByPatient.update({ paid: true });

      res.status(201).json({ msg: 'budget paid successfully' });
    } catch (error) {
      res.status(404).json([true, { error: { msg: error.message } }]);
    }
  },
};
