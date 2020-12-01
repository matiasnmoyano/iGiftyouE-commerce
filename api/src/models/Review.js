const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

	// defino el modelo de user
	sequelize.define('review', {
		description: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		rating: {
			type: DataTypes.ENUM("1", "2", "3", "4", "5"),
			//defaultValue = ?
		},
	});

};
