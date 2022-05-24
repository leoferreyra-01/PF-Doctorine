const { Users } = require("../db")

const userExist = async(req, res) => {
    try {
        const { username } = req.body
        const user = await Users.findOne({ where: {username}})
        console.log(user)
        if(user){ 
            return res.json({ success: "usuario encontrado"})
        }else{ 
            return res.json({ failure: "usuario no encontrado"})
        }
    } catch (error) {
        console.log(error)        
    }
}

module.exports = { 
    userExist
}