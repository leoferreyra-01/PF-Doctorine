require('dotenv').config();
//holis c:
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
let sequelize =
  process.env.NODE_ENV === 'production'
    ? new Sequelize({
        database: DB_NAME,
        dialect: 'postgres',
        host: DB_HOST,
        port: 5432,
        username: DB_USER,
        password: DB_PASSWORD,
        pool: {
          max: 3,
          min: 1,
          idle: 10000,
        },
        dialectOptions: {
          ssl: {
            require: true,
            // Ref.: https://github.com/brianc/node-postgres/issues/2009
            rejectUnauthorized: false,
          },
          keepAlive: true,
        },
        ssl: true,
      })
    : new Sequelize(
        `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
        { logging: false, native: false }
      );
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter(
    file =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  )
  .forEach(file => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map(entry => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

const { User, Medic, Pacient, Calendar, Turn, Budget, Clinic, Hc, Teeth } =
  sequelize.models;

/* Medic.belongsToMany(Pacient, { through: Calendar });
Pacient.hasOne(Medic, { through: Calendar });

//relacion usario- paciente (1:1)
User.hasOne(Pacient);
Pacient.belongsTo(User);
// relacion paciente-presupuesto (1:N)
Pacient.hasMany(Budget);
Budget.belongsTo(Pacient);
//relacion paciente-turno (1:N)
Pacient.hasMany(Turn);
Turn.belongsTo(Pacient);
//relacion medico-turno (1:N)
Medic.hasMany(Turn);
Turn.belongsTo(Medic); */

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
