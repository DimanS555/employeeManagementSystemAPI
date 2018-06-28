const Sequelize = require('sequelize');
const env = require('./env');
const sequelize = new Sequelize(env.DATABASE_NAME, env.DATABASE_USERNAME, env.DATABASE_PASSWORD, {
  host: env.DATABASE_HOST,
  dialect: env.DATABASE_DIALECT,
  define: {
    underscored: true
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Connect all the models/tables in the database to a db object,
//so everything is accessible via one object
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.department = require('../models/departments.js')(sequelize, Sequelize);
db.employee = require('../models/employees.js')(sequelize, Sequelize);

//Relations
db.employee.belongsTo(db.department, {foreignKey: 'emp_depID'});
db.department.hasMany(db.employee, {foreignKey: 'emp_depID'});

module.exports = db;