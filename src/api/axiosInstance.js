import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.examplereact.lat', // URL de la API
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;