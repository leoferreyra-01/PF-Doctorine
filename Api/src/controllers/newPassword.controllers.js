const { User } = require("../db");

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

module.exports = { 
    newPassword
}