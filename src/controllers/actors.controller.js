const {Actors} = require('../models')

const getActors = async(req, res, next) => {
    try {
        const results = await Actors.findAll({raw: true})
        console.log(results);
        res.json(results)
    } catch (error) {
        next(error)
    }
}

const createActors = async (req, res) => {
    try{
        const actor = await Actors.create(req.body);
        res.json(actor);
    }catch(error){
        next(error);
    }
}

const updateActors = async (req, res) => {
    try {
        const {id} = req.params
        const newData = await Actors.update(req.body,{
            where: id
        })
        res.json(newData)
    } catch (error) {
        next(error)
    }
}

const deleteActors = async (req, res) => {
    try{
        const id = req.params.id;
        const actor = await Actors.destroy({where: {id}});
        res.json(actor);
    }catch(error){
        next(error);
    }
}

module.exports = {
    getActors,
    createActors,
    updateActors,
    deleteActors
}