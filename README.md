# 🏫 Sistem Manajemen Sekolah - Backend API

Sistem Manajemen Sekolah adalah RESTful API untuk mengelola data sekolah.

## 📋 Fitur

- Register & Login dengan JWT
- Manajemen Guru (CRUD)
- Manajemen Siswa (CRUD)
- Manajemen Kelas (CRUD)
- Manajemen Mata Pelajaran (CRUD)
- Role-based access control (Admin, Guru, Siswa)

## 🛠️ Teknologi

- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM
- JWT Authentication
- Bcrypt Password Hashing

## 🚀 Cara Instalasi

### 1. Clone atau Download Project

```bash
cd sekolah-backend
2. Install Dependencies
bash
npm install
3. Setup Database PostgreSQL
bash
# Login ke PostgreSQL
psql -U postgres

# Buat database
CREATE DATABASE sekolah_db;

# Keluar
\q
4. Buat File .env
Buat file .env di root folder dengan isi:

env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=sekolah_db
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
NODE_ENV=development
5. Jalankan Server
bash
npm run dev
Server akan berjalan di: http://localhost:5000

📡 API Endpoints
Autentikasi
Method	Endpoint	Deskripsi
POST	/api/auth/register	Daftar akun baru
POST	/api/auth/login	Login
GET	/api/auth/profile	Lihat profil (login required)
Guru (Teachers)
Method	Endpoint	Deskripsi
GET	/api/teachers	Lihat semua guru
GET	/api/teachers/:id	Lihat detail guru
POST	/api/teachers	Tambah guru (Admin)
PUT	/api/teachers/:id	Update guru (Admin)
DELETE	/api/teachers/:id	Hapus guru (Admin)
Siswa (Students)
Method	Endpoint	Deskripsi
GET	/api/students	Lihat semua siswa
GET	/api/students/:id	Lihat detail siswa
POST	/api/students	Tambah siswa (Admin)
PUT	/api/students/:id	Update siswa (Admin)
DELETE	/api/students/:id	Hapus siswa (Admin)
Kelas (Classes)
Method	Endpoint	Deskripsi
GET	/api/classes	Lihat semua kelas
GET	/api/classes/:id	Lihat detail kelas
POST	/api/classes	Tambah kelas (Admin)
PUT	/api/classes/:id	Update kelas (Admin)
DELETE	/api/classes/:id	Hapus kelas (Admin)
Mata Pelajaran (Subjects)
Method	Endpoint	Deskripsi
GET	/api/subjects	Lihat semua mapel
GET	/api/subjects/:id	Lihat detail mapel
POST	/api/subjects	Tambah mapel (Admin)
PUT	/api/subjects/:id	Update mapel (Admin)
DELETE	/api/subjects/:id	Hapus mapel (Admin)
🧪 Testing dengan Postman
Register Admin
json
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "email": "admin@sekolah.com",
  "password": "Admin123",
  "name": "Administrator",
  "role": "admin",
  "phone": "08123456789"
}
Login
json
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "admin@sekolah.com",
  "password": "Admin123"
}
📁 Struktur Folder
text
sekolah-backend/
├── src/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── teacher.controller.js
│   │   ├── student.controller.js
│   │   ├── class.controller.js
│   │   └── subject.controller.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Teacher.js
│   │   ├── Student.js
│   │   ├── Class.js
│   │   └── Subject.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── teacher.routes.js
│   │   ├── student.routes.js
│   │   ├── class.routes.js
│   │   └── subject.routes.js
│   ├── middleware/
│   │   └── auth.js
│   └── utils/
│       └── validation.js
├── .env
├── .gitignore
├── README.md
├── package.json
└── server.js
📝 TODO List
☑ Autentikasi & Authorisasi
☑ CRUD Teacher
☑ CRUD Student
☑ CRUD Class
☑ CRUD Subject
□ CRUD Attendance (Kehadiran)
□ CRUD Exam (Ujian)
□ CRUD Fee (Pembayaran)