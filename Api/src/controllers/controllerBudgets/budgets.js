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
  getAllBudgets: async function () {
    const allBudget = await Budget.findAll();

    if (!allBudget.length) {
      throw new Error('No budgets added!');
    }
    return allBudget;
  },
  getBudgetById: async function (id) {
    const BudgetById = await Budget.findByPk(id);
    if (!BudgetById) {
      throw new Error('There is no budget with that ID!');
    }
    return BudgetById;
  },

  getBudgetByPatient: async function (id) {
    const BudgetByPatient = await Budget.findOne({
      where: {
        PatientID: id,
      },
    });

    if (!BudgetByPatient) {
      throw new Error('There is no budget with that patient!');
    }
    return BudgetByPatient;
  },
  createBudget: async function (infoBudget) {
    const { PatientID, date, treatments, discount, totalPrice } = infoBudget;

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
    validacionBudgets(infoBudget);
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
  },
  putBudget: async function (infoUpdateBudget) {
    const { paid, ID } = infoUpdateBudget; // req.body

    const BudgetByPatient = await Budget.findByPk(ID);

    if (!BudgetByPatient) {
      //* Crea un error si no existe  el presupuesto  en la DB
      throw new Error('There is no budget with that ID!');
    }
    // Validacion de Datos.
    validacionBudgets(infoUpdateBudget);
    // actualizacion del pago
    const updatePatient = await BudgetByPatient.update({ paid: paid });
    return updatePatient;
  },
};
