// frontend/src/features/auth/services/authApi.js

import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export async function loginApi(email, password) {
  const res = await axios.post(`${API_URL}/api/auth/login`, { email, password });
  
  return res.data; // { success, message, user, token }
}
