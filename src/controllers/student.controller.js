const Student = require('../models/Student');
const User = require('../models/User');
const Class = require('../models/Class');

// GET ALL STUDENTS
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'email', 'name', 'phone', 'isActive']
        },
        {
          model: Class,
          as: 'class'
        }
      ]
    });
    
    res.status(200).json({
      success: true,
      count: students.length,
      data: students
    });
  } catch (error) {
    console.error('Get all students error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server',
      error: error.message
    });
  }
};

// GET STUDENT BY ID
const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findByPk(id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'email', 'name', 'phone', 'isActive']
        },
        {
          model: Class,
          as: 'class'
        }
      ]
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Siswa tidak ditemukan'
      });
    }

    res.status(200).json({
      success: true,
      data: student
    });
  } catch (error) {
    console.error('Get student by id error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server',
      error: error.message
    });
  }
};

// CREATE STUDENT
const createStudent = async (req, res) => {
  try {
    const { 
      userId, 
      nis, 
      classId, 
      birthDate, 
      birthPlace, 
      address, 
      parentName, 
      parentPhone 
    } = req.body;

    // Validasi
    if (!userId || !nis || !birthDate) {
      return res.status(400).json({
        success: false,
        message: 'userId, nis, dan birthDate harus diisi'
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

    // Cek apakah user sudah menjadi student
    const existingStudent = await Student.findOne({ where: { userId } });
    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: 'User ini sudah terdaftar sebagai siswa'
      });
    }

    // Cek NIS unik
    const existingNis = await Student.findOne({ where: { nis } });
    if (existingNis) {
      return res.status(400).json({
        success: false,
        message: 'NIS sudah terdaftar'
      });
    }

    // Cek class jika ada
    if (classId) {
      const classData = await Class.findByPk(classId);
      if (!classData) {
        return res.status(404).json({
          success: false,
          message: 'Kelas tidak ditemukan'
        });
      }
    }

    const student = await Student.create({
      userId,
      nis,
      classId: classId || null,
      birthDate,
      birthPlace: birthPlace || null,
      address: address || null,
      parentName: parentName || null,
      parentPhone: parentPhone || null
    });

    // Fetch with relations
    const newStudent = await Student.findByPk(student.id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'email', 'name', 'phone', 'isActive']
        },
        {
          model: Class,
          as: 'class'
        }
      ]
    });

    res.status(201).json({
      success: true,
      message: 'Siswa berhasil ditambahkan',
      data: newStudent
    });
  } catch (error) {
    console.error('Create student error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server',
      error: error.message
    });
  }
};

// UPDATE STUDENT
const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      nis, 
      classId, 
      birthDate, 
      birthPlace, 
      address, 
      parentName, 
      parentPhone,
      isActive 
    } = req.body;

    const student = await Student.findByPk(id);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Siswa tidak ditemukan'
      });
    }

    // Cek NIS unik (jika diubah)
    if (nis && nis !== student.nis) {
      const existingNis = await Student.findOne({ where: { nis } });
      if (existingNis) {
        return res.status(400).json({
          success: false,
          message: 'NIS sudah terdaftar'
        });
      }
    }

    // Cek class jika diubah
    if (classId && classId !== student.classId) {
      const classData = await Class.findByPk(classId);
      if (!classData) {
        return res.status(404).json({
          success: false,
          message: 'Kelas tidak ditemukan'
        });
      }
    }

    await student.update({
      nis: nis || student.nis,
      classId: classId !== undefined ? classId : student.classId,
      birthDate: birthDate || student.birthDate,
      birthPlace: birthPlace !== undefined ? birthPlace : student.birthPlace,
      address: address !== undefined ? address : student.address,
      parentName: parentName !== undefined ? parentName : student.parentName,
      parentPhone: parentPhone !== undefined ? parentPhone : student.parentPhone,
      isActive: isActive !== undefined ? isActive : student.isActive
    });

    const updatedStudent = await Student.findByPk(id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'email', 'name', 'phone', 'isActive']
        },
        {
          model: Class,
          as: 'class'
        }
      ]
    });

    res.status(200).json({
      success: true,
      message: 'Siswa berhasil diupdate',
      data: updatedStudent
    });
  } catch (error) {
    console.error('Update student error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server',
      error: error.message
    });
  }
};

// DELETE STUDENT
const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Siswa tidak ditemukan'
      });
    }

    await student.destroy();

    res.status(200).json({
      success: true,
      message: 'Siswa berhasil dihapus'
    });
  } catch (error) {
    console.error('Delete student error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server',
      error: error.message
    });
  }
};

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
};