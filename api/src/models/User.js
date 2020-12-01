const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	// Modelo de usuario
	sequelize.define(
		'user',
		{
			name: {
				type: DataTypes.STRING,
				allowNull: true,
				validate: {
					isString(value) {
						if (typeof value !== 'string')
							throw new Error('Ingresa un nombre valido');
					},
				},
			},
			username: {
				type: DataTypes.TEXT,
				allowNull: true,
				unique: true,
			},

			rol: {
				type: DataTypes.STRING,
				defaultValue: 'Client',
				validate: {
					isString(value) {
						if (value && typeof value !== 'string')
							throw new Error('El rol debe ser valido');
					},
				},
			},

			email: {
				type: DataTypes.STRING,
				unique: true,
				validate: {
					isEmail: true,
				},
			},

			password: {
				type: DataTypes.STRING,
				get() {
					return () => this.getDataValue('password');
				},
			},

			salt: {
				type: DataTypes.STRING,
				get() {
					return () => this.getDataValue('salt');
				},
			},
			googleId: {
				type: DataTypes.STRING
			},

			githubId: {
				type: DataTypes.STRING
			},

			facebookId: {
				type: DataTypes.STRING
			},
		},
		{
			validate: {
				OAuthOrPassword() {
					if (!this.googleId && !this.githubId && !this.facebookId && !this.password) {
						throw new Error('No has iniciado sesión');
					}
				},
			},
		}
	);
};
