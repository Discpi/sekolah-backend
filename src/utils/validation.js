const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validatePassword = (password) => {
  // Minimal 8 karakter, minimal 1 huruf dan 1 angka
  const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return re.test(password);
};

const validatePhone = (phone) => {
  if (!phone) return true; // optional
  const re = /^[0-9+\-\s()]+$/;
  return re.test(phone);
};

const validateName = (name) => {
  return name && name.length >= 2 && name.length <= 100;
};

module.exports = {
  validateEmail,
  validatePassword,
  validatePhone,
  validateName
};