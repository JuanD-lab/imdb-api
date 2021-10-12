const {Router} = require('express')
const route = Router()
//Methods
const {compare} = require('../controllers/login.controller')

//Endpoints
route.post("/login", compare)//Create

module.exports = route;