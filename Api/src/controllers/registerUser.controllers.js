const { Users } = require("../db");
var NODEMAILER = require("nodemailer");  
const bcrypt = require("bcrypt");
const saltRounds = 10;
var registerMail = async (username) => {
    var transporter = NODEMAILER.createTransport({
      service: "gmail",
      // host: "smtp.gmail.com",
      // port: 465,
      // secure: true,
      auth: {
        user: process.env.USER_ADMIN,
        pass: process.env.PASSWORD,
      },
    });
    var mailOptions = {
      from: process.env.USER_ADMIN,
      to: username,
      subject: "Registro exitoso!",
      text: "Hola, queremos informarte que tu cuenta fue registrada correctamente en mode parfum ❤",
    };
    
  };

const registerUser = async(req, res) => { 
    try {
        const { username, password } = req.body;
        const user = await Users.findAll({ where: { username } });
        if (!user.length) {
          bcrypt.hash(password, saltRounds, async (err, hash) => {
            if (err) {
              console.log(err);
            }
            await Users.findOrCreate({
              where: {
                username,
                password: hash,
                favourites: [],
                isAdmin: false,
                payment: 0
              }, 
            });
          });
          res.json({ success: "Usuario creado correctamente"});
          registerMail(username);
        } else {
          res
            .status(401)
            .json({ error: "Este usuario ya existe en la base de datos" });
        }
        }catch(error){ 
            console.log(error)
        } 
}
module.exports = { 
    registerUser
}