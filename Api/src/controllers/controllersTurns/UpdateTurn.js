'use strict';

//|> SEQUELIZE

const { Medic, Patient, Turn } = require('../../db');

//|> CONTROLLER

async function updateTurns(req, res) {
  let { ID } = req.params;

  const { validate } = req.query;
  try {
    if (validate) return res.status(200).json([false, null]);

    Turn.update(
      {
        time: req.body.time,
        description: req.body.description,
        date: req.body.date,
        duration: req.body.duration,
      },
      {
        where: {
          ID: ID,
        },
      }
    ).then(function (result) {
      res.json({
        status: 1,
        data: result,
      });
    });
  } catch (error) {
    console.error(error);
    res.status(404).json([true, { error: { msg: error.message } }]);
  }
}
module.exports = {
  updateTurns,
};
