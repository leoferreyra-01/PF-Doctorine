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

function validacionBudgets(infoBudget) {
  const { ID, date, treatments, discount, totalPrice, paid } = infoBudget; // req.body

  if (discount) {
    if (!(typeof discount === 'number'))
      throw new Error(`${discount} must be a number.`);
  }
  if (totalPrice) {
    if (!(typeof totalPrice === 'number'))
      throw new Error(`${totalPrice} must be a number.`);
  }

  if (paid) {
    if (!(typeof paid === 'boolean'))
      throw new Error(`${paid} must be a boolean.`);
  }
}

//|> CONTROLLER

module.exports = {
  getAllBudgets: async function (req, res) {
    try {
      // se puede recibir por query
      const { PatientID } = req.query;

      if (PatientID) {
        const BudgetByPatient = await Budget.findAll({
          where: {
            PatientID: PatientID,
          },
        });
        if (!BudgetByPatient) {
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
      return res.status(400).json({ error: error.message });
    }
  },
  getBudgetById: async function (req, res) {
    try {
      const id = req.params.id;

      const BudgetById = await Budget.findByPk(id);
      if (!BudgetById) {
        throw new Error('There is no budget with that ID!');
      }

      res.status(200).json(BudgetById);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
  createBudget: async function (req, res) {
    try {
      const { PatientID, date, treatments, discount, totalPrice } = req.body;

      const PatientDB = await Patient.findByPk(PatientID);
      if (!PatientDB) {
        //* Crea un error si no existe  el paciente en la DB
        throw new Error('There are no patients with that id!');
      }

      if (!date || !treatments || !totalPrice) {
        //*crea un error si no existe datos obligatorios
        throw new Error('mandatory data is missing to create the budget!');
      }
      // Validacion de Datos.
      validacionBudgets(req.body);
      //*se crea el nuevo presupuesto
      let newBudget = {
        date,
        treatments,
        discount,
        totalPrice,
      };
      const CreateBudget = await Budget.create(newBudget);
      //*se vincula con el ID del paciente
      CreateBudget.setPatient(PatientID);

      res.status(201).json({ msg: 'successfully created budget' });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },
  putBudget: async function (req, res) {
    try {
      const { paid, ID } = req.body;

      const BudgetByPatient = await Budget.findByPk(ID);

      if (!BudgetByPatient) {
        //* Crea un error si no existe  el presupuesto  en la DB
        throw new Error('There is no budget with that ID!');
      }
      // Validacion de Datos.
      validacionBudgets(req.body);
      // actualizacion del pago
      const updatePatient = await BudgetByPatient.update({ paid: paid });

      res.status(201).json({ msg: 'budget paid successfully' });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },
};
