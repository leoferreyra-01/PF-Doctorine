const { Users } = require("../db");

const newPassword = async(req, res) => { 
    try{ 
        const { username, password } = req.body;
        const user = await Users.findAll({ where: { username } });
        if (user.length) {
          bcrypt.hash(password, saltRounds, async (err, hash) => {
            if (err) {
              console.log(err);
            }
            await Users.update(
              {
                password: hash,
              },
              { where: { username: username } }
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