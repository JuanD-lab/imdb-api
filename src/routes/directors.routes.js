const {Router} = require('express')
const route = Router()
//Methods
const {list, create, update, destroy} = require('../controllers/directors.controller')

//Endpoints
route.get("/directors", list)//List
route.post("/directors", create)//Create
route.put("/directors/:id", update)//Update
route.delete("/directors/:id", destroy)//Delete

module.exports = route;