const Subject = require('../models/Subject');
const Teacher = require('../models/Teacher');
const Class = require('../models/Class');
const User = require('../models/User');

// GET ALL SUBJECTS
const getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.findAll({
      include: [
        {
          model: Teacher,
          as: 'teacher',
          include: [{
            model: User,
            as: 'user',
            attributes: ['id', 'email', 'name', 'phone']
          }]
        },
        {
          model: Class,
          as: 'class'
        }
      ]
    });
    
    res.status(200).json({
      success: true,
      count: subjects.length,
      data: subjects
    });
  } catch (error) {
    console.error('Get all subjects error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server',
      error: error.message
    });
  }
};

// GET SUBJECT BY ID
const getSubjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const subject = await Subject.findByPk(id, {
      include: [
        {
          model: Teacher,
          as: 'teacher',
          include: [{
            model: User,
            as: 'user',
            attributes: ['id', 'email', 'name', 'phone']
          }]
        },
        {
          model: Class,
          as: 'class'
        }
      ]
    });

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: 'Mata pelajaran tidak ditemukan'
      });
    }

    res.status(200).json({
      success: true,
      data: subject
    });
  } catch (error) {
    console.error('Get subject by id error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server',
      error: error.message
    });
  }
};

// CREATE SUBJECT
const createSubject = async (req, res) => {
  try {
    const { name, code, teacherId, classId, schedule, room, semester } = req.body;

    // Validasi
    if (!name || !code || !teacherId || !classId) {
      return res.status(400).json({
        success: false,
        message: 'name, code, teacherId, dan classId harus diisi'
      });
    }

    // Cek teacher
    const teacher = await Teacher.findByPk(teacherId);
    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: 'Teacher tidak ditemukan'
      });
    }

    // Cek class
    const classData = await Class.findByPk(classId);
    if (!classData) {
      return res.status(404).json({
        success: false,
        message: 'Kelas tidak ditemukan'
      });
    }

    // Cek code unik
    const existingCode = await Subject.findOne({ where: { code } });
    if (existingCode) {
      return res.status(400).json({
        success: false,
        message: 'Kode mata pelajaran sudah terdaftar'
      });
    }

    const subject = await Subject.create({
      name,
      code,
      teacherId,
      classId,
      schedule: schedule || null,
      room: room || null,
      semester: semester || '1'
    });

    // Fetch with relations
    const newSubject = await Subject.findByPk(subject.id, {
      include: [
        {
          model: Teacher,
          as: 'teacher',
          include: [{
            model: User,
            as: 'user',
            attributes: ['id', 'email', 'name', 'phone']
          }]
        },
        {
          model: Class,
          as: 'class'
        }
      ]
    });

    res.status(201).json({
      success: true,
      message: 'Mata pelajaran berhasil ditambahkan',
      data: newSubject
    });
  } catch (error) {
    console.error('Create subject error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server',
      error: error.message
    });
  }
};

// UPDATE SUBJECT
const updateSubject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, code, teacherId, classId, schedule, room, semester, isActive } = req.body;

    const subject = await Subject.findByPk(id);
    if (!subject) {
      return res.status(404).json({
        success: false,
        message: 'Mata pelajaran tidak ditemukan'
      });
    }

    // Cek code unik (jika diubah)
    if (code && code !== subject.code) {
      const existingCode = await Subject.findOne({ where: { code } });
      if (existingCode) {
        return res.status(400).json({
          success: false,
          message: 'Kode mata pelajaran sudah terdaftar'
        });
      }
    }

    // Cek teacher jika diubah
    if (teacherId && teacherId !== subject.teacherId) {
      const teacher = await Teacher.findByPk(teacherId);
      if (!teacher) {
        return res.status(404).json({
          success: false,
          message: 'Teacher tidak ditemukan'
        });
      }
    }

    // Cek class jika diubah
    if (classId && classId !== subject.classId) {
      const classData = await Class.findByPk(classId);
      if (!classData) {
        return res.status(404).json({
          success: false,
          message: 'Kelas tidak ditemukan'
        });
      }
    }

    await subject.update({
      name: name || subject.name,
      code: code || subject.code,
      teacherId: teacherId || subject.teacherId,
      classId: classId || subject.classId,
      schedule: schedule !== undefined ? schedule : subject.schedule,
      room: room !== undefined ? room : subject.room,
      semester: semester || subject.semester,
      isActive: isActive !== undefined ? isActive : subject.isActive
    });

    const updatedSubject = await Subject.findByPk(id, {
      include: [
        {
          model: Teacher,
          as: 'teacher',
          include: [{
            model: User,
            as: 'user',
            attributes: ['id', 'email', 'name', 'phone']
          }]
        },
        {
          model: Class,
          as: 'class'
        }
      ]
    });

    res.status(200).json({
      success: true,
      message: 'Mata pelajaran berhasil diupdate',
      data: updatedSubject
    });
  } catch (error) {
    console.error('Update subject error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server',
      error: error.message
    });
  }
};

// DELETE SUBJECT
const deleteSubject = async (req, res) => {
  try {
    const { id } = req.params;
    const subject = await Subject.findByPk(id);

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: 'Mata pelajaran tidak ditemukan'
      });
    }

    await subject.destroy();

    res.status(200).json({
      success: true,
      message: 'Mata pelajaran berhasil dihapus'
    });
  } catch (error) {
    console.error('Delete subject error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server',
      error: error.message
    });
  }
};

module.exports = {
  getAllSubjects,
  getSubjectById,
  createSubject,
  updateSubject,
  deleteSubject
};