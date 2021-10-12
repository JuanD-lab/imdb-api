const { Movies, Genres, Actors, ActorsMovies, DirectorsMovies, GenresMovies } = require("../models");

const getOne = async (req, res, next) => {
    const id = parseInt(req.params.id);
    try {
        let content = await Movies.findOne({
            where: { id: id },
            include: [
                {
                    model: Genres,
                    attributes: ["id", "name"],
                    through: { attributes: [] },
                },
                {
                    model: Actors,
                    through: { attributes: [] },
                },
            ],
        });
        if (content) {
            return res.json(content);
        } else {
            return res
                .status(404)
                .json({
                    message: `The content with id = ${id} does not exist`,
                });
        }
    } catch (error) {
        next(error);
    }
};

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
                    model: Actors,
                    through: { attributes: [] },
                },
            ],
        });
        res.json(results);
    } catch (error) {
        next(error);
    }
};

const create = async (req, res, next) => {
    const { title, year, description } = req.body;
    let { actors, directors, genres } = req.body;
    try {
        const movie = await Movies.create({
            title: title,
            year: year,
            description: description,
        });

        const movie_id = movie.id
        actors = actors.map(actor_id => {return {actor_id, movie_id}})
        directors = directors.map(director_id => {return {director_id, movie_id}})
        genres = genres.map(genre_id => {return {genre_id, movie_id}})

        await ActorsMovies.bulkCreate(actors)
        await DirectorsMovies.bulkCreate(directors)
        await GenresMovies.bulkCreate(genres)

        res.status(201).json(movie);
    } catch (error) {
        next(error);
    }
};

const update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const newData = await Movies.update(req.body, {
            where: {id},
        });
        res.json(newData);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const destroy = async (req, res, next) => {
    try {
        const id = req.params.id;
        await ActorsMovies.destroy({where: {movie_id: id}});
        await DirectorsMovies.destroy({where: {movie_id: id}});
        await GenresMovies.destroy({where: {movie_id: id}});
        const movie = await Movies.destroy({ where: { id } });
        
        if(movie){
            return res.json(movie);
        } else {
            return res.status(204).json({message: `The movie with id = ${id} does not exist`});
        }
        
    } catch (error) {
        console.log(error.message);
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
