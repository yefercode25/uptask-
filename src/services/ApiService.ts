import axios from 'axios';

export const ApiService = axios.create({
  baseURL: `${import.meta.env.VITE_API_SERVICE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
  }
});