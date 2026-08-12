const Teacher = require('../models/Teacher');
const User = require('../models/User');

// GET ALL TEACHERS
const getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.findAll({
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'email', 'name', 'phone', 'isActive']
      }]
    });
    
    res.status(200).json({
      success: true,
      count: teachers.length,
      data: teachers
    });
  } catch (error) {
    console.error('Get all teachers error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server',
      error: error.message
    });
  }
};

// GET TEACHER BY ID
const getTeacherById = async (req, res) => {
  try {
    const { id } = req.params;
    const teacher = await Teacher.findByPk(id, {
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'email', 'name', 'phone', 'isActive']
      }]
    });

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: 'Teacher tidak ditemukan'
      });
    }

    res.status(200).json({
      success: true,
      data: teacher
    });
  } catch (error) {
    console.error('Get teacher by id error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server',
      error: error.message
    });
  }
};

// CREATE TEACHER
const createTeacher = async (req, res) => {
  try {
    const { userId, nip, specialization, joinDate } = req.body;

    // Validasi
    if (!userId || !nip || !specialization) {
      return res.status(400).json({
        success: false,
        message: 'userId, nip, dan specialization harus diisi'
      });
    }

    // Cek apakah user ada
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User tidak ditemukan'
      });
    }

    // Cek apakah user sudah menjadi teacher
    const existingTeacher = await Teacher.findOne({ where: { userId } });
    if (existingTeacher) {
      return res.status(400).json({
        success: false,
        message: 'User ini sudah terdaftar sebagai teacher'
      });
    }

    // Cek NIP unik
    const existingNip = await Teacher.findOne({ where: { nip } });
    if (existingNip) {
      return res.status(400).json({
        success: false,
        message: 'NIP sudah terdaftar'
      });
    }

    const teacher = await Teacher.create({
      userId,
      nip,
      specialization,
      joinDate: joinDate || new Date()
    });

    // Fetch with user data
    const newTeacher = await Teacher.findByPk(teacher.id, {
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'email', 'name', 'phone', 'isActive']
      }]
    });

    res.status(201).json({
      success: true,
      message: 'Teacher berhasil ditambahkan',
      data: newTeacher
    });
  } catch (error) {
    console.error('Create teacher error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server',
      error: error.message
    });
  }
};

// UPDATE TEACHER
const updateTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const { nip, specialization, joinDate, isActive } = req.body;

    const teacher = await Teacher.findByPk(id);
    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: 'Teacher tidak ditemukan'
      });
    }

    // Cek NIP unik (jika diubah)
    if (nip && nip !== teacher.nip) {
      const existingNip = await Teacher.findOne({ where: { nip } });
      if (existingNip) {
        return res.status(400).json({
          success: false,
          message: 'NIP sudah terdaftar'
        });
      }
    }

    await teacher.update({
      nip: nip || teacher.nip,
      specialization: specialization || teacher.specialization,
      joinDate: joinDate || teacher.joinDate,
      isActive: isActive !== undefined ? isActive : teacher.isActive
    });

    const updatedTeacher = await Teacher.findByPk(id, {
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'email', 'name', 'phone', 'isActive']
      }]
    });

    res.status(200).json({
      success: true,
      message: 'Teacher berhasil diupdate',
      data: updatedTeacher
    });
  } catch (error) {
    console.error('Update teacher error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server',
      error: error.message
    });
  }
};

// DELETE TEACHER
const deleteTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const teacher = await Teacher.findByPk(id);

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: 'Teacher tidak ditemukan'
      });
    }

    await teacher.destroy();

    res.status(200).json({
      success: true,
      message: 'Teacher berhasil dihapus'
    });
  } catch (error) {
    console.error('Delete teacher error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server',
      error: error.message
    });
  }
};

module.exports = {
  getAllTeachers,
  getTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher
};