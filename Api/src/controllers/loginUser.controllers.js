const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
const { Users } = require("../db");
const loginUser = async(req , res) => { 
    try { 
        const { username, password } = req.body; 
        console.log(req.body)
        const user = await Users.findOne({ where: { username: username } });
        console.log(user)
    
        if (!user) {
          return res.status(401).json({ error: "invalid user or password" });
        }
        
        const passwordCorrect =
          user === null ? false : await bcrypt.compare(password, user.password);
    
        if (!(user && passwordCorrect)) {
          return res.status(401).json({ error: "invalid user or password" });
        }
    
        const userForToken = {
          id: user.id,
          username: user.username,
        };
    
        const token = jwt.sign(userForToken, process.env.SECRET);
    
        res.send({
          username: user.username,
          favourites: user.favourites,
          token,
          isAdmin: user.isAdmin,
          payment: user.payment
        });
      } catch (err) {
        console.log(err);
      }
} 

module.exports = { 
    loginUser
}