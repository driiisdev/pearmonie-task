const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const { sequelize } = require('../config/db');
const db = {};

// Import model definitions
const User_model = require('./Users');
const Product_model = require('./Products');
const Token_model = require('./Tokens');
const Role_model = require('./Roles');
const User_roles_model = require('./user_roles');

// Initialize models
db.Users = User_model(sequelize, Sequelize.DataTypes);
db.Products = Product_model(sequelize, Sequelize.DataTypes);
db.Tokens = Token_model(sequelize, Sequelize.DataTypes);
db.Roles = Role_model(sequelize, Sequelize.DataTypes);
db.user_roles = User_roles_model(sequelize, Sequelize.DataTypes);

// Define associations
db.Users.hasMany(db.Products, { foreignKey: 'userId', as: 'products' });
db.Users.hasMany(db.Tokens, { foreignKey: 'userId', as: 'tokens' });
db.Users.belongsToMany(db.Roles, { 
  through: db.user_roles, 
  as: 'roles', 
  foreignKey: 'userId' 
});
db.Products.belongsTo(db.Users, { foreignKey: 'userId' });
db.Tokens.belongsTo(db.Users, { foreignKey: 'userId' });
db.Roles.belongsToMany(db.Users, { 
  through: db.user_roles, 
  as: 'users', 
  foreignKey: 'roleId' 
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
