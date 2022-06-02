'use strict';
//|> EXPRESS-VALIDATOR
const { validationResult } = require('express-validator');

function XvalidateResults(req, res, next) {
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

    res.status(403).json({ fail: true, err: error.mapped() });
  }
}

module.exports = {
  XvalidateResults,
};
