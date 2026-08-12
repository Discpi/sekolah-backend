require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize, testConnection } = require('./src/config/database');

// Import semua model
require('./src/models/User');
require('./src/models/Teacher');
require('./src/models/Class');
require('./src/models/Student');
require('./src/models/Subject');

const authRoutes = require('./src/routes/auth.routes');
const teacherRoutes = require('./src/routes/teacher.routes');
const classRoutes = require('./src/routes/class.routes');
const studentRoutes = require('./src/routes/student.routes');
const subjectRoutes = require('./src/routes/subject.routes'); // <-- TAMBAHKAN

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test database connection
testConnection();

// Sync database
const initDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('✅ Database synchronized');
  } catch (error) {
    console.error('❌ Database sync error:', error);
  }
};

initDatabase();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/subjects', subjectRoutes); // <-- TAMBAHKAN

// Basic route
app.get('/', (req, res) => {
  res.json({
    message: 'Sekolah API is running',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      teachers: '/api/teachers',
      classes: '/api/classes',
      students: '/api/students',
      subjects: '/api/subjects'
    }
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Global error:', err);
  res.status(500).json({
    success: false,
    message: 'Terjadi kesalahan pada server',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 http://localhost:${PORT}`);
});