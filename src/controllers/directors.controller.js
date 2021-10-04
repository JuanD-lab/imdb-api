const {Directors} = require('../models')

const list = async(req, res, next) => {
    try {
        const results = await Directors.findAll({raw: true})
        console.log(results);
        res.json(results)
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try{
        const actor = await Directors.create(req.body);
        res.json(actor);
    }catch(error){
        next(error);
    }
}

const update = async (req, res, next) => {
    try {
        const {id} = req.params
        const newData = await Directors.update(req.body,{
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
        const actor = await Directors.destroy({where: {id}});
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