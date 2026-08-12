# 🏫 Sistem Manajemen Sekolah - Backend API

![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![Express](https://img.shields.io/badge/Express-4.x-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15.x-blue)
![Sequelize](https://img.shields.io/badge/Sequelize-6.x-purple)

Sistem Manajemen Sekolah adalah RESTful API untuk mengelola data sekolah termasuk siswa, guru, kelas, mata pelajaran, dan autentikasi pengguna.

## 📋 Fitur

- ✅ Register & Login dengan JWT Token
- ✅ Manajemen Guru (CRUD)
- ✅ Manajemen Siswa (CRUD)
- ✅ Manajemen Kelas (CRUD)
- ✅ Manajemen Mata Pelajaran (CRUD)
- ✅ Role-based access control (Admin, Guru, Siswa)
- ✅ Password hashing dengan bcrypt
- ✅ Validasi input data

## 🛠️ Teknologi

| Komponen | Teknologi |
|----------|-----------|
| Runtime | Node.js |
| Framework | Express.js |
| Database | PostgreSQL |
| ORM | Sequelize |
| Auth | JWT + bcrypt |

## 🚀 Cara Instalasi

### 1. Clone Repository

```bash
git clone https://github.com/Discpi/sekolah-backend.git
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
Buat file .env di root folder:

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
⚠️ Ganti your_password dengan password PostgreSQL Anda!

5. Jalankan Server
bash
# Development mode (auto-restart)
npm run dev

# Production mode
npm start
Server akan berjalan di: http://localhost:5000

📡 API Endpoints
Autentikasi
Method	Endpoint	Deskripsi	Akses
POST	/api/auth/register	Daftar akun baru	Public
POST	/api/auth/login	Login	Public
GET	/api/auth/profile	Lihat profil	Private
Guru (Teachers)
Method	Endpoint	Deskripsi	Akses
GET	/api/teachers	Lihat semua guru	Admin, Guru
GET	/api/teachers/:id	Lihat detail guru	Admin, Guru
POST	/api/teachers	Tambah guru	Admin
PUT	/api/teachers/:id	Update guru	Admin
DELETE	/api/teachers/:id	Hapus guru	Admin
Siswa (Students)
Method	Endpoint	Deskripsi	Akses
GET	/api/students	Lihat semua siswa	Admin, Guru
GET	/api/students/:id	Lihat detail siswa	Admin, Guru
POST	/api/students	Tambah siswa	Admin
PUT	/api/students/:id	Update siswa	Admin
DELETE	/api/students/:id	Hapus siswa	Admin
Kelas (Classes)
Method	Endpoint	Deskripsi	Akses
GET	/api/classes	Lihat semua kelas	Admin, Guru
GET	/api/classes/:id	Lihat detail kelas	Admin, Guru
POST	/api/classes	Tambah kelas	Admin
PUT	/api/classes/:id	Update kelas	Admin
DELETE	/api/classes/:id	Hapus kelas	Admin
Mata Pelajaran (Subjects)
Method	Endpoint	Deskripsi	Akses
GET	/api/subjects	Lihat semua mapel	Admin, Guru, Siswa
GET	/api/subjects/:id	Lihat detail mapel	Admin, Guru, Siswa
POST	/api/subjects	Tambah mapel	Admin
PUT	/api/subjects/:id	Update mapel	Admin
DELETE	/api/subjects/:id	Hapus mapel	Admin
🔐 Authentication Headers
Untuk endpoint yang membutuhkan autentikasi, tambahkan header:

text
Authorization: Bearer <your_jwt_token>
🧪 Testing dengan Postman
Register Admin
Method: POST
URL: http://localhost:5000/api/auth/register
Headers: Content-Type: application/json
Body:

json
{
  "email": "admin@sekolah.com",
  "password": "Admin123",
  "name": "Administrator",
  "role": "admin",
  "phone": "08123456789"
}
Login
Method: POST
URL: http://localhost:5000/api/auth/login
Headers: Content-Type: application/json
Body:

json
{
  "email": "admin@sekolah.com",
  "password": "Admin123"
}
Response yang Diharapkan
json
{
  "success": true,
  "message": "Login berhasil",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "uuid",
    "email": "admin@sekolah.com",
    "name": "Administrator",
    "role": "admin"
  }
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
Status	Fitur
✅	Autentikasi & Authorisasi
✅	CRUD Teacher
✅	CRUD Student
✅	CRUD Class
✅	CRUD Subject
⬜	CRUD Attendance (Kehadiran)
⬜	CRUD Exam (Ujian)
⬜	CRUD Fee (Pembayaran)
⬜	Dashboard Analytics
⬜	Reporting System
📄 Lisensi
MIT License

Made with ❤️ for Education