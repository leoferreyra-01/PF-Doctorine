'use strict';

//|> SEQUELIZE

const { Patient, Turn } = require('../../db');

//|> CONTROLLER

async function deleteTurns(req, res) {
  let { ID } = req.params;

  const { validate } = req.query;
  try {
    if (validate) return res.status(200).json([false, null]);

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
  } catch (error) {
    console.error(error);
    res.status(404).json([true, { error: { msg: error.message } }]);
  }
}
module.exports = {
  deleteTurns,
};
