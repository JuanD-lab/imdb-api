'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GenresMovies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Movies, {foreignKey: 'movie_id'});
      this.belongsTo(models.Genres, {foreignKey: 'genre_id'});
    }
  };
  GenresMovies.init({
    genre_id: DataTypes.INTEGER,
    movie_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'genres_movies',
    underscored: true,
            tableName: "genres_movies",
  });
  return GenresMovies;
};