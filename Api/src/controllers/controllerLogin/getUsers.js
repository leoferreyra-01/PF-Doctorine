const { User } = require("../../db");
const allUsers = async(req, res) => { 
    try {
        const users = await User.findAll();
        res.json(users);
      } catch (e) {
        console.log(e);
      }
}  

module.exports = { 
    allUsers
}