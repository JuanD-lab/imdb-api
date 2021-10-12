const {Directors, Movies} = require('../models')

const getOne = async(req,res,next) => {
    const id = parseInt(req.params.id);
    try{
        let content = await Directors.findOne({
            where: {id: id},
            include: [
                {
                    model: Movies,
                    attributes: ["id", "title"],
                    through: { attributes: [] }
                }
            ]
        });
        if(content){
            return res.json(content);
        } else {
            return res.status(404).json({message: `The content with id = ${id} does not exist`});
        }
    }catch(error){
        next(error);
    }
}

const list = async(req, res, next) => {
    try {
        const results = await Directors.findAll({
            include: [
                {
                    model: Movies,
                    attributes: ["id", "title"],
                    through: { attributes: [] }
                }
            ]
        })
        res.status(200)
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
            where: {id}
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
    getOne,
    list,
    create,
    update,
    destroy
}