'use strict';
module.exports = (sequelize, DataTypes) => {
  const Checkin = sequelize.define('Checkin', {
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
      allowNull: false
    },
    mood: {
      type: DataTypes.STRING,
      allowNull: false
    },
    stress_level: {
      type: DataTypes.STRING,
      allowNull: false
    },
    feelings: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Checkin.associate = function(models) {
    // Define associations here
    Checkin.belongsTo(models.User, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE'
    });
  };

  return Checkin;
};
