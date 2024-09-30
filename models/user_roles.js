module.exports = (sequelize, DataTypes) => {
  const user_roles = sequelize.define('user_roles', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    roleId: {
      type: DataTypes.UUID,
      references: {
        model: 'Roles',
        key: 'id'
      }
    }
  }, {
    timestamps: true,
    underscored: false
  });

  return user_roles;
};
