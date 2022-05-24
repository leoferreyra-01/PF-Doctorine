'use strict';

//|> SEQUELIZE

const { Patient, Turn } = require('../db');

//|> CONTROLLER

async function deleteTurns(req, res) {
  let { id } = req.params;
  Turn.destroy({
    where: {
      ID: id,
    },
  }).then(function (result) {
    res.json({
      status: 1,
      data: result,
    });
  });
}
module.exports = {
  deleteTurns,
};
