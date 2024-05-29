import axios from 'axios';

//https://proyectaipv.es/catchit/api -> despliegue
//http://localhost:8080/api -> local

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
});

export default axiosInstance;
