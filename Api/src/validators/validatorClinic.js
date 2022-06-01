const { check } = require('express-validator');
const { validateResult } = require('../helpers/helpersClinic');
//validateReult  => helpers
const validateClinic = [
  check('name').exists().not().isEmpty(),
  check('email').exists().isEmail(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = { validateClinic };
