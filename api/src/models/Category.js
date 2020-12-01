const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	// defino el modelo de category
	sequelize.define('category', {
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});
};
