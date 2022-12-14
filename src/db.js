//______________________________________________________________________________
require('dotenv').config();
const { Sequelize, Op } = require('sequelize');
const fs = require('fs');
const path = require('path');
//______________________________________________________________________________
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
const sequelize = new Sequelize(
   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/imachinary`,
   {
      logging: false, // set to console.log to see the raw SQL queries
      native: false, // lets Sequelize know we can use pg-native for ~30% more speed
   }
);
const basename = path.basename(__filename);
const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
   .filter(
      (file) =>
         file.indexOf('.') !== 0 &&
         file !== basename &&
         file.slice(-3) === '.js'
   )
   .forEach((file) => {
      modelDefiners.push(require(path.join(__dirname, '/models', file)));
   });

modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
   entry[0][0].toUpperCase() + entry[0].slice(1),
   entry[1],
]);

sequelize.models = Object.fromEntries(capsEntries);

const {Person, Movie, Role } = sequelize.models;


Person.hasMany(Role);
Role.belongsTo(Person);

Movie.hasMany(Role);
Role.belongsTo(Movie);

/*
Just a comment!
Person.hasMany(Role) and Movie.hasMany(Role) will automatically
add the personId and movieId columns to Role, respectively.
*/


module.exports = {
   ...sequelize.models,
   conn: sequelize, 
   Op,
};