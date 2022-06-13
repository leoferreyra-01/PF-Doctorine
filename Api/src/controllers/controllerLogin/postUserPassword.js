const bcrypt = require('bcrypt');
const { User } = require('../../db');
var NODEMAILER = require('nodemailer');
const saltRounds = 10;

const newPassword = async req => {
  // console.log(req)
  const { email, currentPassword, newPassword } = req;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }
    if (!currentPassword) {
      throw new Error('Current password is required');
    }
    if (!newPassword) {
      throw new Error('New password is required');
    }
    let result = await bcrypt.compare(
      currentPassword,
      user.dataValues.password
    );
    if (result) {
      bcrypt.hash(newPassword, saltRounds, async function (err, hash) {
        console.log(hash);
        await User.update({ password: hash }, { where: { email: email } });
      });
    }
    return result;
  } catch (error) {
    console.log(error);
    throw new Error('There was a problem updating the password');
  }
};

const passwordReset = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (user) {
      var transporter = NODEMAILER.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.USER_ADMIN,
          pass: process.env.PASSWORD,
        },
      });
      var mailOptions = {
        from: process.env.USER_ADMIN,
        to: req.body.username,
        subject: 'Recuperacion de contraseña!',
        html: `<p>Para cambiar su contraseña, por favor ingrese al siguiente enlace: <a href=http://localhost:3000/newPassword?usuario=${req.body.username}>RESETEAR CONTRASEÑA</a></p>`,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          res.status(500).send(error.message);
        } else {
          res.status(200).jsonp(req.body);
          console.log('Email enviado');
        }
      });
    } else {
      res.json({ error: 'Usuario no registrado!' });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  newPassword,
  passwordReset,
};
