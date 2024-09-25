const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const { sequelize } = require('../config/db');

const db = {};

// Import model definitions
const UserModel = require('./Users');
const ProductModel = require('./Products');
const TokenModel = require('./Tokens');
const RoleModel = require('./Roles');

// Initialize models
db.Users = UserModel(sequelize, Sequelize.DataTypes);
db.Products = ProductModel(sequelize, Sequelize.DataTypes);
db.Tokens = TokenModel(sequelize, Sequelize.DataTypes);
db.Roles = RoleModel(sequelize, Sequelize.DataTypes);

// Define associations
db.Users.hasMany(db.Products, { foreignKey: 'userId', as: 'products' });
db.Users.hasMany(db.Tokens, { foreignKey: 'userId', as: 'tokens' });
db.Users.belongsToMany(db.Roles, { 
  through: 'user_roles', 
  as: 'roles', 
  foreignKey: 'userId' 
});

db.Products.belongsTo(db.Users, { foreignKey: 'userId' });

db.Tokens.belongsTo(db.Users, { foreignKey: 'userId' });

db.Roles.belongsToMany(db.Users, { 
  through: 'user_roles', 
  as: 'users', 
  foreignKey: 'role_id' 
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;