"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class ActorsMovies extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    ActorsMovies.init(
        {
            actor_id: DataTypes.INTEGER,
            movie_id: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "ActorsMovies",
            underscored: true,
            tableName: "actors_movies",
        }
    );
    return ActorsMovies;
};
