const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
const { User } = require("../db");
const loginUser = async(req , res) => { 
    try { 
        const { email, password } = req.body; 
        // console.log(req.body)
        const user = await User.findOne({ where: { email: email } });
        // console.log(user)
    
        if (!user) {
          return res.status(401).json({ error: "invalid user or password" });
        }
        
        const passwordCorrect =
          user === null ? false : await bcrypt.compare(password, user.password);
    
        if (!(user && passwordCorrect)) {
          return res.status(401).json({ error: "invalid user or password" });
        }
    
        const userForToken = {
          ID: user.ID,
          email: user.email,
        };
    
        const token = jwt.sign(userForToken, process.env.SECRET);
    
        res.send({
          email: user.email,
          token,
          userType: user.userType,
          name: user.name,
          lastName: user.lastName,
          document: user.document,
          birth: user.birth,
        });
      } catch (err) {
        console.log(err);
      }
} 

module.exports = { 
    loginUser
}