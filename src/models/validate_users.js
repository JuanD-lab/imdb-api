"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class ValidateUsers extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    ValidateUsers.init(
        {
            user_id: DataTypes.INTEGER,
            hash: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "ValidateUsers",
            underscored: true,
            tableName: "validate_users",
        }
    );
    return ValidateUsers;
};
