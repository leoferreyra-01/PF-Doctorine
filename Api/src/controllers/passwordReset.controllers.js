const { Users } = require("../db");
var NODEMAILER = require("nodemailer");
const passwordReset = async(req , res) => { 
    try{  
        const user = await Users.findOne({
            where: {
              username: req.body.username,
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
    passwordReset
}