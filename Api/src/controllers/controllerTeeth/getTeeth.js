'use strict';

//|> SEQUELIZE
const { Teeth } = require('../../db');

//|> CONTROLLER

async function getTeeth() {
  const foundedTooth = await Teeth.findAll();
  if (!foundedTooth) {
    throw new Error('There are no tooth');
  }
  return foundedTooth;
}

module.exports = {
  getTeeth,
};
