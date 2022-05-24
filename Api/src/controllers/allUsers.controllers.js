const { Users } = require("../db");
const allUsers = async(req, res) => { 
    try {
        const users = await Users.findAll();
        res.json(users);
      } catch (e) {
        console.log(e);
      }
}  
Users

module.exports = { 
    allUsers
}