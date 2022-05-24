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
        {
          logging: false,
          native: false,
          define: {
            timestamps: false,
          },
        }
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

const {
  User,
  Medic,
  Patient,
  Turn,
  Budget,
  Clinic,
  ClinicalHistory,
  Treatment,
  Teeth,
  Study,
  Evolution,
} = sequelize.models;

//|> Link to Entity-Relationship Graph
//|+| https://lucid.app/lucidchart/df218597-db1f-4af2-9be3-44065e6a2742/edit?viewport_loc=-1807%2C61%2C1932%2C879%2C0_0&invitationId=inv_d35df4bd-465c-489d-a869-6f0639658c4f

User.hasOne(Medic);
Medic.belongsTo(User);

User.hasOne(Patient);
Patient.belongsTo(User);

Patient.hasMany(Turn);
Turn.belongsTo(Patient);

Medic.hasMany(Turn);
Turn.belongsTo(Medic);

Patient.hasMany(Budget);
Budget.belongsTo(Patient);

Clinic.hasOne(Medic);
Medic.belongsTo(Clinic);

Patient.hasOne(ClinicalHistory);
ClinicalHistory.belongsTo(Patient);

Patient.hasMany(Study);
Study.belongsTo(Patient);

Clinic.hasMany(Treatment);
Treatment.belongsTo(Clinic);

// EVOLUTION

Patient.hasMany(Evolution);
Evolution.belongsTo(Patient);

Medic.hasOne(Evolution);
Evolution.belongsTo(Medic);

Treatment.hasOne(Evolution);
Evolution.belongsTo(Treatment);

Teeth.hasOne(Evolution);
Evolution.belongsTo(Teeth);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  sequelize,
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
