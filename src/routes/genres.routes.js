const {Router} = require('express')
const route = Router()
//Methods
const {getOne, list, create, update, destroy} = require('../controllers/genres.controller')

//Endpoints
route.get("/genres/:id", getOne)//ListOne
route.get("/genres", list)//List
route.post("/genres", create)//Create
route.put("/genres/:id", update)//Update
route.delete("/genres/:id", destroy)//Delete

module.exports = route;