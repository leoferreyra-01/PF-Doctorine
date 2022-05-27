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
  getAllBudgets: async function () {
    const allBudget = await Budget.findAll();
    return allBudget;
  },
  getBudgetById: async function (id) {
    const BudgetById = await Budget.findByPk(id);
    return BudgetById;
  },

  getBudgetByPatient: async function (id) {
    const BudgetByPatient = await Budget.findOne({
      where: {
        PatientID: id,
      },
    });
    return BudgetByPatient;
  },
  createBudget: async function (infoBudget) {
    const { PatientID, date, treatments, discount, totalPrice } = infoBudget;

    const PatientDB = await Patient.findByPk(PatientID);
    if (!PatientDB) {
      //* Crea un error si no existe  el paciente en la DB
      throw new Error('There are no patients with that id!');
    }

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
    const updatePatient = await BudgetByPatient.update({ paid: paid });
    return updatePatient;
  },
};
