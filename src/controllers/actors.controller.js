const {Actors} = require('../models')
const {ViewsMethods} = require('./controller')

const list = async(req, res, next) => {
    try {
        const results = await Actors.findAll({raw: true})
        res.json(results)
    } catch (error) {
        next(error)
    }
}


const create = async (req, res, next) => {
    try{
        const actor = await Actors.create(req.body);
        res.json(actor);
    }catch(error){
        next(error);
    }
}

const update = async (req, res, next) => {
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

const destroy = async (req, res, next) => {
    try{
        const id = req.params.id;
        const actor = await Actors.destroy({where: {id}});
        res.json(actor);
    }catch(error){
        next(error);
    }
}

module.exports = {
    list,
    create,
    update,
    destroy
}