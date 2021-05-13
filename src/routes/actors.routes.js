const {Router} = require('express')
const route = Router()
//Methods
const {getActors, createActors, updateActors, deleteActors} = require('../controllers/actors.controller')

//Endpoints
route.get("/actors", getActors)//List
route.post("/actors", createActors)//Create
route.put("/actors", updateActors)//Update
route.delete("/actors/:id", deleteActors)//Delete

module.exports = route;