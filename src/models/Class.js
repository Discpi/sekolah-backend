const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Teacher = require('./Teacher');

const Class = sequelize.define('Class', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  gradeLevel: {
    type: DataTypes.ENUM('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'),
    allowNull: false
  },
  academicYear: {
    type: DataTypes.STRING(9),
    allowNull: false,
    validate: {
      is: /^\d{4}-\d{4}$/ // Format: 2024-2025
    }
  },
  teacherId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: Teacher,
      key: 'id'
    }
  },
  room: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 30,
    validate: {
      min: 1,
      max: 60
    }
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'classes',
  timestamps: true
});

// Relasi: Class belongs to Teacher (Wali Kelas)
Class.belongsTo(Teacher, { foreignKey: 'teacherId', as: 'homeroomTeacher' });
Teacher.hasMany(Class, { foreignKey: 'teacherId', as: 'classes' });

module.exports = Class;