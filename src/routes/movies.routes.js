const {Router} = require('express')
const route = Router()
//Methods
const {getOne, list, create, update, destroy} = require('../controllers/movies.controller')

//Endpoints
route.get("/movies/:id", getOne)//List
route.get("/movies", list)//List
route.post("/movies", create)//Create
route.put("/movies", update)//Update
route.delete("/movies/:id", destroy)//Delete

module.exports = route;