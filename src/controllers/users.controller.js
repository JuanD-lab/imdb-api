const {Users} = require('../models')

const list = async(req, res, next) => {
    try {
        const results = await Users.findAll({raw: true})
        console.log(results);
        res.json(results)
    } catch (error) {
        next(error)
    }
}

const create = async (req, res) => {
    try{
        const actor = await Users.create(req.body);
        res.json(actor);
    }catch(error){
        next(error);
    }
}

const update = async (req, res) => {
    try {
        const {id} = req.params
        const newData = await Users.update(req.body,{
            where: id
        })
        res.json(newData)
    } catch (error) {
        next(error)
    }
}

const destroy = async (req, res) => {
    try{
        const id = req.params.id;
        const actor = await Users.destroy({where: {id}});
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