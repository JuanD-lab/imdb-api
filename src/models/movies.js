"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Movies extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsToMany(models.Genres, {
                through: "genres_movies",
                foreignKey: "movie_id",
            });
            this.belongsToMany(models.Actors, {
                through: "actors_movies",
                foreignKey: "movie_id",
            });
            this.belongsToMany(models.Directors, {
                through: "directors_movies",
                foreignKey: "movie_id",
            });
        }
    }
    Movies.init(
        {
            title: DataTypes.STRING,
            year: DataTypes.DATE,
            description: DataTypes.CHAR,
        },
        {
            sequelize,
            underscored: true,
            modelName: "Movies",
            tableName: "movies",
        }
    );
    return Movies;
};
