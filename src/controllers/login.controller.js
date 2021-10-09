const {Users} = require('../models')
const bcrypt = require('bcryptjs');
const createToken = require('../middlewares/createToken.middleware')


const compare = async (req, res, next) => {
    try{
        const {email, password} = req.body
        const [user] = await Users.findAll({where: {email}, raw: true})
        console.log(user);
        if (user) {
            const userPass = user.password
            const validPass = await bcrypt.compare(password, userPass)
            if (validPass) {
                const token = createToken(user)
                user.reset_token = token
                res.json({token})
            } else {
                res.status(400).json("Incorrect credentials")
            }
        } else {
            console.log("no founde");
            res.status(404).json("User not found")
        }
    }catch(error){
        /* next(error); */
        res.status(500).json({error: error.message})
    }
}

module.exports = {
    compare
}