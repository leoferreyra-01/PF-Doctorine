const mercadopago = require('mercadopago');
require('dotenv').config();
// Agrega credenciales
const router = require('express').Router();
const axios = require('axios');
axios.defaults.baseURL = process.env.REACT_APP_API || `http://localhost:3001`;

mercadopago.configure({
  access_token:
    'TEST-2610828340638564-060709-f54f8a67b694f7b1efe661bb2f32d9ef-21079186',
});

// Crea un objeto de preferencia
let preference = {
  items: [
    {
      title: 'Mi producto',
      unit_price: 100,
      quantity: 1,
    },
  ],
  back_urls: {
    success: 'http://localhost:3001/success',
    failure: 'http://localhost:3001/failed',
    pending: 'http://localhost:3001/feedback',
  },
  auto_return: 'approved',
};
router.post('/create_preference', (req, res) => {
  // const treatments = JSON.parse(req.body.treatments);
  console.log(req.body);
  let preference = {
    items: [
      {
        id: req.body.ID,
        title: 'Atencion Medica',
        unit_price: Number(req.body.totalPrice),
        quantity: 1,
      },
    ],
    back_urls: {
      success: 'http://localhost:3001/payments/feedback',
      failure: 'http://localhost:3001/failed',
      pending: 'http://localhost:3001/feedback',
    },
    auto_return: 'approved',
  };

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      res.json({
        ID: preference.items[0].id,
        id: response.body.id,
        status: response.body.auto_return,
        linkPayment: response.body.sandbox_init_point,
      });
    })
    .catch(function (error) {
      console.log(error);
    });
});

router.get('/feedback', function (req, res) {
  if (req.query.status === 'approved') {
    axios.put('/Budgets', {
      idPayment: req.query.preference_id,
    });
  }
  res.redirect('http://localhost:3000/home');
});
module.exports = router;
