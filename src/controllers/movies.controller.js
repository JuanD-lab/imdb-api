const { Movies, Genres, Actors } = require("../models");

const getOne = async(req,res,next) => {
    const id = parseInt(req.params.id);
    try{
        let content = await Movies.findOne({
            where: {id: id},
            include: [
                {
                    model:Genres,
                    attributes: ["id", "name"],
                    through: { attributes: [] }
                },
                {
                    model:Actors,
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


const list = async (req, res, next) => {
    try {
        const results = await Movies.findAll({
            include: [
                {
                    model: Genres,
                    attributes: ["id", "name"],
                    through: { attributes: [] },
                },
                {
                    model:Actors,
                    through: { attributes: [] }
                }
                
            ],
        });
        res.json(results);
    } catch (error) {
        next(error);
    }
};

const create = async (req, res, next) => {
    try {
        const {title, year, description} = req.body
        const {actors, directors, genres} = req.body;
        
        res.json(movie);
    } catch (error) {
        next(error);
    }
};

const update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const newData = await Movies.update(req.body, {
            where: id,
        });
        res.json(newData);
    } catch (error) {
        next(error);
    }
};

const destroy = async (req, res, next) => {
    try {
        const id = req.params.id;
        const movie = await Movies.destroy({ where: { id } });
        res.json(movie);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getOne,
    list,
    create,
    update,
    destroy,
};
