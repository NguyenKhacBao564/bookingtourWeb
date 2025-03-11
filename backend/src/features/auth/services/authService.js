// backend/src/features/auth/services/authService.js

const { sql, getPool } = require('../../../config/database');

/**
 * Kiểm tra đăng nhập bằng email và password (plain text).
 * Thực tế nên dùng hash & salt (bcrypt).
 */
async function loginByEmailPassword(email, password) {
  const pool = await getPool();
  
  // Giả sử bảng [Users] có cột [email], [password] (chưa mã hoá)
  const result = await pool.request()
    .input('email', sql.NVarChar, email)
    .input('password', sql.NVarChar, password)
    .query(`
      SELECT cus_id, fullname
      FROM Customer
      WHERE email = @email AND password = @password;
    `);
    //WHERE email = @email AND password = HASHBYTES('SHA2_256',@password)
  if (result.recordset.length === 0) {
    console.log("Khong the tim thay thong tin");
    return null; // Không tìm thấy user trùng email/pass
  }

  // Lấy user đầu tiên
  return result.recordset[0];
}

module.exports = {
  loginByEmailPassword
};
