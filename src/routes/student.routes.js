const express = require('express');
const router = express.Router();
const {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
} = require('../controllers/student.controller');
const { verifyToken, authorize } = require('../middleware/auth');

// Semua route student memerlukan autentikasi
router.use(verifyToken);

// Admin only
router.post('/', authorize('admin'), createStudent);
router.put('/:id', authorize('admin'), updateStudent);
router.delete('/:id', authorize('admin'), deleteStudent);

// Admin, Guru, dan Siswa bisa lihat (Siswa hanya datanya sendiri nanti)
router.get('/', authorize('admin', 'guru'), getAllStudents);
router.get('/:id', authorize('admin', 'guru'), getStudentById);

module.exports = router;