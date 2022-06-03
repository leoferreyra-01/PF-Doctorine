'use strict';

//|> SEQUELIZE

const { Patient, Turn } = require('../../db');

//|> CONTROLLER

async function deleteTurns(req, res) {
  let { ID } = req.params;
  Turn.destroy({
    where: {
      ID: ID,
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
