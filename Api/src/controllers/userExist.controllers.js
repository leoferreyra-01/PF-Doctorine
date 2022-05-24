const { User } = require("../db")

const userExist = async(req, res) => {
    try {
        const { email } = req.body
        const user = await User.findOne({ where: {email}})
        // console.log(user)
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