const bcrypt = require("bcrypt")
const { User } = require("../../db");
var NODEMAILER = require("nodemailer");
const saltRounds = 10;

const newPassword = async(req, res) => { 
  try{ 
      const { email, password } = req.body;
      const user = await User.findAll({ where: { email } });
      if (user.length) {
        bcrypt.hash(password, saltRounds, async (err, hash) => {
          if (err) {
            console.log(err);
          }
          await User.update(
            {
              password: hash,
            },
            { where: { email: email } }
          );
        });
        res.send("Password actualizado correctamente");
        // registerMail(username);
      } else {
        res
          .status(401)
          .json({ error: "Este usuario no existe en la base de datos" });
      }
  }catch(error){ 
      console.log(error)
  }
} 

const passwordReset = async(req , res) => { 
    try{  
        const user = await User.findOne({
            where: {
              email: req.body.email,
            },
          });
          if (user) {
            var transporter = NODEMAILER.createTransport({
              service: "gmail",
              auth: {
                user: process.env.USER_ADMIN,
                pass: process.env.PASSWORD,
              },
            });
            var mailOptions = {
              from: process.env.USER_ADMIN,
              to: req.body.username,
              subject: "Recuperacion de contraseña!",
              html: `<p>Para cambiar su contraseña, por favor ingrese al siguiente enlace: <a href=http://localhost:3000/newPassword?usuario=${req.body.username}>RESETEAR CONTRASEÑA</a></p>`,
            };
            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                res.status(500).send(error.message);
              } else {
                res.status(200).jsonp(req.body);
                console.log("Email enviado");
              }
            });
          } else {
            res.json({ error: "Usuario no registrado!" });
          }
    }catch(error){ 
        console.log(error)
    }
} 

module.exports = { 
  newPassword,
  passwordReset,
}