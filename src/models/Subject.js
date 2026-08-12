const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Teacher = require('./Teacher');
const Class = require('./Class');

const Subject = sequelize.define('Subject', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  code: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true
    }
  },
  teacherId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Teacher,
      key: 'id'
    }
  },
  classId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Class,
      key: 'id'
    }
  },
  schedule: {
    type: DataTypes.STRING(50),
    allowNull: true // Contoh: "Senin 08:00-09:30"
  },
  room: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  semester: {
    type: DataTypes.ENUM('1', '2'),
    allowNull: false,
    defaultValue: '1'
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'subjects',
  timestamps: true
});

// Relasi
Subject.belongsTo(Teacher, { foreignKey: 'teacherId', as: 'teacher' });
Teacher.hasMany(Subject, { foreignKey: 'teacherId', as: 'subjects' });

Subject.belongsTo(Class, { foreignKey: 'classId', as: 'class' });
Class.hasMany(Subject, { foreignKey: 'classId', as: 'subjects' });

module.exports = Subject;