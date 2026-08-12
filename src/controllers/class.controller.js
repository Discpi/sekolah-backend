const Class = require('../models/Class');
const Teacher = require('../models/Teacher');
const User = require('../models/User');

// GET ALL CLASSES
const getAllClasses = async (req, res) => {
  try {
    const classes = await Class.findAll({
      include: [{
        model: Teacher,
        as: 'homeroomTeacher',
        include: [{
          model: User,
          as: 'user',
          attributes: ['id', 'email', 'name', 'phone']
        }]
      }]
    });
    
    res.status(200).json({
      success: true,
      count: classes.length,
      data: classes
    });
  } catch (error) {
    console.error('Get all classes error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server',
      error: error.message
    });
  }
};

// GET CLASS BY ID
const getClassById = async (req, res) => {
  try {
    const { id } = req.params;
    const classData = await Class.findByPk(id, {
      include: [{
        model: Teacher,
        as: 'homeroomTeacher',
        include: [{
          model: User,
          as: 'user',
          attributes: ['id', 'email', 'name', 'phone']
        }]
      }]
    });

    if (!classData) {
      return res.status(404).json({
        success: false,
        message: 'Kelas tidak ditemukan'
      });
    }

    res.status(200).json({
      success: true,
      data: classData
    });
  } catch (error) {
    console.error('Get class by id error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server',
      error: error.message
    });
  }
};

// CREATE CLASS
const createClass = async (req, res) => {
  try {
    const { name, gradeLevel, academicYear, teacherId, room, capacity } = req.body;

    // Validasi
    if (!name || !gradeLevel || !academicYear) {
      return res.status(400).json({
        success: false,
        message: 'name, gradeLevel, dan academicYear harus diisi'
      });
    }

    // Cek teacher jika ada
    if (teacherId) {
      const teacher = await Teacher.findByPk(teacherId);
      if (!teacher) {
        return res.status(404).json({
          success: false,
          message: 'Teacher tidak ditemukan'
        });
      }
    }

    const classData = await Class.create({
      name,
      gradeLevel,
      academicYear,
      teacherId: teacherId || null,
      room: room || null,
      capacity: capacity || 30
    });

    // Fetch with relations
    const newClass = await Class.findByPk(classData.id, {
      include: [{
        model: Teacher,
        as: 'homeroomTeacher',
        include: [{
          model: User,
          as: 'user',
          attributes: ['id', 'email', 'name', 'phone']
        }]
      }]
    });

    res.status(201).json({
      success: true,
      message: 'Kelas berhasil ditambahkan',
      data: newClass
    });
  } catch (error) {
    console.error('Create class error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server',
      error: error.message
    });
  }
};

// UPDATE CLASS
const updateClass = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, gradeLevel, academicYear, teacherId, room, capacity, isActive } = req.body;

    const classData = await Class.findByPk(id);
    if (!classData) {
      return res.status(404).json({
        success: false,
        message: 'Kelas tidak ditemukan'
      });
    }

    // Cek teacher jika diubah
    if (teacherId && teacherId !== classData.teacherId) {
      const teacher = await Teacher.findByPk(teacherId);
      if (!teacher) {
        return res.status(404).json({
          success: false,
          message: 'Teacher tidak ditemukan'
        });
      }
    }

    await classData.update({
      name: name || classData.name,
      gradeLevel: gradeLevel || classData.gradeLevel,
      academicYear: academicYear || classData.academicYear,
      teacherId: teacherId !== undefined ? teacherId : classData.teacherId,
      room: room !== undefined ? room : classData.room,
      capacity: capacity || classData.capacity,
      isActive: isActive !== undefined ? isActive : classData.isActive
    });

    const updatedClass = await Class.findByPk(id, {
      include: [{
        model: Teacher,
        as: 'homeroomTeacher',
        include: [{
          model: User,
          as: 'user',
          attributes: ['id', 'email', 'name', 'phone']
        }]
      }]
    });

    res.status(200).json({
      success: true,
      message: 'Kelas berhasil diupdate',
      data: updatedClass
    });
  } catch (error) {
    console.error('Update class error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server',
      error: error.message
    });
  }
};

// DELETE CLASS
const deleteClass = async (req, res) => {
  try {
    const { id } = req.params;
    const classData = await Class.findByPk(id);

    if (!classData) {
      return res.status(404).json({
        success: false,
        message: 'Kelas tidak ditemukan'
      });
    }

    await classData.destroy();

    res.status(200).json({
      success: true,
      message: 'Kelas berhasil dihapus'
    });
  } catch (error) {
    console.error('Delete class error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server',
      error: error.message
    });
  }
};

module.exports = {
  getAllClasses,
  getClassById,
  createClass,
  updateClass,
  deleteClass
};