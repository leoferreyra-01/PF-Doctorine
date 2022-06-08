const mercadopago = require('mercadopago');
// Agrega credenciales
const router = require('express').Router();

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
    success: 'http://localhost:3001/feedback',
    failure: 'http://localhost:3001/feedback',
    pending: 'http://localhost:3001/feedback',
  },
  auto_return: 'approved',
};
router.post('/create_preference', (req, res) => {
  // const treatments = JSON.parse(req.body.treatments);
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
      success: 'http://localhost:3001/feedback',
      failure: 'http://localhost:3001/feedback',
      pending: 'http://localhost:3001/feedback',
    },
    auto_return: 'approved',
  };
  console.log(preference);
  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      res.json({
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
  res.json({
    Payment: req.query.payment_id,
    Status: req.query.status,
    MerchantOrder: req.query.merchant_order_id,
  });
});
module.exports = router;
