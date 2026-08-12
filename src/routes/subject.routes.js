const express = require('express');
const router = express.Router();
const {
  getAllSubjects,
  getSubjectById,
  createSubject,
  updateSubject,
  deleteSubject
} = require('../controllers/subject.controller');
const { verifyToken, authorize } = require('../middleware/auth');

// Semua route subject memerlukan autentikasi
router.use(verifyToken);

// Admin only
router.post('/', authorize('admin'), createSubject);
router.put('/:id', authorize('admin'), updateSubject);
router.delete('/:id', authorize('admin'), deleteSubject);

// Admin, Guru, dan Siswa bisa lihat
router.get('/', authorize('admin', 'guru', 'siswa'), getAllSubjects);
router.get('/:id', authorize('admin', 'guru', 'siswa'), getSubjectById);

module.exports = router;