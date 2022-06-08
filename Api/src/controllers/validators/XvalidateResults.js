'use strict';
//|> EXPRESS-VALIDATOR
const { validationResult } = require('express-validator');

function xValidateResults(req, res, next) {
  try {
    validationResult(req).throw();
    return next();
  } catch (error) {
    console.error(
      '\x1b[31m%s\x1b[0m',
      'Express-validation errors: ',
      error.mapped()
    );
    console.log('\x1b[31m%s\x1b[0m', 'Method: ', req.method, req.baseUrl);

    res.status(403).json([true, error.mapped()]);
  }
}

module.exports = {
  xValidateResults,
};
