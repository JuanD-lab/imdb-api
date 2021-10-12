const {Router} = require('express')
const route = Router()
//Methods
const {getOne, list, create, update, destroy} = require('../controllers/actors.controller')

//Endpoints
route.get("/actors/:id", getOne)//ListOne
route.get("/actors", list)//List
route.post("/actors", create)//Create
route.put("/actors/:id", update)//Update
route.delete("/actors/:id", destroy)//Delete

module.exports = route;