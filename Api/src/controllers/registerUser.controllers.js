const { User } = require("../db");
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
        const { email, password, userType, document, name, lastName, birth } = req.body;
        const user = await User.findAll({ where: { email } });
        if (!user.length) {
          bcrypt.hash(password, saltRounds, async (err, hash) => {
            if (err) {
              console.log(err);
            }
            await User.findOrCreate({
              where: {
                email: email,
                password: hash,
                userType: userType,
                document: document,
                name: name,
                lastName: lastName,
                birth: birth
              }, 
            });
          });
          res.json({ success: "Usuario creado correctamente"});
          registerMail(email);
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