const {Router} = require('express')
const route = Router()
const {verifyToken } = require('../middlewares/auth.middleware')
//Methods
const {list, create, update, destroy, verify} = require('../controllers/users.controller')

//Endpoints
route.get("/users", verifyToken, list)//List
route.post("/users", create)//Create
route.put("/users/:id", update)//Update
route.delete("/users/:id", destroy)//Delete
route.get("/verify/:hash", verify)

module.exports = route;