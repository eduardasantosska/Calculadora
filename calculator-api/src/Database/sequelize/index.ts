  
const { Sequelize } = require('sequelize');
require('dotenv').config()

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_SERVER,
    dialect: process.env.DB_DRIVER,
	dialectOptions: {
		options: {
			instanceName: process.env.DB_SERVER_INSTANCE
		}
	},
    //operatorsAliases: true,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

const modelDefiners = [
	require('./models/Historic')
];

for (const modelDefiner of modelDefiners) {
	modelDefiner(sequelize);
}

module.exports = sequelize;