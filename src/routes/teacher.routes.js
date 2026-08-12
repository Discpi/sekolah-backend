const express = require('express');
const router = express.Router();
const {
  getAllTeachers,
  getTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher
} = require('../controllers/teacher.controller');
const { verifyToken, authorize } = require('../middleware/auth');

// Semua route teacher memerlukan autentikasi
router.use(verifyToken);

// Admin only
router.post('/', authorize('admin'), createTeacher);
router.put('/:id', authorize('admin'), updateTeacher);
router.delete('/:id', authorize('admin'), deleteTeacher);

// Admin & Guru bisa lihat
router.get('/', authorize('admin', 'guru'), getAllTeachers);
router.get('/:id', authorize('admin', 'guru'), getTeacherById);

module.exports = router;