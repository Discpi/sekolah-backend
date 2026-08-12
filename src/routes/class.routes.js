const express = require('express');
const router = express.Router();
const {
  getAllClasses,
  getClassById,
  createClass,
  updateClass,
  deleteClass
} = require('../controllers/class.controller');
const { verifyToken, authorize } = require('../middleware/auth');

// Semua route class memerlukan autentikasi
router.use(verifyToken);

// Admin only
router.post('/', authorize('admin'), createClass);
router.put('/:id', authorize('admin'), updateClass);
router.delete('/:id', authorize('admin'), deleteClass);

// Admin & Guru bisa lihat
router.get('/', authorize('admin', 'guru'), getAllClasses);
router.get('/:id', authorize('admin', 'guru'), getClassById);

module.exports = router;