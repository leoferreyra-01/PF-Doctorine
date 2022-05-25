'use strict';

//|> SEQUELIZE

const { Medic, Patient, Turn } = require('../db');

//|> CONTROLLER

async function updateTurns(req, res) {
  let { id } = req.params;
  Turn.update(
    {
      time: req.body.time,
      description: req.body.description,
      date: req.body.date,
      duration: req.body.duration,
    },
    {
      where: {
        ID: id,
      },
    }
  ).then(function (result) {
    res.json({
      status: 1,
      data: result,
    });
  });
}
module.exports = {
  updateTurns,
};
